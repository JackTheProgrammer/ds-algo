/**
 * @typedef {import('../../vertex').default} Vertex
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Vertex} startVertex - start for DFS traversal
 * @param {Map<string, true>} visited - has all vertices marked as true once visited
 * @param {Map<string, true>} recStack - has record of vertex in recursion stack
 * @param {Graph} graph - the graph for which cycles has to be found
 * 
 * @return {boolean}
 */
function isCycleUtil(startVertex, visited, recStack, graph){
    if(graph.isDirected === false){
        throw new Error("Graph must be directed");
    }
    // Mark the current node as visited and
    // part of recursion stack
    // It means that there is a loop in the graph, thus forming a cycle
    if(recStack.has(startVertex.getKey())){
        return true;
    }

    //In directed graph, the vertex which is visited more than once don't
    //form a cycle
    if(visited.has(startVertex.getKey())){
        return false;
    }

    graph.getNeighborsByVertex(startVertex).forEach(neighbor => {
        if(isCycleUtil(neighbor, visited, recStack, graph)){
            return true
        }
        recStack.set(neighbor.getKey(), false);
    });

    //no cycle found
    return false;
}

/**
 * @param {Graph} graph 
 * @return {boolean}
 */
export default function hasCyclesInDirectedGraph(graph){
    /**
     * @type {Map<string, boolean>}
     */
    let visited;

    /**
     * @type {Map<string, boolean>}
     */
    let recStack;

    graph.getAllVertices().forEach(vertex => {
        visited.set(vertex.getKey(), false);
        recStack.set(vertex.getKey(), false);
    });

    graph.getAllVertices().forEach(vertex => {
        if(isCycleUtil(vertex, visited, recStack, graph)){
            return true;
        }
    });

    return false;
}