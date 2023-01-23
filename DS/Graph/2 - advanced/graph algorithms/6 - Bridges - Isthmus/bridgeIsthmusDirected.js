/**
 * @typedef {import('../../vertex').default} Vertex
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Vertex} startVertex 
 * @param {Map<string, boolean>} visited
 */
function bridgeDFSUtil(startVertex, visited){
    visited.set(startVertex.getKey(), true);
    startVertex.getNeighbors().forEach(neighbor => {
        if(visited.get(neighbor.getKey()) === false){
            bridgeDFSUtil(neighbor, visited);
        }
    });
}

/**
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Graph} graph 
 * @return {boolean} - returns true when there's a bridge in graph else false
 */
export default function hasBridgesInDirectedGraph(graph){
    /**
     * @type {Map<string, boolean>}
     */
    let visited;
    
    graph.getAllVertices().forEach(vertex => {
        visited.set(vertex.getKey(), false);
    });

    let startVertex = graph.getAllVertices()[0];
    bridgeDFSUtil(startVertex, visited);

    graph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false) return false;
    });

    let reversedGraph = graph.reverse();
    
    reversedGraph.getAllVertices().forEach(vertex => {
        visited.set(vertex.getKey(), false);
    });
    
    startVertex = reversedGraph.getAllVertices()[0];
    bridgeDFSUtil(startVertex, visited);

    reversedGraph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false) return false;
    });

    return true;
}