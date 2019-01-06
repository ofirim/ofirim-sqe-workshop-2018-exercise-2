import * as escodegen from 'escodegen';
import * as esgraph from 'esgraph';

import {parseCode, evalCode} from './code-analyzer';

export {createGraph, createDict};



function createGraph(codeToParse, params) {
    let parsedCode = parseCode(codeToParse);
    let nodes = createNodes(parsedCode);
    let dict = createDict(parsedCode, params);
    return CFGgraph(nodes, dict);
}



function createDict(parsedCode, values) {
    let params = parsedCode.body[0].params;
    let dictParams = {};
    params.map((key) => {
        dictParams[key.name] = values[key.name];
    });
    return dictParams;
}

function removeUnnecessaryNodes(nodes){
    nodes[1].prev = [];
    nodes = nodes.slice(1, nodes.length - 1); // first and last nodes are removed
    nodes.forEach(node => { // all nodes after first return are removed (only one return as the instructions for the assignment)
        if (node.astNode.type == 'ReturnStatement') {
            node.next = [];
            delete node.normal;
        }
    });
    return nodes;
}

function createNodes(parsedCode) {
    let nodes = esgraph(parsedCode.body[0].body)[2];
    nodes = removeUnnecessaryNodes(nodes);
    nodes.forEach(node => {
        node.label = escodegen.generate(node.astNode);
    });
    for (let i = 0; i < nodes.length; i++) {
        let currNode = nodes[i];
        //merging blocks
        while (currNode.normal && currNode.normal.normal && currNode.normal.prev.length === 1) {
            nodes.splice(nodes.indexOf(currNode.normal), 1);
            currNode.label = currNode.label + '\n' + currNode.normal.label;
            currNode.next = currNode.normal.next;
            currNode.normal = currNode.normal.normal;
        }
    }
    return nodes;
}



function displayEdges(output, nodes) {
    for(let i = 0; i < nodes.length; i++){
        for (const type of ['normal', 'true', 'false']) {
            const next = nodes[i][type];
            if (!next)
                continue;
            output.push(`n${i} -> n${nodes.indexOf(next)} [`);
            if (['true', 'false'].includes(type))
                output.push(`label="${type.charAt(0).toUpperCase()}"`);
            output.push(']\n');
        }
    }
}



function displayNodes(output, nodes) {
    for(let i = 0; i < nodes.length; i++){
        output.push(`n${i} [label="${nodes[i].label}", xlabel = ${i + 1}, `);
        let shape = 'rectangle';
        if(nodes[i].false || nodes[i].true) {
            shape = 'diamond';
        }
        output.push(` shape=${shape},`);
        if(nodes[i].green == true){
            output.push(' style = filled, fillcolor = green');
        }
        output.push(']\n');
    }
}



function CFGgraph(nodes, dict) {
    paintNodes(nodes[0], dict);
    let output = ['digraph cfg { forcelabels=true '];
    displayNodes(output, nodes);
    displayEdges(output, nodes);
    output.push(' }');
    return output.join('');
}

function paintNodes(currNode, dict){
    currNode.green = true;
    let nodeToPaintNext;
    if(currNode.normal) {
        nodeToPaintNext = currNode.normal;
        evalCode(parseCode(currNode.label), dict);
        paintNodes(nodeToPaintNext, dict);
    }
    else if(currNode.true && currNode.false){
        if(!evalCode(parseCode(currNode.label).body[0], dict))
            nodeToPaintNext = currNode.false;
        else
            nodeToPaintNext = currNode.true;
        paintNodes(nodeToPaintNext, dict);
    }
}


