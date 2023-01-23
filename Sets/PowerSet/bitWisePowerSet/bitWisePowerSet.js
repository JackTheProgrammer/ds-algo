/**
 * @param {*[]} originalSet 
 * @return {*[][]}
 */
export default function bitWisePowerSet(originalSet){
    const subsets = [];

    // We'll have 2 ^ originalSet.length possible subsets, it's
    // because for every element of original set we'll decide
    // whether to include it in the power set or not (two option
    // for every set).
    const totalPossibleSubsets = 2 ** originalSet.length;

    // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
    // it shows by its bits (0 or 1) whether to include related element from the set or not.
    // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
    // include only "2" to the current set.
    for(let combinationIndex = 0; combinationIndex < totalPossibleSubsets; combinationIndex++){
        const subset = [];
        for(let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex++){
            // Decide whether we need to include current element into the subset or not.
            if(setElementIndex & (1 << combinationIndex)){
                subset.push(originalSet[setElementIndex]);
            }
        }
        // Add current subset to the list of all subsets.
        subsets.push(subset);
    }
    
    return subsets;
}