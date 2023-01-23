import PriorityQueue from '../../../../../Queue/priorityQueue';

/**
 * @typedef {import('../../../graph').default} Graph
 * @typedef {import('../../../vertex').default} Vertex
 * 
 * @param {Graph} graph
 * @param {Vertex} source
 * @param {Vertex} destination
 * 
 * @returns {string[]}
 */
export default function dijkstraAlgorithm(graph, source, destination){
    /**
     * @type {Object<string, number>}
     */
    let distances = {}; 

    /**
     * @type {Object<string, Vertex>}
     */
    let previousVertices = {}; 
    let priorityQueue = new PriorityQueue();
    
    /** @type {string[]} */
    let path = [];

    graph.getAllVertices().forEach(vertex => {
        if(vertex === source){
            distances[vertex.getKey()] = 0;
            priorityQueue.enqueue(vertex, distances[vertex.getKey()]);
        } else {
            distances[vertex.getKey()] = Infinity;
            priorityQueue.enqueue(vertex, distances[vertex.getKey()]);
        }

        previousVertices[vertex.getKey()] = null;
    });

    /**
     * @type {Vertex}
     */
    let currentVertex;
    
    while(!priorityQueue.isEmpty){
        currentVertex = priorityQueue.dequeue().item;
        if(currentVertex === destination){
            while(previousVertices[currentVertex.getKey()]){
                path.push(previousVertices[currentVertex.getKey()]);
                currentVertex = previousVertices[currentVertex.getKey()];
            }
            break;
        }

        if(currentVertex && distances[currentVertex.getKey()] !== Infinity){
            currentVertex.getNeighbors().forEach(neighbor => {
                let vertexNode = neighbor;
                
                /**
                 * @type {number}
                 */
                let currentVertexDistance = distances[currentVertex.getKey()];
                
                let edge = graph.findEdge(currentVertex, vertexNode);
                
                /**
                 * @type {number}
                 */
                let currentVertexToVertexNodeDistance = currentVertexDistance + edge.weight;

                if(currentVertexDistance > currentVertexToVertexNodeDistance){
                    distances[vertexNode.getKey()] = currentVertexToVertexNodeDistance;
                    previousVertices[vertexNode.getKey()] = currentVertex;
                }
                if(priorityQueue.hasItem(vertexNode)){
                    priorityQueue.changePriority(vertexNode, distances[vertexNode.getKey()]);
                } else if(!priorityQueue.hasItem(vertexNode)){
                    priorityQueue.enqueue(vertexNode, distances[vertexNode.getKey()]);
                }
            });
        }
    }

    return path.concat(currentVertex.getKey()).reverse();
}