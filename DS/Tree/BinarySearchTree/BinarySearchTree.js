import BSTNode from "./BSTNode";

export default class BinarySearchTree{
    constructor(value){
        this.root = new BSTNode(value);
        this.count = 1;
    }

    get size(){
        return this.#count;
    }

    static get comparison() {
        return Object.freeze({
            BIGGER: 1,
            BIGGER_OR_EQUAL: [1, 0],
            SMALLER: -1,
            SMALLER_OR_EQUAL: [-1, 0],
            EQUAL: 0
        });
    }

    insert(value){
        let newNode = new BSTNode(value);

        /**
         * @param {BSTNode} node
         */
        searchTree = node => {
            if(value < node.value){
                if(!node.left){
                    node.left = newNode;
                } else {
                    searchTree(node.left);
                }
            }

            if(value > node.value){
                if(!node.right){
                    node.right = newNode;
                } else {
                    searchTree(node.right);
                }
            }
        };

        searchTree(this.root);
    }

    /**
     * @param {BSTNode} node
     */
    max(node = this.root){
        while(node !== null){
            node = node.right;
        }
        return node;
    }

    /**
     * @param {number} val 
     * @param {BSTNode} node 
     * @return {null | BSTNode}
     */
    #removeNode(val, node = this.root){
        if(node === null) return;

        if(val < node.value){
            node.left = this.remove(val, node.left);
            return node;
        } 
        
        if(val > node.value){
            node.right = this.remove(val, node.right);
            return node;
        }

        if(node.left === null && node.right === null){
            if(!node.left){
                node = node.right;
                return node;
            } else if(node.right === null){
                node = node.left;
                return node;
            } else {
                let max = this.max(node.left);
                node.value = max.value;
                node.left = this.#removeNode(node.value, node.left);
            }
        }
        return node;
    }

    remove(val){
        this.root = this.#removeNode(val);
    }

    breadFirstSearch(){
        let visitedQueue = []; 
        let result = [];

        visitedQueue.push(this.root);

        while(queue.length){
            var currentNode = visitedQueue.shift();
            result.push(currentNode);

            if(currentNode.left){
                visitedQueue.push(currentNode.left);
            }

            if(currentNode.right){
                visitedQueue.push(currentNode.right);
            }
        }
        return result;
    }

    inOrderDepthFirstSearch(){
        const results = [];

        /**
         * @param {BSTNode} node
         */
        traverse = node => {
            if(node.left) traverse(node.left);
            results.push(node.value);
            if(node.right) traverse(node.right);
        };

        traverse(this.root);
    }

    preOrderDepthFirstSearch(){
        const results = [];

        /**
         * @param {BSTNode} node
         */
        traverse = node => {
            results.push(node.value);
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
        };

        traverse(this.root);
    }

    postOrderDepthFirstSearch(){
        const results = [];

        /**
         * @param {BSTNode} node
         */
        traverse = node => {
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
            results.push(node.value);
        };

        traverse(this.root);
    }

    reverseOrderTraversal(){
        const results = [];

        /**
         * @param {BSTNode} node
         */
        traverse = node => {
            if(node.right) traverse(node.right);
            if(node.left) traverse(node.left);
            results.push(node.value);
        };

        traverse(this.root);
    }
    
    #printNode = (node = this.root, spaceCount = 0, label = '* ') => {
        if(node === null) {
            return console.log(`${' -'.repeat(spaceCount)}${label}null`);
        }
    
        console.log(`${' -'.repeat(spaceCount)}${label}${node.key}`);
        this.#printNode(node.right, spaceCount + 2, 'R: ');
        this.#printNode(node.left, spaceCount + 2, 'L: ');
    }

    print(){
        this.#printNode();
    }
}