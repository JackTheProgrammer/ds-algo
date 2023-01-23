/**
 * @param {*[]} permutateOptions 
 * @param {number} optionsLength 
 * @return {*[]}
 */
export default function permutateWithRepetition(
    permutateOptions, 
    optionsLength = permutateOptions.length
){
    if(optionsLength === 1){
        return permutateOptions.map(permutateOption => [permutateOption]);
    }

    const permutations = [];

    // Go through all permutations
    const smallerPermutations = permutateWithRepetition(
        permutateOptions,
        optionsLength - 1
    );

    // Add the permutation options with the small permutations
    permutateOptions.forEach((currentOption) => {
        smallerPermutations.forEach((smallerPermutation) => {
            permutations.push([currentOption].concat(smallerPermutation));
        });
    });

    // Thar's it, you got permutations with repetitions
    return permutations;
}