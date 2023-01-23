import DisjointSetItem from "./DisjointSetItem";
export default class DisjointSet{
    constructor(){
        this.items = new Map();
    }

    /**
     * @param {*} item
     * @return {DisjointSet}
     */
    makeSet(itemVal){
        let newDisjoinSetItem = new DisjointSetItem(itemVal)
        if(!this.items[newDisjoinSetItem.getKey()]){
            this.items[newDisjoinSetItem.getKey()] = newDisjoinSetItem;
        }
        return this;
    }

    /**
     * @param {*} itemVal 
     * @returns {(null | string)}
     */
    find(itemVal){
        let tempDisjointItem = new DisjointSetItem(itemVal);
        let requiredItem = this.items[tempDisjointItem.getKey()];

        if(!requiredItem){
            return null;
        }

        return requiredItem.getRoots().getKey();
    }

    /**
     * @param {*} itemVal1 
     * @param {*} itemVal2 
     * @returns {DisjoinSet}
     */
    union(valueA, valueB) {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        if (rootKeyA === rootKeyB) {
            // In case if both elements are already in the same set then just return its key.
            return this;
        }

        const rootA = this.items[rootKeyA];
        const rootB = this.items[rootKeyB];

        if (rootA.getRank() < rootB.getRank()) {
            // If rootB's tree is bigger then make rootB to be a new root.
            rootB.addChild(rootA);

            return this;
        }

        // If rootA's tree is bigger then make rootA to be a new root.
        rootA.addChild(rootB);

        return this;
    }

    /**
     * @param {*} item1 
     * @param {*} item2 
     * @returns {boolean}
     */
    isInSameSet(item1, item2) {
        const item1RootKey = this.find(item1);
        const item2RootKey = this.find(item2);

        if(!item1RootKey || !item2RootKey){
            throw new Error(
                "One of the items doesn't exist in the set." +
                "Both should be present"
            );
        }

        return this.items[item1RootKey] === this.items[item2RootKey];
    }
}