/**
 * @typedef {import('../../vertex').default} Vertex
 * 
 * @param {Vertex} startVertex 
 * @param {Map<string, boolean>} visited 
 */

function dfsUtil(startVertex, visited){
    visited.set(startVertex.getKey(), true);
    startVertex.getNeighbors().forEach(neighbor => {
        if(visited.get(neighbor.getKey()) === false){
            dfsUtil(neighbor, visited);
        }
    });
}

/**
 * @typedef {import('../../graph').default} Graph
 * 
 * @param {Graph} graph 
 * @return {boolean}
 */
function isConnected(graph){
    /**
     * @type {Map<string, boolean>}
     */
    let visited;
    
    graph.getAllVertices().forEach(vertex => {
        visited.set(vertex.getKey(), false);
    });

    //finding whether the graph has edges, if 0 graph then it has eulerian path
    if(graph.getAllEdges().length === 0){ 
        return true;
    }
    
    for(let vertex of graph.getAllVertices()){
        // Find a vertex with non-zero degree
        if(vertex.getDegree() !== 0){
            break;
        } else {
            dfsUtil(vertex, visited);
        }
    }

    graph.getAllVertices().forEach(vertex => {
        if(visited.get(vertex.getKey()) === true && vertex.getDegree() > 0){
            return false;
        } else {
            return true;
        }
    });

    return true;
}

/**
 * The function returns one of the following values
 * 0 --> If graph is not Eulerian.
 * 1 --> If graph has an Euler path (Semi-Eulerian).
 * 2 --> If graph has an Euler Circuit (Eulerian).
 * 
 * @param {Graph} graph 
 * @return {number}
 */
export default function isEulerian(graph){
    // Check if all non-zero degree vertices are connected
    if(isConnected(graph) === true){
        return 0;
    }

    let odd = 0;
    // Count all odd vertices
    graph.getAllVertices().forEach(vertex => {
        if(vertex.getDegree() % 2 !== 0){
            ++odd;
        }
    });

    // If count is more than 2, then graph is not Eulerian
    if(odd > 2){
        return 0;
    }

    // If odd count is 2, then semi-eulerian.
    // If odd count is 0, then eulerian
    // Note that odd count can never be 1 for undirected graph
    return (odd === 2) ? 1 : 2;
}