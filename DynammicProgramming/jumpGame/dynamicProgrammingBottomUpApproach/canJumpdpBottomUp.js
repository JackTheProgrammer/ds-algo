/**
 * Dynamic programming bottom up approach to find whether we could 
 * make it to the last element of array.
 * 
 * This is an optimization of dynamic programming top down approach.
 * In this method, we're gonna start from the most right element of the  
 * array (2nd last) and check for whether that element is "good" or "bad".
 * 
 * This approach is quite similar to last known position approach, only 
 * difference is that in prior approach, we used a variable lastKnownPos to
 * keep the track of the previous jumps made. 
 * 
 * Here we're gonna use elementsCategory to keep the record of which element 
 * is being used for jump by seeing its category, i.e. tracking whether the 
 * element is "good" or "bad". 
 * 
 * The definition of an element being "good" or "bad" is 
 * similar to that of dynamic programming top down approach.
 * 
 * @param {number[]} numbers 
 * @return {boolean}
 */
export default function canJumpDpBottomUp(numbers){
    if(!numbers.length || numbers.length === 0){
        return false;
    }

    /** @type {boolean[]} */
    const elementsCategories = [];
    numbers.forEach(() => elementsCategories.push(false));
    
    // Mark the last element as "good", as this is the destined index.
    elementsCategories[elementsCategories.length - 1] = true;

    // Go though all elements, except for the last one, as it's already
    // marked as "good"
    for(let rightestElementIndex = numbers.length - 2; rightestElementIndex >= 0; rightestElementIndex -= 1){
        const maxJumpLength = Math.min(
            numbers[rightestElementIndex],
            numbers.length - 1 - rightestElementIndex
        );

        for(let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1){
            let nextJumpIndex = rightestElementIndex + jumpLength;

            if(elementsCategories[nextJumpIndex] === true){
                // Set the nextJumpIndex as "good" one.
                elementsCategories[nextJumpIndex] = true;

                // Once we've found an element with true, or being "good"
                // , we're done. Just halt there and move out of the loop.
                break;
            }
        }
    }

    // Check whether the 0th index is "good", if so then we can 
    // go from it to the last one.
    return numbers[0] === true;
}