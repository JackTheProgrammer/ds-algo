/**
 * This will be a helper function for finding the 
 * articulation points in the graph provided as an argument.
 * 
 * @typedef {import('../../vertex').default} Vertex
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Vertex} startVertex -starting point of DFS traversal
 * @param {Map<string, boolean>} visited -keeps track of visited vertex
 * @param {Map<string, number>} disc -keeps track of each vertex's discovery time
 * @param {Map<string, Vertex>} parents -keeps track of every neighbors' vertex
 * @param {Map<string, number>} low - keeps track of how many times a node is being discovered
 * @param {Map<string, boolean>} articulationPoints - stores articulation found in a graph by 
 * setting them in key - value pair such that VertexAP: {true || false}
 * @param {Graph} graph -the good old graph
 */
function articulationPointsDFS(startVertex, visited, disc, parents, low, articulationPoints, graph){
    visited.set(startVertex.getKey(), true);

    //let's acquire the count of children of every vertex in DFS traversal,
    //and set it to zero initially
    let children = 0;

    //let us have each vertex's discoverTime as zero initially
    let discoverTime = 0;
    disc.set(startVertex.getKey(), ++discoverTime);
    low.set(startVertex.getKey(), ++discoverTime);

    // go through all neighbors of startVertex
    graph.getNeighborsByVertex(startVertex).forEach(neighbor => {
        let currentVertex = neighbor;
        if(visited.get(currentVertex.getKey()) === false){
            parents.set(startVertex.getKey(), currentVertex);
            ++children;
            articulationPointsDFS(currentVertex, visited, disc, parents, low, articulationPoints, graph);

            //Check if the dfs traversal tree rooted with [currentVertex] has a 
            //connection with the one of the ancestor of [startVertex]. 
            low[startVertex.getKey()] = Math.min(
                low[startVertex.getKey()], 
                low[currentVertex.getKey()]
            );

            /**
            * The [startVertex] can be an articulation point in either case:
            *   i) The [startVertex] itself is the root of the DFS traversal 
            *      tree and has more than 1 children
            * 
            *   ii) If [startVertex] isn't the root and its discovery time is 
            *       less than or equal to its low. 
            */

            //condition (i)
            if(parents.get(startVertex.getKey()) === null && children > 1){
                articulationPoints.set(startVertex.getKey(), true);
            }

            //condition (ii)
            if(parents.get(startVertex.getKey()) !== null && 
                        low.get(currentVertex.getKey()) >= disc.get(startVertex.getKey())){
                articulationPoints.set(startVertex.getKey(), true);
            }
        } else if(currentVertex !== parents.get(startVertex.getKey())){
            low[startVertex.getKey()] = Math.min(
                low[startVertex.getKey()], 
                low[currentVertex.getKey()]
            ); //It updates the low values of the startVertex for parent function calls
        }
    });
}

/**
 * This is the actual function which'll return the articulation points found and will use
 * upper defined function for the purpose of articulation points discovery
 * 
 * @param {Graph} graph - the graph for which the articulation points are to be found
 * @return {Map<string, boolean>} the map containing key as vertices' keys and values as boolean
 * true or false after being determined whether they're articulation point or not
 */
export default function articulationPointsInGraph(graph){
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
    let articulationPoints;

    graph.getAllVertices().forEach((vertex) => {
        articulationPoints.set(vertex.getKey(), false);
        parents.set(vertex.getKey(), null);
        visited.set(vertex.getKey(), false);
    });

    graph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === false){
            articulationPointsDFS(vertex, visited, disc, parents, low, articulationPoints, graph);
        }
    });

    return articulationPoints;
}