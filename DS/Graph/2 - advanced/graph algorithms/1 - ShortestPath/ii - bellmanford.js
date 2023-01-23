/**
 * @typedef {Object} ShortestPath
 * @property {Object<string, number>} distances - shortest distances from the startVertex
 * @property {Object<string, Vertex>} previous - shortest paths from the startVertex
 */

/**
 * @typedef {import('../../graph').default} Graph
 * @typedef {import('../../vertex').default} Vertex
 * 
 * @param {Graph} graph 
 * @param {Vertex} startVertex
 * 
 * @return {ShortestPath}
 */
export default function bellmanFord(graph, startVertex){
    /**
     * @type {Object<string, number>}
     */
    let distances = {}; 

    /**
     * @type {Object<string, Vertex>}
     */
    let previous = {};

    graph.getAllVertices().forEach(vertex => {
        if(vertex === startVertex){
            distances[vertex.getKey()] = 0;
        }
        distances[vertex.getKey()] = Infinity;
        previous[vertex.getKey()] = null;
    });

    for(let i = 0; i < (graph.getAllVertices().length - 1); i++){
        Object.keys(distances).forEach(vertexKey => {
            let vertex = graph.getVertexByKey(vertexKey);
            vertex.getNeighbors().forEach(neighbor => {
                const edge = graph.findEdge(vertex, neighbor);

                 // Find out if the distance to the neighbor is shorter in this iteration
                 // then in previous one
                
                /**
                * @type {number}
                */
                let distanceToVertex = distances[vertex.getKey()];
                
                let distanceFromVertexToNeighbor = distanceToVertex + edge.weight;

                if(distanceToVertex > distanceFromVertexToNeighbor){
                    distances[neighbor.getKey()] = distanceFromVertexToNeighbor;
                    previous[neighbor.getKey()] = vertex;
                }
            });
        });
    }

    return {
        distances,
        previous
    };
}