/**
 * @typedef {import('../../vertex').default} Vertex
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Vertex} vertex 
 * @param {Map<string, boolean>} visited 
 * @param {Graph} graph 
 */
function dfsUtil(vertex, visited, graph){
    visited.set(vertex.getKey(), true);
    graph.getNeighborsByVertex(vertex).forEach((neighbor) => {
        if(visited.get(neighbor.getKey()) === false){
            dfsUtil(neighbor, visited, graph);
        }
    });
}

/**
 * @param {Graph} graph
 * @return {boolean} returns true if graph has all vertices 
 * traversed via dfs prior to being reversed and after being reversed, 
 * else it'll return false
 */
export default function kosurajuAlgorithm(graph){
    /**
     * @type {Map<string, boolean>}
     */
    let visited;
    let startVertex = graph.getAllVertices()[0];

    graph.getAllVertices().forEach(vertex => {
        visited.set(vertex.getKey(), false);
    });

    dfsUtil(startVertex, visited, graph);

    graph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false) return false;
    });

    let reversedGraph = graph.reverse();
    reversedGraph.getAllVertices().forEach(vertex => {
        visited.set(vertex.getKey(), false);
    });

    startVertex = reversedGraph.getAllVertices()[0];
    dfsUtil(startVertex, visited, graph);

    reversedGraph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false) return false;
    });

    return true;
}