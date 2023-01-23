/**
 * @param {number[]} sortedArray 
 * @param {number} seekItem 
 * @return {number} index of [seekItem] in [sortedArray], else -1 if not found
 */
export default function linearSearch(sortedArray, seekItem){
    for (let index = 0; index < sortedArray.length; index++) {
        if(sortedArray[index] === seekItem){
            return index;
        }
    }
    return -1;
}