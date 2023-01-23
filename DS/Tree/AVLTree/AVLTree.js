import BinarySearchTree from "../BinarySearchTree/BinarySearchTree";
import BSTNode from "../BinarySearchTree/BSTNode"

export default class AVLTree extends BinarySearchTree {
    #root = null;
    #compare;
    #Balance = Object.freeze({
        UnbalancedLeft: 2,
        UnbalancedRight: -2,
        SemiUnbalancedLeft: 1,
        SemiUnbalancedRight: -1,
        Balanced: 0
    });

    /**
     * @param {function} compareFn
     */
    constructor(compareFn) {
        let fn = null;
    
        if(compareFn && typeof compareFn === 'function') {
            fn = compareFn;
        } else {
            /**
             * @param {number} a
             * @param {number} b
             * @return {number}
             */
            fn = (a, b) => {
                if(a > b) return BinarySearchTree.comparison.BIGGER;
                if(a < b) return BinarySearchTree.comparison.SMALLER;
            
                return BinarySearchTree.comparison.EQUAL;
            }
        }
        this.#compare = fn;
    }

    get root() { 
        return this.#root;
    }

    /**
     * @param {BSTNode} val 
     * @returns {BSTNode}
     */
    createNode(val){
        return new BSTNode(val);
    }

    /**
     * @param {BSTNode} node 
     * @return {number}
     */
    #getNodeHeight(node){
        if(node === null){
            return 0;
        }

        return Math.max(
            this.#getNodeHeight(node.left), 
            this.#getNodeHeight(node.right)
        ) + 1;
    }

    /**
     * @param {BSTNode} node 
     * @return {number}
     */
    #getBalanceFactor(node){
        return this.#getNodeHeight(node.left) - this.#getNodeHeight(node.right)
    }

    /**
     * @param {BSTNode} node 
     * @return {BSTNode}
     */
    #LRotation(node) {
        const detached = node.left;
        node.right = detached.left;
        detached.left = node;
        return detached;
    }

    /**
     * @param {BSTNode} node 
     * @return {BSTNode}
     */
    #RRotation(node) {
        const detached = node.right;
        node.right = detached.left;
        detached.left = node;
        return detached;
    }

    /**
     * @param {BSTNode} node 
     * @return {BSTNode}
     */
    #LRRotation(node) {
        node.left = this.#LRotation(node.left);
        return this.#RRotation(node);
    }

    /**
     * @param {BSTNode} node 
     * @return {BSTNode}
     */
    #RLRotation(node) {
        node.right = this.#RRotation(node.right);
        return this.#LRotation(node);
    }

    /**
     * @param {BSTNode} node 
     * @param {number} value
     * @return {null | BSTNode}
     */
    #balanceNode(node, value = null){
        const nodeBalanceFactor = this.#getBalanceFactor(node);

        if(node === null) return null;

        if(nodeBalanceFactor === this.#Balance.UnbalancedLeft){
            if(value){
                node = this.#compare(value, node.left.value) === BinarySearchTree.comparison.SMALLER
                        ? this.#RRotation(node)
                        : this.#LRRotation(node);
            } else if(node.left){
                const nodeLeftBalanceFactor = this.#getBalanceFactor(node.left);
                if(nodeLeftBalanceFactor === this.#Balance.SemiUnbalancedLeft){
                    return this.#RRotation(node);
                } else if(nodeLeftBalanceFactor === this.#Balance.SemiUnbalancedRight){
                    return this.#LRRotation(node);
                }
            }
        }

        if(nodeBalanceFactor === this.#Balance.UnbalancedRight){
            if(value){
                node = BinarySearchTree.comparison.BIGGER_OR_EQUAL.includes(
                    this.#compare(value, node.right.value)
                )
                ? this.#LRotation(node) 
                : this.#RLRotation(node);
            } else if(node.right){
                const nodeRightBalanceFactor = this.#getBalanceFactor(node.right);
                if (nodeRightBalanceFactor === this.#Balance.SemiUnbalancedLeft) {
                    return this.#LRotation(node);
                } else if (nodeRightBalanceFactor === this.#Balance.SemiUnbalancedRight){
                    return this.#RLRotation(node);
                }
            }
        }

        return node;
    }

    /**
     * @param {BSTNode} newNode 
     * @param {BSTNode} currentNode 
     * @return {BSTNode}
     */
    #insertNode(newNode, currentNode = this.#root){
        if(this.#compare(newNode.value , currentNode.value) === BinarySearchTree.comparison.SMALLER){
            currentNode.left === null 
                ? currentNode.right = newNode 
                : this.#insertNode(newNode, currentNode.left);
        }

        if(this.#compare(newNode.value, currentNode.value) === BinarySearchTree.comparison.BIGGER){
            currentNode.right === null
                ? currentNode.right = newNode
                : this.#insertNode(newNode, currentNode.right);
        }

        return this.#balanceNode(currentNode, newNode.value);
    }

    /**
     * @param {number} value 
     */
    insert(value){
        const newNode = this.createNode(value);
        this.#root === null 
            ? this.#root = newNode 
            : this.#root = this.#insertNode(newNode);
    }

    /**
     * 
     * @param {number} value 
     * @param {BSTNode} currentNode 
     * @returns {BSTNode | null}
     */
    #removeNode(value, currentNode = this.#root){
        if(currentNode === null) return null;

        if(this.#compare(value, currentNode.value) === BinarySearchTree.comparison.SMALLER){
            currentNode.left = this.#removeNode(value, currentNode.left);
            return this.#balanceNode(node);
        } else if (this.#compare(value, currentNode.value) === BinarySearchTree.comparison.BIGGER) {
            currentNode.right = this.#removeNode(value, currentNode.right);
            return this.#balanceNode(node);
        }

        if(node.left === null && node.right === null){
            node = null;
            if(!currentNode.left){
                currentNode = currentNode.right;
            } else if(!currentNode.right){
                currentNode = currentNode.left;
            } else {
                const maxNode = this.max(currentNode);
                currentNode.value = maxNode.value;
                currentNode.left = this.#removeNode(currentNode.value, currentNode.left);
            }
        }
        return this.#balanceNode(currentNode);
    }

    /**
     * @param {number} value 
     */
    remove(value){
        this.#root = this.#removeNode(value);
    }
}