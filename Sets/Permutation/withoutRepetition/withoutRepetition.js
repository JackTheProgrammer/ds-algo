/**
 * @param {*[]} permutateOptions 
 * @return {*[]}
 */
export default function permutationWithoutRepetition(permutateOptions){
    if(permutateOptions.length === 1){
        return [...permutateOptions];
    }

    const permutations = [];

    // Acquire all small permutations of original array
    const smallPermutation = permutationWithoutRepetition(permutateOptions.slice(0));

    // Acquire first permutation
    const firstOption = permutateOptions[0];

    for(let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1){
        const smallerPermutation = smallPermutation[permIndex];

        // Insert first option into every possible set of permutation
        for(let positionIndex = 0; positionIndex <= smallPermutation.length; positionIndex++){
            const permutationPrefix = smallerPermutation.slice(0, positionIndex);
            const permutationSuffix = smallerPermutation.slice(positionIndex);

            permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
        }
    }

    return permutations;
}