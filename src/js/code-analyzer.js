import * as esprima from 'esprima';
//import {} from './Substitution';


const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse);
};

export { parseCode };
export { parser, clean, tableToDisplay, getTableToDisplay};

let lineNumber = 1;
let tableToDisplay = [];
let row = newRow();



const typeCases = {
    'FunctionDeclaration': parseFuncDeclaration,
    'ReturnStatement': parseReturnState,
    'AssignmentExpression': parseAssignmentExp,
    'ExpressionStatement' : parseExpressionStatement,
    'VariableDeclaration': parseVarDeclaration,
    'BinaryExpression' : parseBinaryExpression,
    'WhileStatement': parseWhileState,
    'ForStatement' : parseForStatement,
    'IfStatement': parseIfState,
    'else if statement': parseIfElseState,
    'BlockStatement': parseBlockState,
    'MemberExpression' : parserMemberExpression,
    'Literal': parseLiteral,
    'Identifier': parseId,
    'UnaryExpression' : parseUnaryExpression,
    'UpdateExpression' : parseUpdateExpression,
};

function parser(parseMe) {
    let type = parseMe.type;
    row.Line = lineNumber;
    let func = typeCases[type];
    return func ? func.call(undefined, parseMe) : null;
}


function parseFuncDeclaration(bodyElement) {
    row.Type = bodyElement.type;
    row.Name = parser(bodyElement.id);
    tableToDisplay.push(row);
    row = newRow();
    parseParamDeclaration(bodyElement.params);
    parser(bodyElement.body);
}

function parseParamDeclaration(params){
    params.forEach(param => {
        row.Type = 'ParameterDeclaration';
        row.Name = parser(param);
        tableToDisplay.push(row);
        row = newRow();
    });
}

function parseVarDeclaration(decl) {
    decl.declarations.forEach(param => {
        row.Type = 'VariableDeclaration';
        row.Name = parser(param.id);
        if(param.init)
            row.Value = parser(param.init);
        else
            row.Value = param.init;
        tableToDisplay.push(row);
        row = newRow();
    });
}

function parseExpressionStatement(exp){
    parser(exp.expression);
}

function parseAssignmentExp(assExp) {
    let left = parser(assExp.left);
    let right = parser(assExp.right);
    row.Type = assExp.type;
    row.Name = left;
    row.Value = right;
    tableToDisplay.push(row);
    row = newRow();
}

function parseBinaryExpression(exp){
    let left = parser(exp.left);
    let right = parser(exp.right);
    let op = exp.operator;
    return left + ' ' + op + ' ' + right;
}

function parserMemberExpression(exp){
    let obj = parser(exp.object);
    let prop = parser(exp.property);
    return obj + '[' + prop + ']';
}

function parseWhileState(whileExp) {
    row.Type = whileExp.type;
    row.Condition = parser(whileExp.test);
    tableToDisplay.push(row);
    row = newRow();
    parser(whileExp.body);
    var obj ={
        Line:lineNumber,
        Type:'end while',
        Name: '',
        Condition:'',
        Value: ''
    };
    tableToDisplay.push(obj);
}

function parseForStatement(forExp) {
    let init = parser(forExp.init);
    let test = parser(forExp.test);
    let update = parser(forExp.update);
    row.Condition = init + ' ; '+ test + ' ; ' + update;
    row.Type = forExp.type;
    tableToDisplay.push(row);
    row = newRow();
    parser(forExp.body);
}

let wasElse = false;

function parseIfState(ifExp){
    wasElse=false;
    var obj={
        Line:lineNumber, Type:'IfStatement', Name: '', Condition:parser(ifExp.test) , Value: ''};
    tableToDisplay.push(obj);
    if(ifExp.consequent.type == 'IfStatement')  parseIfElseState(ifExp.consequent);
    else    parser(ifExp.consequent);
    var obj1={
        Line:lineNumber, Type:'end if', Name: '', Condition:'', Value: ''};
    tableToDisplay.push(obj1);
    ifType(ifExp);
    if(ifExp.alternate!=null) {
        parser(ifExp.alternate);
        if(wasElse){
            var obj2={Line:lineNumber, Type:'end else', Name: '', Condition:'', Value: ''};tableToDisplay.push(obj2);
        }
    }
    wasElse=false;
}

function parseIfElseState(ifElseExp){
    wasElse=false;
    var obj={Line:lineNumber, Type:'else if statement', Name: '', Condition:parser(ifElseExp.test) , Value: ''};
    tableToDisplay.push(obj);
    parser(ifElseExp.consequent);
    var obj1={Line:lineNumber, Type:'end else if', Name: '', Condition:'', Value: ''};
    tableToDisplay.push(obj1);
    ifType(ifElseExp);
    if(ifElseExp.alternate!=null) {
        parser(ifElseExp.alternate);
        if(wasElse){
            var obj2={Line:lineNumber, Type:'end else', Name: '', Condition:'', Value: ''};
            tableToDisplay.push(obj2);
        }
    }
    wasElse=false;
}


const ifType= (exp) =>{
    if( exp.alternate!=null){
        if(exp.alternate.test!=null)
            exp.alternate.type='else if statement';
        else{
            wasElse=true;
            lineNumber++;
            var obj={Line:lineNumber, Type:'else statement', Name: '', Condition:'' , Value:''
            };
            tableToDisplay.push(obj);

        }
    }

};


// function parseIfState(ifState) {
//     row.Type = ifState.type;
//     if(flagIfElse){row.Type = 'else if statement';}
//     row.Condition = parser(ifState.test);
//     insertRowToTableToDisplay();
//     lineNumber++;
//     parser(ifState.consequent);
//     if(flagIfElse) {var obj={Line:lineNumber, Type:'end if', Name: '', Condition:'', Value: ''};
//         tableToDisplay.push(obj);}
//     else{var obj1={Line:lineNumber, Type:'end else if', Name: '', Condition:'', Value: ''};
//         tableToDisplay.push(obj1);}
//     lineNumber++;
//     if(ifState.alternate != null) {if(ifState.alternate.type == 'IfStatement'){flagIfElse = true;}
//     else{row.Type = 'else statement';row.Line = lineNumber;tableToDisplay.push(row);
//         row = newRow();}
//     parser(ifState.alternate);
//     endElse(flagIfElse);
//     flagIfElse = false;}}
//
//
// function endElse(flagIfElse){
//     if(!flagIfElse){var obj2={Line:lineNumber, Type:'end else', Name: '', Condition:'', Value: ''};
//         tableToDisplay.push(obj2);}
// }
function parseUpdateExpression(updExp){
    let arg = parser(updExp.argument);
    let op = updExp.operator;
    return arg + op;
}

function parseUnaryExpression(unExp){
    let arg = parser(unExp.argument);
    return unExp.operator + arg;
}

function parseReturnState(ret) {
    row.Type = ret.type;
    row.Value = parser(ret.argument);
    tableToDisplay.push(row);
    row = newRow();
}

function parseId(id) {
    return id.name;
}

function parseLiteral(lit) {
    return lit.value;
}

function parseBlockState(block) {
    block.body.forEach(bodyElement => {
        lineNumber++;
        parser(bodyElement);
    });
}


function newRow() {
    return { Line: '', Type: '', Name: '', Condition: '', Value: ''};
}



function clean(){
    tableToDisplay = [];
    lineNumber = 1;
    row = newRow();

}


// function insertRowToTableToDisplay(){
//     tableToDisplay.push(row);
//     row = newRow();
// }

function getTableToDisplay(){
    return tableToDisplay;
}
