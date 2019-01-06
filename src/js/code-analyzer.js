// import * as esprima from 'esprima';
// import * as escodegen from 'escodegen';
// import * as esgraph from 'esgraph';
//
//
// const parseCode = (codeToParse) => {
//     return esprima.parseScript(codeToParse);
// };
//
// export { parseCode, createGraph };
// export { parser, clean, tableToDisplay, getTableToDisplay};
//
// let lineNumber = 1;
// let tableToDisplay = [];
// let row = newRow();
//
//
//
// const typeCases = {
//     'FunctionDeclaration': parseFuncDeclaration,
//     'ReturnStatement': parseReturnState,
//     'AssignmentExpression': parseAssignmentExp,
//     'ExpressionStatement' : parseExpressionStatement,
//     'VariableDeclaration': parseVarDeclaration,
//     'BinaryExpression' : parseBinaryExpression,
//     'WhileStatement': parseWhileState,
//     'ForStatement' : parseForStatement,
//     'IfStatement': parseIfState,
//     'else if statement': parseIfElseState,
//     'BlockStatement': parseBlockState,
//     'MemberExpression' : parserMemberExpression,
//     'Literal': parseLiteral,
//     'Identifier': parseId,
//     'UnaryExpression' : parseUnaryExpression,
//     'UpdateExpression' : parseUpdateExpression,
// };
//
// function parser(parseMe, dict) {
//     let type = parseMe.type;
//     row.Line = lineNumber;
//     let func = typeCases[type];
//     return func ? func.call(undefined, parseMe, dict) : null;
// }
//
//
// function parseFuncDeclaration(bodyElement) {
//     row.Type = bodyElement.type;
//     row.Name = parser(bodyElement.id);
//     tableToDisplay.push(row);
//     row = newRow();
//     parseParamDeclaration(bodyElement.params);
//     parser(bodyElement.body);
// }
//
// function parseParamDeclaration(params){
//     params.forEach(param => {
//         row.Type = 'ParameterDeclaration';
//         row.Name = parser(param);
//         tableToDisplay.push(row);
//         row = newRow();
//     });
// }
//
// function parseVarDeclaration(decl, dict) {
//     decl.declarations.forEach(param => {
//         if (param.init != null) {
//             dict[param.id.name] = parser(param.init, dict);
//         }
//     });
//     return true;
// }
//
// function parseExpressionStatement(exp, dict){
//     return parser(exp.expression, dict);
// }
//
// function parseAssignmentExp(assExp, dict) {
//     let left = parser(assExp.left, dict);
//     let right = parser(assExp.right, dict);
//     if(left.type == 'MemberExpression')
//         return dict[left.object.name][left.property.value] = right;
//     return dict[left] = right;
// }
//
// function parseBinaryExpression(exp){
//     let left = parser(exp.left);
//     let right = parser(exp.right);
//     let op = exp.operator;
//     return eval(left + op + right);
// }
//
// function parserMemberExpression(exp){
//     let obj = parser(exp.object);
//     let prop = parser(exp.property);
//     return obj + '[' + prop + ']';
// }
//
// function parseWhileState(whileExp) {
//     row.Type = whileExp.type;
//     row.Condition = parser(whileExp.test);
//     tableToDisplay.push(row);
//     row = newRow();
//     parser(whileExp.body);
//     var obj ={
//         Line:lineNumber,
//         Type:'end while',
//         Name: '',
//         Condition:'',
//         Value: ''
//     };
//     tableToDisplay.push(obj);
// }
//
// function parseForStatement(forExp) {
//     let init = parser(forExp.init);
//     let test = parser(forExp.test);
//     let update = parser(forExp.update);
//     row.Condition = init + ' ; '+ test + ' ; ' + update;
//     row.Type = forExp.type;
//     tableToDisplay.push(row);
//     row = newRow();
//     parser(forExp.body);
// }
//
//
//
// let wasElse = false;
//
// function parseIfState(ifExp){
//     wasElse=false;
//     var obj={
//         Line:lineNumber, Type:'IfStatement', Name: '', Condition:parser(ifExp.test) , Value: ''};
//     tableToDisplay.push(obj);
//     if(ifExp.consequent.type == 'IfStatement')  parseIfElseState(ifExp.consequent);
//     else    parser(ifExp.consequent);
//     var obj1={
//         Line:lineNumber, Type:'end if', Name: '', Condition:'', Value: ''};
//     tableToDisplay.push(obj1);
//     ifType(ifExp);
//     if(ifExp.alternate!=null) {
//         parser(ifExp.alternate);
//         if(wasElse){
//             var obj2={Line:lineNumber, Type:'end else', Name: '', Condition:'', Value: ''};tableToDisplay.push(obj2);
//         }
//     }
//     wasElse=false;
// }
//
// function parseIfElseState(ifElseExp){
//     wasElse=false;
//     var obj={Line:lineNumber, Type:'else if statement', Name: '', Condition:parser(ifElseExp.test) , Value: ''};
//     tableToDisplay.push(obj);
//     parser(ifElseExp.consequent);
//     var obj1={Line:lineNumber, Type:'end else if', Name: '', Condition:'', Value: ''};
//     tableToDisplay.push(obj1);
//     ifType(ifElseExp);
//     if(ifElseExp.alternate!=null) {
//         parser(ifElseExp.alternate);
//         if(wasElse){
//             var obj2={Line:lineNumber, Type:'end else', Name: '', Condition:'', Value: ''};
//             tableToDisplay.push(obj2);
//         }
//     }
//     wasElse=false;
// }
//
//
// const ifType= (exp) =>{
//     if( exp.alternate!=null){
//         if(exp.alternate.test!=null)
//             exp.alternate.type='else if statement';
//         else{
//             wasElse=true;
//             lineNumber++;
//             var obj={Line:lineNumber, Type:'else statement', Name: '', Condition:'' , Value:''
//             };
//             tableToDisplay.push(obj);
//
//         }
//     }
//
// };
//
//
// function parseUpdateExpression(updExp){
//     let arg = parser(updExp.argument);
//     let op = updExp.operator;
//     return arg + op;
// }
//
// function parseUnaryExpression(unExp){
//     let arg = parser(unExp.argument);
//     return unExp.operator + arg;
// }
//
// function parseReturnState(ret) {
//     row.Type = ret.type;
//     row.Value = parser(ret.argument);
//     tableToDisplay.push(row);
//     row = newRow();
// }
//
// function parseId(id, dict) {
//     return dict[id.name];
// }
//
// function parseLiteral(lit) {
//     return lit.value;
// }
//
// function parseBlockState(block) {
//     block.body.forEach(bodyElement => {
//         lineNumber++;
//         parser(bodyElement);
//     });
// }
//
//
// function newRow() {
//     return { Line: '', Type: '', Name: '', Condition: '', Value: ''};
// }
//
//
//
// function clean(){
//     tableToDisplay = [];
//     lineNumber = 1;
//     row = newRow();
//
// }
//
//
// // function insertRowToTableToDisplay(){
// //     tableToDisplay.push(row);
// //     row = newRow();
// // }
//
// function getTableToDisplay(){
//     return tableToDisplay;
// }


