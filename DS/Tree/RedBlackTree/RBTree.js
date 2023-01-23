import RBTreeNode from "./RBTreeNode";
import BinarySearchTree from "../BinarySearchTree/BinarySearchTree";

const Color = Object.freeze({
    red = "red",
    black: "black",
});

export default class RBTree extends BinarySearchTree{
    #root;

    get root(){
        return this.#root;
    }

    createNode(key = null, parent = null){
        return RBTreeNode(key, parent);
    }

    /**
     * @param {RBTreeNode} node 
     */
    #RRotation(node){
        console.log(`${node.key}'s right rotation`);
        if(node.left){
            const parentNode = node.parent;
            const detached = node.left;
            node.right = detached.left;
            detached.left = node;
            node.parent = detached;

            if(node.left !== null){
                node.left.parent = node;
            }

            //check if parentNode isn't the root node.
            if(parentNode !== null){
                if(parentNode === parentNode.left){
                    parentNode.left = detached;
                } else if(parentNode === parentNode.right){
                    parentNode.right = detached;
                }
            } else {
                this.#root = detached;
            }
            detached.parent = parentNode;
        }
    }

    /**
     * @param {RBTreeNode} node 
     */
    #LRotation(node){
        console.log(`${node.key}'s left rotation`);
        if(node.right){
            const parentNode = node.parent;
            const detached = node.right;
            node.right = detached.left;
            detached.left = node;
            node.parent = detached;

            if(node.right !== null){
                node.right.parent = node;
            }

            //check if parentNode isn't the root node.
            if(parentNode !== null){
                if(parentNode === parentNode.right){
                    parentNode.left = detached;
                } else {
                    parentNode.right = detached;
                }
            } else {
                this.#root = detached;
            }
            detached.parent = parentNode;
        }
    }

    /**
     * @param {RBTreeNode} node 
     */
    #reColorNode(node){
        node.color = Color.black;
        node.parent.color = Color.red;
    }

    /**
     * @param {RBTreeNode} parentNode 
     * @param {RBTreeNode} uncleNode 
     * @param {RBTreeNode} grandParentNode 
     */
    #handleRedUncle(parentNode, uncleNode, grandParentNode){
        parentNode.color = Color.black;
        uncleNode.color = Color.black;
        grandParentNode.color = Color.red;
        this.#adjustInsertNode(grandParentNode);
    }

    /**
     * @param {RBTreeNode} node 
     */
    #handleBlackUncle(uncleNode){
        const parentNode = uncleNode.parent;

        if(uncleNode === parentNode.left){
            if(parentNode === parentNode.parent.left){
                console.log("left node, left parent");
                this.#RRotation(parentNode.parent);
                this.#reColorNode(parentNode);
            } else {
                console.log("Left node, right rotation");
                this.#RRotation(parentNode);
                this.#reColorNode(parentNode);
                console.log("node's parent's left rotation");
                this.#LRotation(node.parent)
            }
        } else {
            if(parentNode === parentNode.parent.right){
                console.log("right node, right parent");
                this.#LRotation(parentNode);
                this.#reColorNode(parentNode);
            } else {
                console.log("Left node's left rotation");
                this.#LRotation(parentNode);
                this.#reColorNode(parentNode);
                console.log("Node's parent's right rotation");
                this.#RRotation(node.parent);
            }
        }
    }

    /**
     * @param {RBTreeNode} newNode 
     */
    #adjustInsertNode(newNode){
        if(newNode.parent === null){
            newNode.color = Color.black;
        } else if(newNode.parent.isRed){
            const parentNode = node.parent;
            const grandParentNode = parentNode.left;
            const uncleNode = grandParentNode.left === parentNode.left
                            ? grandParentNode.right
                            : grandParentNode.left;
                            
            if(uncleNode.isBlack){
                this.#handleBlackUncle(uncleNode);
                console.log("black uncle, red parent");
            } else if(uncleNode.isRed){
                this.#handleRedUncle(parentNode, uncleNode, grandParentNode);
                console.log("red uncle, black parent");
            }
        }
    }

    /**
     * @param {RBTreeNode} newNode 
     * @param {RBTreeNode} currentNode 
     */
    #insertNode(newNode, currentNode = this.#root){
        if(newNode.key < currentNode.key){
            if(currentNode.left.isNil){
                currentNode.left = newNode;
                newNode.parent = currentNode;
            } else {
                this.#insertNode(newNode, currentNode.left);
            }
        } else {
            if(currentNode.right !== null || currentNode.right.isNil){
                currentNode.right = newNode;
                newNode.parent = currentNode;
            } else {
                this.#insertNode(newNode, currentNode.right);
            }
            this.#adjustInsertNode(newNode);
        }
    }

    /**
     * @param {number} key 
     */
    insert(key){
        const newNode = this.createNode(key);

        if(this.#root === null){
            this.#root = newNode;
        } else {
            this.#insertNode(newNode);
            this.#adjustInsertNode(newNode);
        }
    }

    /**
     * @param {RBTreeNode} node 
     * @return {RBTreeNode}
     */
    #getNodeSibling(node){
        const parentNode = node.parent;

        const sibling = parentNode.left === node.left 
                        ? parentNode.right 
                        : parentNode.left;
        
        return sibling;
    }

    /**
     * @param {RBTreeNode} node 
     * sibling is black with 2 red children
     */
    #handleCase2(node){
        const sibNode = this.#getNodeSibling(node);

        if(sibNode.isRed){
            const parentNode = node.parent;
            sibNode.color = Color.black;
            parentNode.color = Color.red;

            if(node === parentNode.left){
                this.#LRotation(parentNode);
            } else {
                this.#RRotation(parentNode);
            }
        }

        this.#handleCase3(node);
    }

    /**
     * @param {RBTreeNode} node 
     * node parent is black, sibling and its children are black
     */
    #handleCase3(node){
        const sibNode = this.#getNodeSibling(node);
        const parentNode = node.parent;
        if(parentNode.isBlack && sibNode.isBlack 
            && sibNode.left.isBlack 
            && sibNode.right.isBlack){
                
                sibNode.color = Color.red;
                this.#handleRemoveNode(parentNode);
            
            } 
            else {
                this.#handleCase4(node);
            }
    }

    /**
     * @param {RBTreeNode} node 
     * node parent is red, sibling and its children are black
     */
    #handleCase4(node){
        const sibNode = this.#getNodeSibling(node);
        const nodeParent = node.parent;

        if(
            nodeParent.isRed && sibNode.isBlack
            && sibNode.left.isBlack && sibNode.right.isBlack
        ){
            parentNode.color = Color.black;
            sibNode.color = Color.red;
        } else {
            this.#handleCase5(node);
        }
    }

    /**
     * @param {RBTreeNode} node 
     * sibling is black with black right and red left
     */
    #handleCase5(node){
        const sibNode = this.#getNodeSibling(node);

        if(sibNode.isBlack){
            const parentNode = node.parent;

            if(
                node === parentNode.left && sibNode.left.isRed
                && sibNode.right.isBlack
            ){
                sibNode.color = Color.red;
                sibNode.left.color = Color.black;
                this.#RRotation(sibNode);
            }

            if(
                node === parentNode.left && sibNode.right.isRed
                && sibNode.left.isBlack
            ){
                    sibNode.color = Color.black;
                    sibNode.right.color = Color.black;
                    this.#LRotation(sibNode);
            }
        }
        this.#handleCase6(node);
    }

    /**
     * @param {RBTreeNode} node 
     * sibling is black with red right and black left
     */
    #handleCase6(node){
        const sibNode = this.#getNodeSibling(node);
        const parentNode = node.parent;

        sibNode.color = parentNode.color;
        parentNode.color = Color.black;

        if(node === parentNode.left){
            sibNode.right.color = Color.black;
            this.#LRotation(parentNode);
        } else {
            sibNode.left.color = Color.black;
            this.#RRotation(parentNode);
        }
    }

    /**
     * @param {RBTreeNode} node 
     * node is black with a parent node.
     */
    #handleRemoveNode(node){
        if(node.isBlack && node.parent !== null){
            this.#handleCase2(node);
        }
    }

    /**
     * @param {RBTreeNode} node 
     * @return {RBTreeNode}
     */
    #maxNode(node){
        while(node && node.isNil !== true && node.right !== null){
            node = node.right;
        }
        return node;
    }

    /**
     * @param {number} key 
     * @param {RBTreeNode} node 
     */
    #removeNode(key, node = this.#root){
        if(node === null || node.isNil) return;

        if(key < node.key){
            this.#removeNode(key, node.left);
        } else if(key > node.key){
            this.#removeNode(key, node.right);
        } else if(node.left === null && node.right === null){
            if(node.parent === null){
                this.#root = null;
                if(node === node.parent.left){
                    node.parent.left = this.createNode(null, node);
                } else if(node === node.parent.right){
                    node.parent.right = this.createNode(null, node);
                }
            } else if(node.left.isNil){
                //match node lack left or right node
                node.key = node.right.key
                node.right = this.createNode(null, node);
            } else if(node.right.isNil){
                node.key = node.left.key
                node.left = this.createNode(null, node);
            } else {
                // match node has both children
                const max = this.#maxNode(node);
                node.key = max.key;
                this.#removeNode(node.key, node.left)
            }
        }
    }

    /**
     * @param {number} key 
     */
    remove(key){
        this.#removeNode(key);
    }
}