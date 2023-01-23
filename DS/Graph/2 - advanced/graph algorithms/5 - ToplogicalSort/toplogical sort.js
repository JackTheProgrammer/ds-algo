/**
 * @typedef {import('../../graph').default} Graph
 * @typedef {import('../../vertex').default} Vertex
 * 
 * @param {Graph} graph 
 * @param {Vertex} startVertex 
 * @param {Map<string, boolean>} visited 
 * @param {Map<string, Map<string, boolean>>} recStack
 */
function topologicalSortUtil(graph, startVertex, visited, recStack){
    visited[startVertex.getKey()] = true;
    graph.getNeighbor(startVertex).forEach(neighbor => {
        if(!visited[neighbor.getKey()]){
            topologicalSortUtil(graph, neighbor, visited, recStack);
        }
    });
    recStack.set(startVertex.getKey(), visited) ;
}

//------------------Finished----------------------//

/**
 * @param {Graph} graph 
 * @return {Map}
 */
export default function topologicalSort(graph){
    /**
     * @type {Map<string, Map<string, boolean>>}
     */
    let recStack;

    /**
     * @type {Map<string, boolean>}
     */
    let visited;

    graph.getAllVertices().forEach(vertex => {
        topologicalSortUtil(graph, vertex, visited, recStack);
    });

    return recStack;
}