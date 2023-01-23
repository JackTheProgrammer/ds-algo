import Graph from "../../graph";
import DisjointSet from "../../../../DisjointSet/DisjointSet";
/**
 * @param {Graph} graph
 * @return {Graph}
 */
export default function kruskalAlgorithm(graph){
    if(graph.isDirected == true){
        throw new Error("directed graphs not included");
    }
    
    let disjointSet = new DisjointSet();
    graph.getAllVertices().forEach(vertex => {
        disjointSet.makeSet(vertex);
    });

    let minimumSpanningTree = new Graph();

    /**
     * @typedef {import('../../edge').default} Edge
     * @param {Edge[]} edgeArray 
     * @return {Edge[]}
     */
    let edgeWeightSorter = edgeArray => {
        for (let index = 0; index < (edgeArray.length - 1); index++) {
            for(let jthIndex = 0; jthIndex < (edgeArray.length - index); jthIndex++){
                if(edgeArray[index].weight < edgeArray[jthIndex + 1].weight){
                    let tempEdgeWeight = edgeArray[index].weight;
                    edgeArray[index].weight = edgeArray[jthIndex + 1].weight;
                    edgeArray[jthIndex + 1].weight = tempEdgeWeight;
                }
            }
        }
        return edgeArray;
    };

    let sortedEdgesArray = edgeWeightSorter(graph.getAllEdges());

    for (let index = 0; index < sortedEdgesArray.length; index++) {
        const currentMinEdge = sortedEdgesArray[index];
        let startVertex = currentMinEdge.startVertex;
        let endVertex = currentMinEdge.endVertex;

        if(!disjointSet.isInSameSet(startVertex, endVertex)){
            disjointSet.union(startVertex, endVertex);
        }

        minimumSpanningTree.addEdge(currentMinEdge);
    }

    return minimumSpanningTree;
}