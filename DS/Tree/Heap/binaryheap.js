export default class BinaryHeap{
    constructor(){
        this.data = [];
    }

    /**
     * @param {number} childIndex 
     * @returns {number}
     */
    getParentIndex(childIndex){
        return Math.floor((childIndex - 1)/2);
    }

    /**
     * @param {number} parentIndex 
     * @returns {number}
     */
    getLeftChildIndex(parentIndex){
        return 2*(parentIndex) + 1;
    }

    /**
     * @param {number} parentIndex 
     * @returns {number}
     */
    getRightChildIndex(parentIndex){
        return 2*(parentIndex) + 2;
    }

    /**
     * @param {number} index1 
     * @param {number} index2 
     */
    swap(index1, index2){
        const temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
    }

    /**
     * @param {number} key
     */
    push(key) {
        const last = this.data.length - 1;
        this.data[last] = key;
        this.heapifyUp();
    }
    /**
     * swaps in ascending order - the heap is sorted in this order.
     */
    heapifyUp(){
        let currentIndex = this.data.length - 1;
        while(this.data[currentIndex] > this.data[this.getParentIndex(currentIndex)]){
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    /**
     * @return {number}
     */
    push(){
        const maxValue = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.length--;
        this.heapifyDown();
        return maxValue;
    }

    /**
     * swaps the heap in ascending order.
     * @returns {null}
     */
    heapifyDown(){
        let currentIndex = 0;

        while(this.data[this.getLeftChildIndex(currentIndex)] !== undefined){
            let biggestChildIndex = this.getLeftChildIndex(currentIndex);
            
            if(
                this.data[this.getLeftChildIndex(currentIndex)] !== undefined
                && this.data[this.getRightChildIndex(currentIndex)] 
                > this.data[this.getLeftChildIndex(currentIndex)]
            ){
                biggestChildIndex = this.getRightChildIndex(currentIndex);
            }

            if(this.data[currentIndex] < this.data[biggestChildIndex]){
                this.swap(currentIndex, biggestChildIndex);
                currentIndex = biggestChildIndex;
            } else {
                return;
            }
        }
    }
}