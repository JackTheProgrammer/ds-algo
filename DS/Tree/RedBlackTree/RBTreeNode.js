const Color = Object.freeze({
    red: "red",
    black: "black",
});

export default class RBTreeNode{
    left = null;
    right = null;
    #color = null;

    constructor(parent = null,  key = null) {
        this.parent = parent;
        this.key = key;

        if(key === null){
            this.#color = Color.black;
        } else {
            this.#color = Color.red;
            this.left = new RBTreeNode(null, this);
            this.right = new RBTreeNode(null, this);
        }
    }

    get color() {
        return this.#color;
    }

    get isBlack() {
        return this.color === Color.black;
    }

    get isRed() {
        return !this.isBlack;
    }

    get isNil() {
        return this.key === null;
    }

    /**
     * @param {string} newColor
     *
     * the color will be either Color.red or Color.black
     *
     */
    set color(newColor){
        if(!this.isNil){
            this.#color = newColor;
        }
    }
}