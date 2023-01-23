/**
 * This is the dynamic programming approach with an optimized 
 * backtracking methodology.
 * 
 * It relies on the categorization of indexes being "good" or 
 * "bad". "Good" indices refers to those who can take you to the 
 * last element an "bad" are those who couldn't take you to the last
 * one.
 * 
 * Once a "good" index is found, it's stored and is immutable, hence preventing
 * the recomputing required in a normal backtracking approach.
 * 
 * @param {number[]} numArr - array of possible jump lengths
 * @param {number} startIndex - the index from which jumping starts
 * @param {number[]} currentJumps - keeps the record of the jump to be made
 * @param {boolean[]} indicesCategory - keeps the record of "good" and "bad" indices
 * @return {boolean} returns true or false based on whether the last element is
 * approachable via jumps or not
 */
export default function canJumpDpTopDown(
    numArr, 
    startIndex = 0, 
    currentJumps = [], 
    indicesCategory = []
){
    if(startIndex === numArr.length - 1){
        // We've found the good index, thus the jump to the end is possible
        return true;
    }

    // Init the currentIndicesCategory
    const currentIndicesCategory = [...indicesCategory];
    if(!currentIndicesCategory.length){
        // Fill the current indices category if its empty with undefined or false.
        // Indicating that all indices are initially "bad".
        numArr.forEach(() => {
            currentIndicesCategory.push(undefined);
        });
        // Mark the last index as "good" one since it is where we ultimately want to get.
        currentIndicesCategory[indicesCategory.length - 1] = true;
    }

    // Check what the longest jump we could make from current position.
    // We don't need to jump beyond the array.
    const maxJumpLength = Math.min(
        startIndex, // current position
        numArr.length - 1 - startIndex, // beyond array
    );

    // We'll start going from the maxJumpLength and see whether jumping is
    // possible or not.
    for(let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1){
        // make next jump;
        const nextJumpIndex = startIndex + jumpLength;

        // Only pick those indices which are either "good" or "undefined"
        // This is top-down dynamic programming optimization of backtracking algorithm.
        if(currentIndicesCategory[nextJumpIndex] !== false){
            currentJumps.push(nextJump);

            const isJumpSuccessful = canJumpDpTopDown(
                numArr,
                nextJumpIndex,
                currentJumps,
                currentIndicesCategory,
            );

            // Check if current jump is successful or not
            if(isJumpSuccessful){
                return true;
            }

            // BACKTRACKING
            // Retreating when the current index doesn't yield a jump, try other indices.
            currentJumps.pop();

            // Make current index to be false i.e. "bad" so that it's not processed again.
            currentIndicesCategory[nextJumpIndex] = false;
        }
    }

    return false;
}