// import $ from 'jquery';
// // import {parseCode, parser, clean} from './code-analyzer';
// // import {substitution, getFunc1} from './Substitution';
// import {createGraph} from './code-analyzer';
// import Viz from 'viz.js';
// import {Module, render} from 'viz.js/full.render.js';
//
//
// $(document).ready(function () {
//     $('#codeSubmissionButton').click(() => {
//         let codeToParse = $('#codePlaceholder').val();
//         let params=$('#values').val();
//         // let parsedCode = parseCode(codeToParse);
//         // clean();
//         // parser(parsedCode['body'][0]);
//         // substitution(values);
//         // let funcToRet=getFunc1();
//         // document.getElementById('outputTable').innerHTML=funcToRet;
//         // $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
//         let dotGraph = createGraph(codeToParse, JSON.parse(params));
//         let viz = new Viz({ Module, render });
//         viz.renderSVGElement(dotGraph).then(function(element) {
//             $('#parsedCode').html(element);
//         });
//     });
//
//
// });
//
// //



//////////////////

import $ from 'jquery';
// import {parseCode, parser, clean} from './code-analyzer';
// import {substitution, getFunc1} from './Substitution';
import {createGraph} from './CFG';

import Viz from 'viz.js';
import {Module, render} from 'viz.js/full.render.js';



$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#funcPlaceholder').val();
        let params = $('#values').val();
        //let parsedCode = parseCode(codeToParse);
        // clean();
        // parser(parsedCode['body'][0]);
        // substitution(values);
        // let funcToRet=getFunc1();
        let graph = createGraph(codeToParse, JSON.parse(params));
        let viz = new Viz({ Module, render });
        viz.renderSVGElement(graph).then(function(elem) {
            $('#parsedCode').html(elem);
        });
    });
});

// function displayTable() {
//     let html = '<table>\n';
//     html += '<tr> <td> Line </td> <td> Type </td> <td> Name </td> <td> Condition </td> <td> Value </td> </tr>\n';
//     for (let i = 0; i < tableToDisplay.length; i++) {
//         html += '<tr>';
//         html += '<td> ' + tableToDisplay[i].Line + '</td>';
//         html += '<td> ' + tableToDisplay[i].Type + '</td>';
//         html += '<td> ' + tableToDisplay[i].Name + '</td>';
//         html += '<td> ' + tableToDisplay[i].Condition + '</td>';
//         html += '<td> ' + tableToDisplay[i].Value + '\n' + '</td>';
//         html += '</tr>\n';
//     }
//     html += '</table>\n';
//     return html;
// }