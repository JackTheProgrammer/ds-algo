/**
 * @param {*[]} originalSet - Original set of elements we're forming power-set of.
 * @param {*[][]} allFoundSubsets - All subsets that have been formed so far.
 * @param {*[]} currentSubset - Current subset that we're forming at moment.
 * @param {number} startAt - The position of in original set we're starting 
 * to form current subset.
 * @return {*[][]} - All found subsets of originalSubsets
 */
function btPowerSetRecursive(
    originalSet, allFoundSubsets = [[]], 
    currentSubset = [], startAt = 0
){
    for(let pos = startAt; pos < originalSet.length; pos += 1){
        // push current element as subset
        currentSubset.push(originalSet[pos]);

        // Current subset is already valid so let's memorize it.
        // We do array destruction here to save the clone of the currentSubSet.
        // We need to save a clone since the original currentSubSet is going to be
        // mutated in further recursive calls.
        allFoundSubsets.push([...currentSubset]);

        // Start from startAt + 1 to avoid repetition such as 
        // [3, 3, 3] and try to find other subsets as well.
        btPowerSetRecursive(originalSet, allFoundSubsets, currentSubset, startAt);

        // BACKTRACKING
        currentSubset.pop();
    }

    return allFoundSubsets;
}

/**
 * Find power-set of a set using BACKTRACKING approach.
 * 
 * @param {*[]} originalSet - Original set of elements we're forming power-set of.
 * @returns {*[][]} - All found subsets of originalSubsets
 */
export default function btPowerSet(originalSet){
    return btPowerSetRecursive(originalSet);
}