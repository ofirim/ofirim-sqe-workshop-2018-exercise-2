// import assert from 'assert';
// import {parseCode, clean, parser} from '../src/js/code-analyzer';
// import {getFunc1, substitution} from '../src/js/Substitution';
//
// describe('The javascript parser', () => {
//     test1();
//     test2();
//     test3();
//     test4();
//     test5();
//     test6();
// });
//
// function test1(){
//     it('1', () => {
//         let parsedcode = parseCode('function func(x){\n  return x;\n}');
//         clean();
//         parser(parsedcode['body'][0]);
//         substitution('2');
//         let func = getFunc1();
//         let split = func.split('\n');
//         assert.equal(split[0],'function func(x){ ');
//     });
// }
//
// function test2(){
//     it('1', () => {
//         let parsedcode = parseCode('function func(x){\n let a = x + 1;\n if(a>2){\n return x+5;\n}\n' +
//             'else if(a<0){\n    return x+10;\n}\n}');
//         clean();
//         parser(parsedcode['body'][0]);
//         substitution('2');
//         let func = getFunc1();
//         let split = func.split('\n');
//         assert.equal(split[1], ' \t\t<span style="background-color:green;">if(x + 1  > 2 ){ </span>');
//         assert.equal(split[2], '\t\t\treturn x + 5 ;');
//         assert.equal(split[3], '\t\t}');
//         assert.equal(split[4], '\t\t<span style="background-color:red;">else if(x + 1  < 0 ){  </span>');
//         assert.equal(split[5], '\t\t\treturn x + 10 ;');
//     });
// }
//
//
// function test3(){
//     it('bla bla bla', () => {
//         let parsedcode = parseCode('function func(x,y){\n let a = x + 1;\n while(a>2){\n y = a+5;\n}\n' +
//         'return x+10;\n}');
//         clean();
//         parser(parsedcode['body'][0]);
//         substitution('3');
//         let func = getFunc1();
//         let split = func.split('\n');
//         assert.equal(split[1], ' \t\twhile((x + 1 ) > 2 ){ ');
//         assert.equal(split[2], '\t\t\ty = (x + 1 ) + 5 ;');
//         assert.equal(split[3], '\t\t}');
//         assert.equal(split[4], '\t\treturn x + 10 ;');
//     });
// }
//
// function test4(){
//     it('bla bla bla 2', () => {
//         let parsedcode = parseCode('function func(x){\n let a = x + 1;\n while(a>2){\n let y = a+5;\n}\n' +
//             'return x+10;\n}');
//         clean();
//         parser(parsedcode['body'][0]);
//         substitution('3');
//         let func = getFunc1();
//         let split = func.split('\n');
//         assert.equal(split[1], ' \t\twhile((x + 1 ) > 2 ){ ');
//         //assert.equal(split[2], '\t\t\ty = (x + 1 ) + 5 ;');
//         assert.equal(split[2], '\t\t}');
//         assert.equal(split[3], '\t\treturn x + 10 ;');
//     });
// }
//
// function test5(){
//     it('1', () => {
//         let parsedcode = parseCode('function func(x){\n let a = x + 1;\n if(a>2){\n return x+5;\n}\n' +
//             'else{\n    return x+10;\n}\n}');
//         clean();
//         parser(parsedcode['body'][0]);
//         substitution('2');
//         let func = getFunc1();
//         let split = func.split('\n');
//         assert.equal(split[1], ' \t\t<span style="background-color:green;">if(x + 1  > 2 ){ </span>');
//         assert.equal(split[2], '\t\t\treturn x + 5 ;');
//         assert.equal(split[3], '\t\t}');
//         assert.equal(split[4], '\t\telse{ ');
//         assert.equal(split[5], '\t\t\treturn x + 10 ;');
//     });
// }
//
// function test6(){
//     it('1', () => {
//         let parsedcode = parseCode('function func(x){\n  return x;\n}');
//         clean();
//         parser(parsedcode['body'][0]);
//         substitution('[1]');
//         let func = getFunc1();
//         let split = func.split('\n');
//         assert.equal(split[0],'function func(x){ ');
//         assert.equal(split[1],' \t\treturn x ;');
//     });
// }