import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, {range: true});
};

export{parseCode, evalCode, parseLitExp, parseAssignmentExp, parseIdExp};

const typeCases = {

    'Program': parseBlockState,
    'BlockStatement': parseBlockState,
    'VariableDeclaration': parseVarDecl,
    'AssignmentExpression': parseAssignmentExp,
    'ExpressionStatement': expressionStatement,
    'ArrayExpression': parseArrayExp,
    'BinaryExpression': parseBinaryExp,
    'LogicalExpression': parseBinaryExp,
    'UpdateExpression': parseUpdateExpression,
    'Literal': parseLitExp,
    'MemberExpression': parseMemberExp,
    'Identifier': parseIdExp,

};


function parseAssignmentExp(assExp, dict) {
    if (assExp.left.type === 'MemberExpression') {
        return dict[assExp.left.object.name][assExp.left.property.value] = typeCases[assExp.right.type](assExp.right, dict);
    }
    return dict[assExp.left.name] = typeCases[assExp.right.type](assExp.right, dict);
}


function evalCode(exp, dict) {
    return typeCases[exp.type](exp, dict);
}

function parseArrayExp(arr, dict){
    return eval('[' + arr.elements.map(elem => typeCases[elem.type](elem, dict)).join(',') + ']');
}

function parseBinaryExp(binExp, dict) {
    let left = typeCases[binExp.left.type](binExp.left, dict);
    let right = typeCases[binExp.right.type](binExp.right, dict);
    let op = binExp.operator;
    return eval(left + op + right);
}

function parseBlockState(blockExp, dict) {
    return blockExp.body.forEach((elem) =>{
        evalCode(elem, dict);
    });
}

function parseLitExp(lit){
    return lit.value;
}

function expressionStatement(exp, dict) {
    return evalCode(exp.expression, dict);
}

function parseMemberExp(memberExp, dict) {
    let arr = dict[memberExp.object.name];
    let prop = memberExp.property.value;
    return arr[prop];
}

function parseVarDecl(vars, dict) {
    return vars.declarations.forEach((decl) => {
        if (decl.init != null) {
            dict[decl.id.name] = typeCases[decl.init.type](decl.init, dict);
        }
    });
}

function parseUpdateExpression(updExp, dict){
    let arg = typeCases[updExp.type](updExp.argument, dict);
    let op = updExp.operator;
    return dict[arg] = arg + op;
}

function parseIdExp(id, dict){
    return dict[id.name];
}
