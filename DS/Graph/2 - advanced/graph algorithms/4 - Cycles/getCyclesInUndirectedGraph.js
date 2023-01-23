/**
 * Perform DFS on the graph and returns true if any back-edge is found in the graph
 * 
 * @typedef {import('../../vertex').default} Vertex
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Vertex} startVertex - start for DFS traversal
 * @param {Map<string, boolean>} visited - has all vertices marked as true once visited
 * @param {Map<string, boolean>} cyclesFound - has pairs of vertices with 
 * a boolean indicating being cyclic or not
 * @param {Map<string, Vertex>} parents  - holds all vertices' parents
 * @param {Graph} graph - the graph for which cycles has to be found
 * 
 * @return {boolean}
 */
function dfsUtilCyclesUndirected(startVertex, visited, parents, cyclesFound, graph){
    if(graph.isDirected === false){
        throw new Error("Graph is not directed");
    }

    visited.set(startVertex.getKey(), true);

    graph.getNeighborsByVertex(startVertex).forEach((neighbor) => {
        let currentNeighbor = neighbor;
        // if currentNeighbor is not visited
        if(visited.get(currentNeighbor.getKey()) === false){
            //set the currentNeighbor's parent as startVertex
            parents.set(startVertex.getKey(), currentNeighbor);
            if(dfsUtilCyclesUndirected(currentNeighbor, visited, parents)){
                return true;
            }
        } else if(currentNeighbor !== parents.get(startVertex.getKey())){
            // the above conditions fulfilling implies that the 
            //currentNeighbor is discovered and it's not startVertex's child

            //We found the back - edge
            cyclesFound.set(`${startVertex.getKey()} - ${currentNeighbor.getKey()}`, true);
            return true;
        }
    });

    return false;
}

/**
 * @typedef {Object} CyclesInGraph
 * @property {Map<string, Vertex>} parents - parents of every vertex
 * @property {Map<string, boolean>} cyclesFound - vertices pair of being cyclic or not
 * 
 * @param {Graph} graph 
 * @return {CyclesInGraph}
 */
export default function getCyclesInUndirectedGraph(graph){
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
    let cyclesFound;

    graph.getAllVertices().forEach(vertex => {
        parents.set(vertex.getKey(), null);
        visited.set(vertex.getKey(), false);
    });

    graph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false){
            dfsUtilCyclesUndirected(vertex, parents, visited, cyclesFound, graph);
        }
    });

    return {
        parents: parents,
        cyclesFound: cyclesFound,
    };
}