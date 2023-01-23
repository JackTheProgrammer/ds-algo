import LinkList from './LinkList'

export default class Vertex {
    constructor(value){
        if (value === null){
            throw new Error("value is null")
        }; 

        /**
         * @typedef {import('./edge').default} Edge
         * 
         * @param {Edge} edgeA 
         * @param {Edge} edgeB 
         * @returns 
         */ 
        const edgeComparator = (edgeA, edgeB) => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }
            
            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        }
        this.value = value;
        this.edges = new LinkList(edgeComparator);
    }
    
    /**
     * Returns the node's vertex
     * 
     * @returns {string}
     */
    getKey(){
        return this.value;
    }

    /**
     * appends the edge with [this.startVertex, this.endVertex] using LinkList data structure
     * 
     * @typedef {import('./edge').default} Edge
     * @param {Edge} edge 
     * @returns {Vertex}
     */
    addEdge(edge){
        this.edges.append(edge);
        return this;
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @param {Edge} edge 
     */
    deleteEdge(edge){
        this.edges.delete(edge);
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @returns {Edge[]}
     */
    getEdges(){
        return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
    }

    /**
     * @typedef {import('./vertex').default} Vertex
     * @returns {Vertex[]}
     */
    getNeighbors(){
        const edges = this.edges.toArray();

        /**
         * @typedef {import('./linklistnode').default} LinkListNode
         * @param {LinkListNode} node 
         */
        const neighborFinderCallback = (node) => {
            return node.value.startVertex === this 
                ? node.value.endVertex 
                : node.value.startVertex;
        };

        return edges.map(neighborFinderCallback);
    }

    /** @return {number} */
    getDegree(){
        return this.getEdges().length;
    }

    /** 
     * @return {Vertex} 
    */
    deleteEdges(){
        this.getEdges().forEach((edge) => this.deleteEdge(edge));
        return this;
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @param {Edge} edge 
     * @returns {boolean}
    */
    hasEdge(requiredEdge){
        const edgeNode = this.edges.find({
            /**
             * @typedef {import('./edge').default} Edge
             * @param {Edge} edge 
             * @returns {boolean}
             */
            callback: edge => edge === requiredEdge
        });

        return !!edgeNode;
    }
    /** 
     * @param {Vertex} vertex 
     * @return {boolean}
     */
    hasNeighbor(vertex){
        const neighborNode = this.edges.find({
            /**
             * @typedef {import('./edge').default} Edge
             * @param {Edge} edge 
             * @returns {boolean}
            */
            callback: (edge) => edge.startVertex === vertex || edge.endVertex === vertex
        });

        return !!neighborNode;
    }

    /**
     * @typedef {import('./edge').default} Edge
     * @param {Vertex} vertex 
     * @returns {(Edge | null)}
     */
    findEdge(vertex){
        /**
         * @typedef {import('./edge').default} Edge
         * @param {Edge} edge 
         * @returns {boolean}
         */
        const edgeFinderCallBack = (edge) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edgeNode = this.edges.find({callback: edgeFinderCallBack});

        return edgeNode ? edgeNode.value : null;
    }

    /** @return {string} */
    toString(){
        return this.getKey();
    }
}   