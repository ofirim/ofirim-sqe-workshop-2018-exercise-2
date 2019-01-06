
import {getTableToDisplay} from './code-analyzer';
export{substitution, getFunc1};

let ans=getTableToDisplay();
let funcToRet='';
let globalVars = [];
let local=[];
let assignment=[];
let i=0;
let tabs=0;

function substitution(values){
    clean();
    funcToRet = funcToRet + 'function ' + ans[i].Name+'(';
    i++;
    while(ans[i].Type == 'ParameterDeclaration') {globalVars.push({var: ans[i].Name, value: ans[i].Value});
        funcToRet = funcToRet + ans[i].Name+',';
        i++;}
    setParamValues(values);
    funcToRet=funcToRet.substring(0,funcToRet.length-1);
    funcToRet = funcToRet+'){ \n ';
    tabs++;
    iterationOnFunc(true);
}

function checkingTypes(){
    checkTypes1();
    checkTypes2();
    checkTypes3();
    checkTypes4();
    checkType5();
}

function iterationAdvancing(){
    tabs--;
    addTabs();
    funcToRet=funcToRet+'}\n';
    i++;
}

function iterationOnFunc(cond){
    while(i < ans.length && eval(cond)){
        checkingTypes();
    }
    iterationAdvancing();
}

function getValue(key, arr){
    let v = '';
    for(let k=0; k<arr.length; k++){
        if(arr[k].var== key)
            v = arr[k].value;
    }
    return v;
}


function inDic(key, arr){
    for(let k=0; k<arr.length; k++){
        if(arr[k].var== key)
            return true;
    }
    return false;
}

function checkIfOrElse(str){
    if(str == 'if(')    iterationOnFunc('ans[i].Type != \'end if\'');
    else    iterationOnFunc('ans[i].Type != \'end else if\'');
}

function checkIf(str){
    addTabs();
    let s = str;
    var condition = '';
    ans[i].Condition = ans[i].Condition + '';
    let res = ans[i].Condition.split(' ');
    for (let j = 0; j < res.length; j++) {
        if (inDic(res[j], assignment)) condition = condition + '(' + getValue(res[j], assignment) + ') ';
        else if (inDic(res[j], globalVars)) condition = condition + res[j] + ' ';
        else if (inDic(res[j], local)) condition = condition + getValue(res[j], local) + ' ';
        else condition = condition + res[j] + ' ';}
    ans[i].Condition = condition;
    s=s+condition;color(s,condition);
    tabs++;
    let temp = assignment.slice();
    i++;
    checkIfOrElse(str);
    assignment = temp;
}

function checkWhile(str){
    addTabs();
    funcToRet = funcToRet + str;
    ans[i].Condition += '';
    let condition = '';
    let res = ans[i].Condition.split(' ');
    for (let j = 0; j < res.length; j++) {
        if (inDic(res[j], assignment)) condition = condition + '(' + getValue(res[j], assignment) + ') ';
        else if (inDic(res[j], globalVars)) condition = condition + res[j] + ' ';
        else if (inDic(res[j], local)) condition = condition + '(' + getValue(res[j], local) + ') ';
        else condition = condition + res[j] + ' ';}
    ans[i].Condition = condition;
    funcToRet=funcToRet+condition+'){ \n';
    tabs++;
    let temp = assignment.slice();
    i++;
    iterationOnFunc('ans[i].Type != \'end while\'');
    assignment = temp;
}

function checkElse(str){
    addTabs();
    funcToRet = funcToRet + str;
    tabs++;
    var temp = assignment.slice();
    i++;
    iterationOnFunc('ans[i].Type != \'end else\'');
    assignment = temp;
}

function checkReturn(str){
    addTabs();
    funcToRet=funcToRet+str;
    ans[i].Value += '';
    let value = '';
    let res = ans[i].Value.split(' ');
    for (let j = 0; j < res.length; j++) {
        if (inDic(res[j], globalVars)) value = value + res[j] + ' ';
        else if (inDic(res[j], assignment)) value = value + '(' + getValue(res[j], assignment) + ') ';
        else if (inDic(res[j], local)) value = value + '(' + getValue(res[j], local) + ') ';
        else value = value + res[j] + ' ';
    }
    ans[i].Value = value;
    funcToRet=funcToRet+value+';\n';
    i++;
}

