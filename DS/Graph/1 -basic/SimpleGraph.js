export default class SimpleGraph{
    #vertices = new Set();
    #adjacencyList = new Map();

    get vertices(){
        return Array.from(this.#vertices);
    }

    get adjacentList(){
        list = {};

        this.#adjacencyList.forEach((value, key) => {
            list[key] = value;
        });

        return list;
    }

    addVertex(vertex = null){
        if(vertex !== null && vertex !== undefined){
            this.#vertices.add(vertex);
            this.#adjacencyList.set(vertex, new Set());
        }
    }

    addEdge(vertex1 = null, vertex2 = null, directed = true){
        if(vertex1 !== null && vertex2 !== null && vertex1 !== vertex2){
            if(this.#adjacencyList.has(vertex1)){
                this.addVertex(vertex1);
            }

            if(this.#adjacencyList.has(vertex2)){
                this.addVertex(vertex2);
            }
        }

        this.#adjacencyList.get(vertex1).add(vertex2);

        if(directed){
            this.#adjacencyList.get(vertex2).add(vertex1);
        }
    }

    traverse(traversalArgs, arbitraryVertex){
        switch (traversalArgs) {
            case "b":
                console.log(this.#breadthFirstSearch(arbitraryVertex));
                break;
            case "d":
                console.log(this.#depthFirstSearch(arbitraryVertex));
                break;
            default:
                console.log("invalid argument");
                break;
        }
    }

    #breadthFirstSearch(startVertex){
        let queue = [];
        let visited = [];

        queue.push(startVertex);

        while(queue.length){
            var currentVertex = queue.shift();
            visited.push(currentVertex);
            for(let neighboringNode in this.#adjacencyList[currentVertex]){
                queue.push(neighboringNode);
            }
        }

        return visited;
    }

    #depthFirstSearch(startVertex){
        let stack = new Set();
        let visited = [];

        stack.add(startVertex);

        for(let neighbor in this.#adjacencyList[startVertex]){
            if(!stack.has(neighbor)){
                visited.push(neighbor);
                this.#depthFirstSearch(neighbor);
            }
        }

        return visited;
    }

    deleteEdge(vertex){
        this.#adjacencyList.delete(vertex);
        this.#vertices.delete(vertex);
    }

    updateEdge(vertex, node){
        this.#adjacencyList.get(vertex).add(node);
    }
}