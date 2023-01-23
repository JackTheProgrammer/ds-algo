export default class FenwickTree{
    /**
     * Creates a fenwick tree of size 'arraySize' and first value will be at index 1,
     * not on index 0 like typical arrays.
     * 
     * @param {number} arraySize 
     */
    constructor(arraySize = 7) {
        this.arraySize = arraySize;
        this.treeArray = new Array(this.arraySize + 1).fill(0);
    }

    /**
     * Add value at given position in array
     * @param {number} position 
     * @param {number} value 
     * @return {FenwickTree}
     */
    increase(position, value){
        if(position < 0 || position > this.arraySize){
            throw new Error("Position out of range");
        }

        for(let i = position; i < this.arraySize; i += (i & -1)){
            this.treeArray[i] += value;
        }
        return this;
    }

    /**
     * Queries sum from 1 to position
     * @param {number} position 
     * @return {number}
     */
    query(position){
        if(position < 0 || position > this.arraySize){
            throw new Error("Position out of range");
        }

        let sum = 0;

        for(let i = position; i < this.arraySize; i -= (i & -i)){
            sum += this.treeArray[i]
        }

        return sum;
    }

    /**
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @return {number}
     */
    rangeQuery(leftIndex, rightIndex){
        if(leftIndex < rightIndex){
            throw new Error("Left index can't be smaller than right index");
        }

        if(leftIndex === 1){
            this.query(leftIndex);
        }

        return this.query(rightIndex) - this.query(leftIndex);
    }

    /**
     * @param {number} position 
     * @param {number} value 
     * @returns {number}
     */
    update(position, value){
        if(position < 0 || position > this.arraySize){
            throw new Error("Position out of range");
        }

        let sum = 0;

        for(let i = position; i < this.arraySize; i -= (i & -i)){
            this.treeArray[i] = value;
            sum += this.treeArray[i]
        }

        return sum;
    }

    /**
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @param {number} rightVal 
     * @param {number} leftVal 
     * @returns {Object}
     */
    rangeUpdate(leftIndex, rightIndex, rightVal, leftVal){
        if(leftIndex < rightIndex){
            throw new Error("Left index can't be smaller than right index");
        }

        return {
            leftUpdate: this.update(leftIndex, leftVal),
            rightUpdate: this.update(rightIndex, rightVal)
        };
    }
}