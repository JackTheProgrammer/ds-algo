/**
 * Utility method for finding bridges in the graph
 * 
 * @typedef {import('../../vertex').default} Vertex
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Vertex} startVertex -starting point of DFS traversal
 * @param {Map<string, boolean>} visited -keeps track of visited vertex
 * @param {Map<string, number>} disc -keeps track of each vertex's discovery time
 * @param {Map<string, Vertex>} parents -keeps track of each neighbors' vertex
 * @param {Map<string, number>} low - keeps track of how many times a node is being discovered
 * @param {Map<string, boolean>} bridgeIsthmus - stores bridges found in a graph by 
 * setting them in key - value pair such that VertexA's key - VertexB's: {true || false}
 * @param {Graph} graph -the good old graph
 */
function bridgeDFSUtil(startVertex, visited, disc, parents, low, bridgeIsthmus, graph){
    visited.set(startVertex.getKey(), true);
    let discoveryTime = 0;
    disc.set(startVertex.getKey(), ++discoveryTime);
    low.set(startVertex.getKey(), ++discoveryTime);

    graph.getNeighborsByVertex(startVertex).forEach(neighbor => {
        let currentNeighbor = neighbor;
        if(!visited.has(currentNeighbor.getKey())){
            parents.set(currentNeighbor.getKey(), currentNeighbor);
            bridgeDFSUtil(currentNeighbor, visited, disc, parents, low, bridgeIsthmus, graph);

            //Check if the dfs tree rooted with [currentNeighbor] has a connection
            //with [startVertex]'s ancestors
            low[startVertex.getKey()] = Math.min(
                low[currentNeighbor.getKey()],
                low[startVertex.getKey()]
            );

            //Check if the lowest vertex reachable from dfs subtree of [currentNeighbor]
            //is below [startVertex] in dfs subtree, then there is a bridge - isthmus b/w these
            //two vertices
            if(disc.get(startVertex.getKey()) < low.get(currentNeighbor.getKey())){
                bridgeIsthmus.set(`${startVertex.getKey()} - ${currentNeighbor.getKey()}`, true);
            }
        } else if(currentNeighbor !== parents.get(startVertex.getKey())){
            low[startVertex.getKey()] = Math.min(
                low[currentNeighbor.getKey()],
                low[startVertex.getKey()]
            ); //finding which of the vertex is discovered lowest of time
        }
    });
}

/**
 * finds bridges in a given graph
 * @param {Graph} graph 
 */
export default function bridge(graph){
    /**
     * @type {Map<string, number}
     */
    let disc;

    /**
      * @type {Map<string, number>}
     */
    let low;

    /**
      * @type {Map<string, Vertex>}
      */
    let parents;

    /**
      * @type {Map<string, boolean>}
      */
    let visited;

    /**
      * @type {Map<string, boolean>}
      */
    let bridgeIsthmus;

    graph.getAllVertices().forEach((vertex) => {
        bridgeIsthmus.set(vertex.getKey(), false);
        parents.set(vertex.getKey(), null);
        visited.set(vertex.getKey(), false);
    });

    graph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false){
            bridgeDFSUtil(vertex, visited, disc, parents, low, bridgeIsthmus, graph);
        }
    });

    return bridgeIsthmus;
}