/**
 * @param {*[]} sortedArray 
 * @param {*} seekItem 
 * @return {number} index of [seekItem] in [sortedArray], else -1 if not found
 */
export default function binarySearch(sortedArray, seekItem){
    let startIndex = 0; 
    let endIndex = sortedArray.length - 1;

    while (startIndex <= endIndex) {
        const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        //if found, then return its index
        if(sortedArray[midIndex] === seekItem){
            return midIndex;
        }

        //Check which half of the array to go with: Left or right
        if(sortedArray[midIndex] < seekItem){
            //go towards right
            startIndex = midIndex + 1;
        } else {
            //go towards left
            endIndex = midIndex - 1;
        }
    }
    
    return -1;
}