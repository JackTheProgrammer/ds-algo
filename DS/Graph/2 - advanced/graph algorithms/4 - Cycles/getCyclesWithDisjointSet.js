import DisjointSet from '../../../../DisjointSet/DisjointSet'

/**
 * <b>Retrieves the cycle(s) in the graph, 
 * but the graph must be undirected </b>
 * 
 * @typedef {import('../../graph').default} Graph
 * @typedef {import('../../vertex').default} Vertex
 * 
 * @param {Graph} graph 
 * @returns {Vertex[]}
 */
export default function getCyclesWithDisjointSet(graph){
    if(graph.isDirected){
        throw new Error("Graph must be undirected");
    }
    let disjointSet = new DisjointSet();
    
    //retrieve and add all of the vertices in the disjoint set
    graph.getAllVertices().forEach(vertex => {
        disjointSet.makeSet(vertex);
    });

    /**
     * @type {Vertex[]}
     */
    let cyclicVertices = [];

    //iterate over all edges of the graph and if edge vertices are in the same set then
    //it implies that there's cycle, else unite them in a set(disjoint). 
    graph.getAllEdges().forEach(edge => {
        let startVertex = edge.startVertex;
        let endVertex = edge.endVertex;

        if(disjointSet.makeSet(startVertex, endVertex)){
            cyclicVertices.push(...[startVertex, endVertex]);
        } else {
            disjointSet.union(startVertex, endVertex);
        }
    });

    return cyclicVertices;
}