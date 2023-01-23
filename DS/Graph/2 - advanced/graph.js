export default class Graph{
    /**
     * @typedef {import('./vertex').default} Vertex
     * @param {Vertex} startVertex 
     * @param {Vertex} endVertex 
     * @param {boolean} isDirected 
     */
    constructor(startVertex, endVertex, isDirected = false){
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.isDirected = isDirected;

        this.vertices = {};
        this.edges = {};
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @param {Vertex} vertex 
     */
    addVertex(vertex){
        this.vertices[vertex.getKey()] = vertex;
    }

    /** 
     * @typedef {import('./vertex').default} Vertex
     * @return {Vertex[]}
     */
    getAllVertices(){
        return Object.values(this.vertices);
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @return {Edge[]}
     */
    getAllEdges(){
        return Object.values(this.edges);
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @param {Vertex} vertex 
     * @return {Vertex[]}
     */
    getNeighborsByVertex(vertex){
        return vertex.getNeighbors();
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @param {Vertex} vertex 
     * @return {number}
     */
    getDegree(vertex){
        return vertex.getDegree();
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @param {Vertex} vertex 
     * @return {Edge[]}
     */
    getEdges(vertex){
        return vertex.getEdges();
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @param {*} key 
     * @returns {Vertex}
     */
    getVertexByKey(key){
        return this.vertices[key];
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @param {Edge} edge 
     * @return {Graph}
     */
    addEdge(edge){
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        if(!startVertex){
            this.addVertex(startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }

        if(!endVertex){
            this.addVertex(endVertex);
            endVertex = this.getVertexByKey(edge.startVertex.getKey());
        } else {
            throw new Error('Edge has already been added before');
        }

        if(!this.edges[edge.getKey()]){
            this.edges[edge.getKey()] = edge;
        }

        if(this.isDirected){
            startVertex.addEdge(edge);
        } else {
            startVertex.addEdge(edge);
            endVertex.addEdge(edge);
        }

        return this;
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @param {Edge} edge 
     */
    deleteEdge(edge){
        if(!this.edges[edge.getKey()]){
            throw new Error(`${edge} not found`);
        }

        delete this.vertices[edge.getKey()];

        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        startVertex.deleteEdge(edge);
        endVertex.deleteEdge(edge);
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @typedef {import('./edge').default} Edge
     * 
     * @param {Vertex} startVertex 
     * @param {Vertex} endVertex 
     * @return {(Edge | null)}
     */
    findEdge(startVertex, endVertex){
        const vertex = this.getVertexByKey(startVertex.getKey());

        if(!vertex){
            return null;
        }

        return vertex.findEdge(endVertex);
    }

    /**
     * @return {number}
     */
    getWeight(){
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight;
        }, 0);
    }

    /**
     * @return {Graph}
     */
    reverse(){
        this.getAllEdges().forEach((edge) => {
            // Delete straight edge from graph and from vertices.
            this.deleteEdge(edge);

            // Reverse the edge.
            edge.reverse();

            // Add reversed edge back to the graph and its vertices.
            this.addEdge(edge);
        });

        return this;
    }

    /**
     * @return {Map<string, number>}
     */
    getVerticesIndices(){
        const verticesIndices = {};
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices[vertex.getKey()] = index;
        });

        return verticesIndices;
    }

    /**
     * @return {*[][]}
     */
    getAdjacencyMatrix(){
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();
        
        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity);
        });

        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices[neighbor.getKey()];
                adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(
                    vertex, 
                    neighbor
                ).weight;
            });
        });
        
        return adjacencyMatrix;
    }

    /**
     * @param {Vertex} startVertex 
     * @return {string[]}
     */
    breadthFirstSearch(startVertex){
        let queue = []; let visited = [];
        queue.push(startVertex);

        while(queue.length > 0){
            var currentVertex = queue.shift();
            visited.push(currentVertex.getKey());

            currentVertex.getNeighbors().forEach(neighbor => {
                if(!queue.includes(neighbor)){
                    queue.push(neighbor);
                }
            });
        }

        return visited;
    }

    /**
     * @param {Vertex} startVertex 
     * @return {string[]}
     */
    depthFirstSearch(startVertex){
        let visited = [startVertex.getKey()];
        startVertex.getNeighbors().forEach(neighbor => {
            if(!visited.includes(neighbor.getKey())){
                this.depthFirstSearch(neighbor);
            }
        });
        return visited;
    }

    /**
     * @returns {string}
     */
    toString(){
        return this.getAllVertices().toString();
    }
}