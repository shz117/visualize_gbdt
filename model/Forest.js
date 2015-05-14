var fs = require('fs');

var parseString = require('xml2js').parseString;
var xml = fs.readFileSync('data/slmdk.xml').toString();

var mappedTree;
var t;
parseString(xml, function(err, result) {
    var forest = result.MlrFunction.DecisionTree[0].Forest[0];
    var tree = forest.Tree; // all trees in the model

    function preOrderTraverse(root) {
        if (!root) return;
        // visit and copy current node
        var mappedNode = {};
        var val = root['$'];
        mappedNode.id = val.id;
        mappedNode.name = val.feature || val.id;
        mappedNode.value = val.value || -1;
        // recurse on children
        mappedNode.children = [];
        
        var children = root.Node;
        var responses = root.Response;
        if (children) {
            if (children[0]) mappedNode.children.push(preOrderTraverse(children[0]));
            if (children[1]) mappedNode.children.push(preOrderTraverse(children[1]));
        }
        if (responses) {
            if (responses[0]) {
                mappedNode.children.push({
                    id: responses[0].$.id,
                    name: responses[0].$.value,
                    value: responses[0].$.value,
                    children:[]
                });
            }
            if (responses[1]) {
                mappedNode.children.push({
                    id: responses[1].$.id,
                    name: responses[1].$.value,
                    value: responses[1].$.value,
                    children:[]
                });
            }
        }

        return mappedNode;
    }
    for (var idx in tree) {
        // tree:
        // {
        //     $: {id: 0} //id of the tree
        //     Node:  only one here  // root of the tree
        // }
        // Node:
        // {
        //     $: {feature: W1VWSCORE, value: 0.4785495, id: N0_1}
        //     Node: [2 children nodes]
        // }

        // {  
        // "id": "347_0",  
        // "name": "Nine Inch Nails",  
        // "children": [{  
        //     "id": "126510_1",  
        //     "name": "Jerome Dillon",  
        //     "data": {  
        //         "band": "Nine Inch Nails",  
        //         "relation": "member of band"  
        //     },  
        //     "children":
        if (idx > 0) break;
        t = tree[idx];
        mappedTree = preOrderTraverse(t);
        console.log(mappedTree);
    }
});

module.exports = mappedTree;