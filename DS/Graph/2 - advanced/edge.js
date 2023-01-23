export default class Edge{
    /**
     * @typedef {import('./vertex').default} Vertex
     * 
     * @param {Vertex} startVertex 
     * @param {Vertex} endVertex 
     * @param {number} weight 
     */
    constructor(startVertex, endVertex, weight){
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }

    /** 
     * @returns {string}
     */
    getKey(){
        let startVertexKey = this.startVertex.getKey();
        let endVertexKey = this.endVertex.getKey();

        return `${startVertexKey} - ${endVertexKey}`;
    }

    /**
     * @return {Edge}
     */
    reverse(){
        const tempVertex = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = tempVertex;
        return this;
    }

    /**
     * @returns {string}
     */
    toString(){
        return this.getKey();
    }
}