import hasCyclesInDirectedGraph from '../4 - Cycles/getCyclesInDirectedGraph';
import topologicalSort from '../5 - ToplogicalSort/toplogical sort';

/**
 * @typedef {import('../../graph').default} Graph
 * @typedef {import('../../edge').default} Edge
 * 
 * @param {Graph} graph 
 * @return {Edge[]}
 */
export default function hamiltonianCycleDAG(graph){
    if(graph.isDirected === false || hasCyclesInDirectedGraph(graph) === true){
        throw new Error("Graph is not DAG(Directed acyclic graph)");
    }
    
    /**
     * @type {Edge[]}
     */
    let hamiltonianEdges = [];

    const topologicalSortedVertexKeys = Object.keys(topologicalSort(graph));
    for(let topSortIndex = 0; topSortIndex < topologicalSortedVertexKeys.length; topSortIndex++){
        const hasEdge = graph.findEdge(
            graph.getVertexByKey(topologicalSortedVertexKeys[topSortIndex]),
            graph.getVertexByKey(topologicalSortedVertexKeys[topSortIndex + 1])
        );

        if(hasEdge){
            hamiltonianEdges.push(hasEdge);
        }
    }

    return hamiltonianEdges;
}