import assert from 'assert';
import {createGraph} from '../src/js/CFG.js';

let func = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    let b = a + y;\n' +
    '    let c = 0;\n' +
    '    \n' +
    '    while (a < z) {\n' +
    '        a = a + 1;\n' +
    '    }\n' +
    '   return z;\n' +
    '}\n';

describe('test while example', ()=>{
    it('test subtitute code',()=>{
        assert.deepEqual(createGraph(func, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;\nlet b = a + y;\nlet c = 0;"' +
            ', xlabel = 1,  shape=rectangle, style = filled, fillcolor = green]\nn1 [label="a < z", xlabel = 2,  shape=diamond, style = filled,' +
            ' fillcolor = green]\nn2 [label="a = a + 1", xlabel = 3,  shape=rectangle,]\nn3 [label="return z;", xlabel = 4,  shape=rectangle, ' +
            'style = filled, fillcolor = green]\nn0 -> n1 []\nn1 -> n2 [label="T"]\nn1 -> n3 [label="F"]\nn2 -> n1 []\n }');
    });
});

let func2 = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    return a;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test1',()=>{
        assert.deepEqual(createGraph(func2, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1,  ' +
            'shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return a;",' +
            ' xlabel = 2,  shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});


let func3 = 'function foo(x){\n' +
    '    let a = x + 1;\n' +
    '    return a;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test2',()=>{
        assert.deepEqual(createGraph(func3, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1,  ' +
            'shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return a;",' +
            ' xlabel = 2,  shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});

let func4 = 'function foo(x, y){\n' +
    '    let a = x + 1;\n' +
    '    return a;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test3',()=>{
        assert.deepEqual(createGraph(func4, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return a;",' +
            ' xlabel = 2,  shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});

let func5 = 'function foo(x, y, z){\n' +
    '    let a = z + 1;\n' +
    '    return a;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test4',()=>{
        assert.deepEqual(createGraph(func5, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = z + 1;", xlabel = 1, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return a;",' +
            ' xlabel = 2,  shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});


let func6 = 'function foo(x, y, z){\n' +
    '    let a = y + 1;\n' +
    '    return a;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test5',()=>{
        assert.deepEqual(createGraph(func6, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = y + 1;", xlabel = 1, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return a;", xlabel = 2, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});


let func7 = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    return x;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test6',()=>{
        assert.deepEqual(createGraph(func7, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1,  ' +
            'shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return x;", xlabel = 2, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});

let func8 = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    return y;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test7',()=>{
        assert.deepEqual(createGraph(func8, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return y;", xlabel = 2,' +
            '  shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});

let func9 = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    return z;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test8',()=>{
        assert.deepEqual(createGraph(func9, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1,  ' +
            'shape=rectangle, style = filled, fillcolor = green]\nn1 [label="return z;", xlabel = 2, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\n }');
    });
});

let func10 = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    let b = a + y;\n' +
    '    let c = 0;\n' +
    '    \n' +
    '    if (b < z) {\n' +
    '        c = c + 5;\n' +
    '    } else {\n' +
    '        c = c + z + 5;\n' +
    '    }\n' +
    '    return c;\n' +
    '}\n';

describe('test if example', ()=>{
    it('test subtitute code',()=>{
        assert.deepEqual(createGraph(func10, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;\n' +
            'let b = a + y;\nlet c = 0;", xlabel = 1,  shape=rectangle, style = filled, fillcolor = green]\nn1 [label="b < z",' +
            ' xlabel = 2,  shape=diamond, style = filled, fillcolor = green]\nn2 [label="c = c + 5", xlabel = 3,  ' +
            'shape=rectangle,]\nn3 [label="return c;", xlabel = 4,  shape=rectangle, style = filled, fillcolor = green]\nn4 [label="c = c + z + 5",' +
            ' xlabel = 5,  shape=rectangle, style = filled, fillcolor = green]\nn0 -> n1 []\nn1 -> n2 [label="T"]\nn1 -> n4 ' +
            '[label="F"]\nn2 -> n3 []\nn4 -> n3 []\n }');
    });
});

let func11 = 'function foo(x, y, z){\n' +
    '    let a = x + 1;\n' +
    '    if (a>0){\n' +
    '       x = 0;\n' +
    '    }\n' +
    '    return z;\n'+
    '}\n';

describe('test if example', ()=>{
    it('test11',()=>{
        assert.deepEqual(createGraph(func11, [1, 2, 3]), 'digraph cfg { forcelabels=true n0 [label="let a = x + 1;", xlabel = 1, ' +
            ' shape=rectangle, style = filled, fillcolor = green]\nn1 [label="a > 0", xlabel = 2,  shape=diamond, style = filled, fillcolor = green]\nn2' +
            ' [label="x = 0", xlabel = 3,  shape=rectangle,]\nn3 [label="return z;", xlabel = 4,  shape=rectangle, style = filled, ' +
            'fillcolor = green]\nn0 -> n1 []\nn1 -> n2 [label="T"]\nn1 -> n3 [label="F"]\nn2 -> n3 []\n }');
    });
});