/**
 * @param {*[]} combinationOptions 
 * @param {number} optionsLength
 * @return {*[]}
 */
export default function combinationWithoutRepetition(
    combinationOptions, 
    optionsLength = combinationOptions.length
){
    if(combinationOptions.length === 1){
        return combinationOptions.map(option => [option]);
    }

    const combinations = [];

    // Extract characters one by one and concatenate them to combinations of smaller lengths.
    // We need to extract them because we don't want to have repetitions after concatenation.
    combinationOptions.forEach((option, optionIndex) => {
        // Generate combinations of smaller size.
        const smallCombinations = combinationWithoutRepetition(
            combinationOptions.slice(optionIndex + 1),
            optionsLength - 1
        );

        // Concatenate currentOption with all combinations of smaller size.
        smallCombinations.forEach(smallOption => {
            combinations.push([option].concat(smallOption));
        });
    });

    return combinations;
}