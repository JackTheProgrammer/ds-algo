/**
 * @param {number[]} sortedArray 
 * @param {number} seekItem 
 * @return {number} index of [seekItem] in [sortedArray], else -1 if not found
 */
export default function jumpSearch(sortedArray, seekItem){
    const arraySize = sortedArray.length;
    if(arraySize === 0 || !arraySize){
        throw new Error(`${seekItem} can't be found in empty array`);
    }

    /**
     * Calculates the optimal jumpSize
     * 
     * The number of comparisons in the worst case will be
     * ((arraySize/jumpSize) + jumpSize - 1)
     * 
     * The value of ((arraySize/jumpSize) + jumpSize - 1) will be minimum if 
     * jumpSize === Math.sqrt(sortedArray.length)
     */
    const jumpSize = Math.floor(Math.sqrt(sortedArray.length));

    // Find the block where the seekItem belongs to. 
    let startBlock = 0;
    let endBlock = jumpSize;
    while(seekItem > sortedArray[Math.min(endBlock, arraySize) - 1]){
        // Jump in the next block
        startBlock = endBlock;
        endBlock += jumpSize;

        // If next array is greater then array's size then it means we
        // couldn't find the seekElement
        if(startBlock > arraySize) return -1;
    }

    let currentIndex = startBlock;
    while(currentIndex < Math.min(endBlock, arraySize)){
        if(sortedArray[currentIndex] === seekItem){
            return currentIndex;
        }
        currentIndex += 1;
    }

    return -1;
}