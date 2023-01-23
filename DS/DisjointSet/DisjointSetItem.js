export default class DisjointSetItem {
    constructor(value) {
        this.value = value;
        /** @var {DisjointSetItem} this.parent */
        this.parent = null;
        this.children = new Map();
    }
    /**
     * @returns {*}
     */
    getKey() { 
        return this.value();
    }

    /**
     * @returns {DisjointSetItem[]}
     */
    getChildren(){ 
        return Object.values(this.children); 
    }

    /**
     * @returns {number}
     */
    getRank(){ 
        if(this.getChildren().length === 0) return 0;

        let rank = 0;
        
        this.getChildren().forEach(
            /**
             * @param {Item} item
             */
            (item) => {
                rank += 1;
                rank = item.getRank();
            }
        );

        return rank;
    }

    /**
     * @returns {boolean}
     */
    isRoot(){
        return this.parent === null;
    }

    /**
     * @returns {(boolean | DisjoinSetItem)}
     */
    getRoot(){
        return this.isRoot() ? this : this.parent.getRoot();
    }

    /**
     * @param {DisjointSetItem} parentItem 
     * @param {boolean} setParentChild 
     * @return {DisjointSetItem}
     */
    setParent(parentItem, setParentChild = true){
        this.parent = parentItem;
        if(setParentChild){
            parentItem.addChild(this);
        }
        return this;
    }

    /**
     * @param {DisjointSetItem} childItem 
     * @return {DisjointSetItem}
     */
    addChild(childItem) {
        this.children[childItem.getKey()] = childItem;
        childItem.setParent(this, false);
        return this;
    }
}