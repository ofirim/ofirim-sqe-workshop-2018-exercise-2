import $ from 'jquery';
import {parseCode, parser, clean} from './code-analyzer';
import {substitution, getFunc1} from './Substitution';




$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let values=$('#values').val();
        let parsedCode = parseCode(codeToParse);
        clean();
        parser(parsedCode['body'][0]);
        //$('#parsedCode').replaceWith(displayTable());
        //$('body').append(displayTable());
        //console.log(getTableToDisplay());
        substitution(values);
        let funcToRet=getFunc1();
        document.getElementById('outputTable').innerHTML=funcToRet;
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });


});

//
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