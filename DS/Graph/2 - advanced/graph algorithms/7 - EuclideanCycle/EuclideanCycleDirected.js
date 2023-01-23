import kosurajuAlgorithm from "../3 - StronglyConnectedGraphs/kosuraju's algo";

/**
 * This function returns true if the directed graph has a eulerian
 * cycle, otherwise returns false
 *
 * @typedef {import('../../graph').default} Graph
 *
 * @param {Graph} graph
 * @return {Map<string, boolean> | boolean} returns boolean false if
 * directed graph isn't connected closely
 */
export default function getEulerianCycleDirectedGraph(graph){
    if(graph.isDirected === true){
        throw new Error("Graph must be directed");
    }

    // Check if graph is connected or not
    if(kosurajuAlgorithm(graph) === false){
        return false;
    }

    /**
     * @type {Map<string, boolean>}
     */
    let eulerianCycle;

    // Check if in degree and out degree of every vertex is same
    graph.getAllVertices().forEach(vertex => {
        graph.getNeighborsByVertex(vertex).forEach(neighbor => {
            if(vertex.getDegree() !== neighbor.getDegree()){
                eulerianCycle.set(`${vertex.getKey()} - ${neighbor.getKey()}`, false);
            } else {
                eulerianCycle.set(`${vertex.getKey()} - ${neighbor.getKey()}`, true);
            }
        });
    });

    return eulerianCycle;
}