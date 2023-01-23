import PriorityQueue from "../../../../Queue/priorityQueue"
import Graph from "../../graph";

/** 
 * @param {Graph} graph
 * @return {Graph}
 */
export default function primAlgorithm(graph){
    if(graph.isDirected == true){
        throw new Error("directed graphs not included");
    }

    let edgesQueue = new PriorityQueue();

    graph.getAllEdges().forEach(edge => {
        edgesQueue.enqueue(edge, edge.weight);
    });

    let minimumSpanningTree = new Graph();

    /**
     * @type {string[]}
     */
    let visitedVertices = [];

    while(!edgesQueue.isEmpty){
        /**
         * @typedef {import('../../edge').default} Edge
         * @type {Edge}
         */
        let currentMinimumEdge = edgesQueue.dequeue().item;

        /**
         * @typedef {import('../../vertex').default} Vertex
         * @type {Vertex}
         */
        let nextMinVertex;

        if(!visitedVertices.includes(currentMinimumEdge.startVertex.getKey())){
            nextMinVertex = currentMinimumEdge.startVertex;
        } else if(!visitedVertices.includes(currentMinimumEdge.endVertex.getKey())){
            nextMinVertex = currentMinimumEdge.endVertex;
        }

        /** 
         * If there is a minimum vertex from the [currentMinEdge] then add it to 
         * the minimumSpanningTree and then add the minimum vertex's edges in the [edgesQueue]
         */

        if(nextMinVertex){
            minimumSpanningTree.addEdge(currentMinimumEdge);
            //finding and adding the edges of [nextMinVertex]
            nextMinVertex.getEdges().forEach(edge => {
                edgesQueue.enqueue(edge, edge.weight);
            });
        }

        visitedVertices.push(nextMinVertex.getKey());
    };

    return minimumSpanningTree;
}