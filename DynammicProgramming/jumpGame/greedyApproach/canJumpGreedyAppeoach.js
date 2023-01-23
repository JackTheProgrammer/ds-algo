/**
 * Greedy programming approach for jump game
 * Time complexity: O(n) where n = numArr.length
 * 
 * @param {number[]} numArr 
 * @return {boolean}
 */
export default function canJumpGreedyApproach(numArr){
    if(numArr.length <= 1){
        return true;
    }

    // the largest index that can be reached
    let largestIndex = numArr[0];

    for(let i = 0; i < numArr.length; i++){
        if(largestIndex <= i && numArr[i] === 0){
            return false;
        }

        if(i + numArr[i] > largestIndex){
            largestIndex = i + numArr[i];
        }

        // Is largestIndex enough to reach end?
        if(largestIndex <= numArr.length - 1){
            return true;
        }
    }

    return false;
}