function checkVarAssignment(){
    let value = '';
    ans[i].Value = ans[i].Value + '';
    let res = ans[i].Value.split(' ');
    for (let j = 0; j < res.length; j++) {
        if (inDic(res[j], globalVars))
            value = value + res[j] + ' ';
        else if (inDic(res[j], assignment))
            value = value + '(' + getValue(res[j], assignment) + ') ';
        else if (inDic(res[j], local))
            value = value + '(' + getValue(res[j], local) + ') ';
        else
            value = value + res[j] + ' ';}
    ans[i].Value = value;
    checkVarAssignment2();
}

function checkVarAssignment2(){
    if (ans[i].Type == 'VariableDeclaration') {
        local.push({var: ans[i].Name, value: ans[i].Value});
        if(ans[i].Value.indexOf('[')>-1)
            setArrayValues(ans[i].Name,ans[i].Value,local);
    }
    else {
        assignment.push({var: ans[i].Name, value: ans[i].Value});
        if(inDic(ans[i].Name, globalVars)){
            addTabs();
            funcToRet=funcToRet+ans[i].Name+' = '+ans[i].Value+';\n';}
    }
    i++;
}

function checkTypes1(){
    if (i<ans.length && (ans[i].Type == 'IfStatement' )) {
        checkIf('if(');
    }
    if (i<ans.length && ( ans[i].Type == 'else if statement' )) {
        checkIf('else if(');
    }
}

function checkTypes2(){
    if (i<ans.length && (ans[i].Type == 'VariableDeclaration' || ans[i].Type == 'AssignmentExpression')) {
        checkVarAssignment();
    }
}

function checkTypes3(){
    if (i<ans.length && (ans[i].Type == 'else statement')) {
        checkElse('else{ \n');
    }
}

function checkTypes4(){
    if ( i<ans.length && (ans[i].Type == 'WhileStatement')) {
        checkWhile('while(');
    }
    if (i<ans.length && (ans[i].Type == 'ReturnStatement')) {
        checkReturn('return ');
    }
}

function checkType5(){
    if(i<ans.length && ans[i].Type == 'UnaryExpression'){
        i++;
    }
}

function addTabs(){
    let j = 0;
    while(j++ <= tabs)
        funcToRet = funcToRet + '\t';
}

function checkCondition(exp){
    let toEval='';
    exp = exp.replace('(', '');
    exp = exp.replace(')', '');
    let split = exp.split(' ');
    for(let k=0; k<split.length; k++){
        if(inDic(split[k],globalVars))
            toEval=toEval + getValue(split[k],globalVars);
        else if(checkString(split[k]))
            toEval=toEval+split[k];
        else
            toEval=toEval+'"'+split[k]+'"';
    }
    return eval(toEval);
}


function setParamValues(values){
    let arraysHolder=[];
    while(values.indexOf('[')>-1){
        let res='['+values.slice(values.indexOf('[')+1,values.indexOf(']'))+']';
        arraysHolder.push(res);
        values=values.replace(res,'arr');
    }
    setValues(values,arraysHolder);
}

function setValues(values,arrays){
    if(values.indexOf(',')<=-1) {
        setArraysOnlyOrEmptyParams(values, arrays);
    }
    else{
        let split=values.split(',');
        for(let j=0; j < split.length; j++){
            if(split[j].includes('arr')){
                globalVars[j].value= '' + arrays.shift();
                setArrayValues(globalVars[j].var,globalVars[j].value,globalVars);
            }
            else{
                globalVars[j].value=split[j];
            }
        }
    }
}

function setArraysOnlyOrEmptyParams(values,arrayHolder){
    if(values.includes('arr')){
        globalVars[0].value=''+arrayHolder.shift();
        setArrayValues(globalVars[0].var,globalVars[0].value,globalVars);
    }
    else{
        globalVars[0].value=values;
    }
}

function setArrayValues(key,values){
    values=values.replace('[','');
    values=values.replace(']','');
    setParamValues(values);
}


function color(s,cond){
    if(checkCondition(cond))
        funcToRet=funcToRet+'<span style="background-color:green;">'+s+'){ '+ '</span>'+'\n';
    else
        funcToRet=funcToRet+'<span style="background-color:red;">'+s+'){ '+' </span>'+'\n';
}


function clean(){
    ans=getTableToDisplay();
    funcToRet='';
    globalVars = [];
    local=[];
    assignment=[];
    i=0;
    tabs=0;
}

function checkString(str){
    if(!isNaN(str)) return true;
    let ops=['-','+','*','/','(',')','=','===','>','<','==','!=','!==','<=','>=',' ',''];
    for(let k=0; k < ops.length; k++){
        if(str == ops[k])   return true;
    }
    return false;
}


function getFunc1(){
    return funcToRet;
}


