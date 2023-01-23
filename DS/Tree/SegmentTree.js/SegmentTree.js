import isPowerOfTwo from "../../../maths/isPowerOfTwo/isPowerOfTwo";

export default class SegmentTree{
    /**
     * @param {number[]} inputArray 
     * @param {function} operation - binary functions e.g. sum, max or min function
     * @param {number} operationFallBack - operation fallback value .e. 0 for sum and infinity for min.
     */
    constructor (inputArray, operation, operationFallBack) {
        this.inputArray = inputArray;
        this.operation = operation;
        this.operationFallBack = operationFallBack;

        this.segmentTree = this.initSegmentTree(this.inputArray);
        this.buildSegmentTree();
    }

    /**
     * @param {number[]} inputArray 
     * @return {number[]}
     */
    initSegmentTree(inputArray) {
        let segmentedTreeArrayLength;
        const inputArrayLength = inputArray.length;
        if(isPowerOfTwo(inputArrayLength) === true){
            segmentedTreeArrayLength = 2*(inputArrayLength) - 1;
        } else {
            //input array's length isn't the power of two, so we're gonna find
            //another number which is power of 2; to make array of that size. Because
            //we're gonna fill the array with null, which'll utilize some space. 

            const currentPower = Math.log2(inputArrayLength);
            const nextPower = currentPower + 1;
            const powerOf2 = 2 ** nextPower;
            segmentedTreeArrayLength = 2*(powerOf2) - 1;
        }

        return new Array(segmentedTreeArrayLength).fill(null);
    }

    /**
     * @param {number} parentIndex 
     * @return {number}
     */
    getLeftChildIndex(parentIndex) {
        return 2*(parentIndex) + 1;
    }
        
    /**
     * @param {number} parentIndex 
     * @return {number}
     */
    getRightChildIndex(parentIndex) {
        return 2*(parentIndex) + 2;
    }

    /**
     * Build segment tree recursively
     * 
     * @param {number} leftIndex 
     * @param {number} rightIndex 
     * @param {number} position 
     */
    buildTreeRecursively(leftIndex, rightIndex, position) {
        //If left and right indexes are same it implies that we're done splitting and are at tree's
        //leaf node. We need need to copy that value from inputArray to this.segmentTree.
        if(leftIndex === rightIndex){
            this.segmentTree[position] = this.inputArray[leftIndex];
            return;
        }

        //split the array in 2 halves, and process them recursively
        const middleIndex = Math.floor((leftIndex + rightIndex)/2);

        //process left half of inputArray
        this.buildTreeRecursively(
            leftIndex, middleIndex, this.getLeftChildIndex(position)
        );
        
        //process right half of inputArray
        this.buildTreeRecursively(
            middleIndex + 1, rightIndex, this.getRightChildIndex(position)
        );

        //Once every tree leaf is not empty, we can build tree from 
        //bottom to top from provided {this.operation}. 
        this.segmentTree = this.operation(
            this.segmentTree[this.getLeftChildIndex(position)],
            this.segmentTree[this.getRightChildIndex(position)]
        );
    }

    /**
     * Built segment tree
     */
    buildSegmentTree(){
        const leftIndex = 0;
        const rightIndex = this.inputArray.length - 1;
        const position = 0;
        this.buildTreeRecursively(leftIndex, rightIndex, position);
    }

    /**
     * Do range query recursively in context of {this.operation}
     * 
     * @param {number} queryLeftIndex - left index of query
     * @param {number} queryRightIndex - right index of query
     * @param {number} leftIndex - segment of input array's left index
     * @param {number} rightIndex - segment of input array's right index
     * @param {number} position - root position i.e the parent index of 
     * left and right index of inputArray's segment
     * 
     * @return {number}
     */
    rangeQueryRecursively(
        queryLeftIndex,
        queryRightIndex,
        leftIndex,
        rightIndex, 
        position
    ){
        if(queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex){
            //total overlap
            return this.segmentTree[position];
        }

        if(queryLeftIndex < leftIndex && queryRightIndex > rightIndex){
            //no overlap
            return this.operationFallBack;
        }

        //partial overlapping
        const middleIndex = Math.floor((leftIndex + rightIndex)/2);

        const leftOperationResult = this.rangeQueryRecursively(
            queryLeftIndex, 
            queryRightIndex,
            leftIndex,
            middleIndex,
            this.getLeftChildIndex(position)
        );

        const rightOperationResult = this.rangeQueryRecursively(
            queryLeftIndex, 
            queryRightIndex,
            middleIndex + 1, 
            rightIndex,
            this.getRightChildIndex(position)
        );

        return this.operation(leftOperationResult, rightOperationResult);
    }

    /**
     * @param {number} queryLeftIndex 
     * @param {number} queryRightIndex 
     * @return {number}
     */
    rangeQuery(queryLeftIndex, queryRightIndex){
        const leftIndex = 0;
        const rightIndex = this.inputArray.length - 1;
        const position = 0;

        return this.rangeQueryRecursively(
            queryLeftIndex, 
            queryRightIndex, 
            leftIndex, 
            rightIndex, 
            position
        );
    }
}