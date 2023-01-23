import Vertex from '../../vertex'

/**
 * @param {number[][]} adjacencyMatrix
 * @param {Map<string, number>} verticesIndices
 * @param {Vertex[]} cycle
 * @param {Vertex} candidateVertex
 * 
 * @return {boolean}
 */
function isSafe(adjacencyMatrix, verticesIndices, cycle, candidateVertex){
    const endVertex = cycle[cycle.length - 1];
    const endVertexIndexInAdjacencyMatrix = verticesIndices.get(endVertex.getKey());
    const candidateVertexIndexInAdjacencyMatrix = verticesIndices.get(candidateVertex.getKey());

    //check if both end vertex and candidate in the path are adjacent or not
    if(adjacencyMatrix[candidateVertexIndexInAdjacencyMatrix][endVertexIndexInAdjacencyMatrix] === Infinity){
        return false;
    }

    //check whether the candidate key is duplicate or not
    const candidateVertexIsDuplicate = cycle.find((vertex) => {
        vertex.getKey() === candidateVertex.getKey();
    });

    return !!candidateVertexIsDuplicate;
}

/**
 * @param {number[][]} adjacencyMatrix
 * @param {Vertex[]} cycle
 * @param {Map<string, number>} verticesIndices
 */
function isCycle(adjacencyMatrix, cycle, verticesIndices){
    const startVertex = cycle[0];
    const endVertex = cycle[cycle.length - 1];

    const startVertexAdjacencyMatrixIndex = verticesIndices.get(startVertex.getKey());
    const endVertexAdjacencyMatrixIndex = verticesIndices.get(endVertex.getKey());

    //check if both start and end vertex are forming a cycle
    return adjacencyMatrix[startVertexAdjacencyMatrixIndex][endVertexAdjacencyMatrixIndex] !== Infinity;
}

/**
 * Recursively searches for the hamiltonian cycle in list of vertices passed as argument
 * @param {number[][]} adjacencyMatrix
 * @param {Vertex[]} vertices
 * @param {Map<string, number>} verticesIndices
 * @param {Vertex[]} cycle
 * @param {Vertex[][]} cycles
 */
function hamiltonianCycleRecursive(
        adjacencyMatrix, 
        vertices, 
        verticesIndices, 
        cycle, 
        cycles
    ){
    // Clone cycle in order to prevent it from modification by other DFS branches.
    const currentCycle = [...cycle].map((vertex) => Vertex(vertex.value));

    if(vertices.length === currentCycle.length){
        //hamiltonian cycle is found, now we'll check whether it's cyclic or not
        if(isCycle(adjacencyMatrix, currentCycle, verticesIndices)){
            //another solution found
            cycles.push(currentCycle);
        }
        return;
    }

    for(let vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++){
        const currentCandidateVertex = vertices[vertexIndex];
        //check if the vertex isn't already in the cycle
        if(isSafe(adjacencyMatrix, verticesIndices, currentCycle, currentCandidateVertex)){
            //try to find the other candidate vertices as well
            hamiltonianCycleRecursive(
                adjacencyMatrix, 
                vertices, 
                verticesIndices, 
                currentCycle, 
                cycles
            );
        }
        // BACKTRACKING.
        // Remove candidate vertex from cycle path in order to try another one.
        currentCycle.pop();
    }
}

/**
 * This function returns the list of vertices with hamiltonian cycle
 * 
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Graph} graph 
 * @return {Vertex[]}
 */
export default function hamiltonianCycle(graph){
    let verticesIndices = graph.getVerticesIndices();
    let adjacencyMatrix = graph.getAdjacencyMatrix();
    let vertices = graph.getAllVertices();

    // Define start vertex. We will always pick the first one
    // this it doesn't matter which vertex to pick in a cycle.
    // Every vertex is in a cycle so we can start from any of them.
    let startVertex = vertices[0];

    // Initialize cycles array that will hold all solutions.
    let cycles = [];

    // Initialize cycle array that will hold current cycle path.
    let cycle = [startVertex];

    //Now recursively find all hamiltonian cycles in a graph
    hamiltonianCycleRecursive(
        adjacencyMatrix,
        vertices,
        verticesIndices,
        cycle,
        cycles
    );

    //return all hamiltonian cycles in a list
    return cycle;
}