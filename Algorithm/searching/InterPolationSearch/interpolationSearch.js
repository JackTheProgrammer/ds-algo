/**
 * @param {number[]} sortedArray 
 * @param {number} seekElement 
 * @return {number} index of [seekItem] in [sortedArray], else -1 if not found
 */
export default function interpolationSearch(sortedArray, seekElement){
    let leftIndex = 0; 
    let rightIndex = sortedArray.length - 1;
    
    while(leftIndex <= rightIndex){
        const rangeDelta = sortedArray[rightIndex] - sortedArray[leftIndex];
        const indexDelta = rightIndex - leftIndex;
        const valueDelta = seekElement - sortedArray[leftIndex];

        // If [valueDelta] is less than zero, then there's no seekItem to be found
        // since the lowest element from the range is greater than seekItem
        if(valueDelta < 0){
            return -1;
        }

        // If rangeDelta is zero, it means that all of the elements are same, unless
        // range consists of all seekItems
        if(rangeDelta === 0){
            // By doing this we're avoiding division by zero for midIndex
            // calculation
            return sortedArray[leftIndex] === seekElement ? leftIndex : -1;
        }

        const midIndex = leftIndex + Math.floor((valueDelta + indexDelta) / rangeDelta);

        // if element is found then return the element's index
        if(sortedArray[midIndex] === seekElement){
            return midIndex;
        }

        //Check which half of the array to go with: Left or right
        if(sortedArray[midIndex] < seekElement){
            //go towards right
            startIndex = midIndex + 1;
        } else {
            //go towards left
            endIndex = midIndex - 1;
        }
    }

    return -1;
}