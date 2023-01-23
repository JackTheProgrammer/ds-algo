import PriorityQueue from '../../../../../Queue/priorityQueue';

/**
 * @typedef {Object} ShortestPaths
 * @property {Object} distances - shortest distances to all vertices
 * @property {Object} previousVertices - shortest paths to all vertices.
 */

/**
 * @typedef {import('../../../graph').default} Graph
 * @typedef {import('../../../vertex').default} Vertex
 * 
 * @param {Graph} graph 
 * @param {Vertex} startVertex
 * 
 * @return {ShortestPaths}
 */
export default function dijkstraAlgorithm(graph, startVertex){
    let queue = new PriorityQueue(); 
    /**
     * @type {Object}
     */
    let distances = {}; 

    /**
     * @type {Object}
     */
    let previousVertices = {};

    /**
     * @type {Vertex[]}
     * will have all visited vertices as its members
     */
    let visited = [];

    //enqueue all vertex with infinity as their priority except for the startVertex, 
    //which will have zero as its priority
    graph.getAllVertices().forEach((vertex) => {
        if(vertex === startVertex){
            queue.enqueue(vertex, 0);
            distances[vertex.getKey()] = 0;
            queue.enqueue(vertex, distances[vertex.getKey()]);
        } else {
            queue.dequeue(vertex, Infinity);
            distances[vertex.getKey()] = Infinity;
            queue.enqueue(vertex, distances[vertex.getKey()]);
        }
        previousVertices[vertex.getKey()] = null;
    });

    visited.push(startVertex);
    while(!queue.isEmpty){
        /** 
         * @type {Vertex} currentVertex  
         */
        let currentVertex = queue.dequeue().item;

        currentVertex.getNeighbors().forEach((neighbor) => {
            if(!visited.includes(neighbor)){
                const edge = graph.findEdge(currentVertex, neighbor);
                /**
                 * @type {number} neighborExistingDistance
                 */
                let neighborExistingDistance = distances[neighbor.getKey()];

                /**
                 * @type {number} distanceFromCurrentVertexToNeighbor
                 */
                let distanceFromCurrentVertexToNeighbor = neighborExistingDistance + edge.weight;

                if(neighborExistingDistance > distanceFromCurrentVertexToNeighbor){
                    distances[neighbor.getKey()] = distanceFromCurrentVertexToNeighbor;
                }

                if(queue.hasItem(neighbor)){
                    queue.changePriority(neighbor, distances[neighbor.getKey()]);
                } else if(!queue.hasItem(neighbor)){
                    queue.enqueue(neighbor, distances[neighbor.getKey()]);
                }

                previousVertices[neighbor.getKey()] = currentVertex;
            }
        });

        visited.push(currentVertex);
    }

    return {
        distances,
        previousVertices
    };
}