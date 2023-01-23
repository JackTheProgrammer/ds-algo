/**
 * @param {*[]} combinationOptions 
 * @param {number} optionsLength
 * @return {*[]}
 */
export default function combinationWithRepetition(
    combinationOptions, 
    optionsLength = combinationOptions.length
){
    if(combinationOptions.length === 1){
        return combinationOptions.map(option => [option]);
    }

    const combinations = [];

    // Remember characters one by one and concatenate them to combinations of smaller lengths.
    // We don't extract elements here because the repetitions are allowed.
    combinationOptions.forEach((option, optionIndex) => {
        // Generate combinations of smaller size.
        const smallCombinationOptions = combinationWithRepetition(
            combinationOptions.slice(optionIndex),
            optionsLength - 1
        );

        // Concatenate currentOption with all combinations of smaller size.
        smallCombinationOptions.forEach(smallComboOption => {
            combinations.push([option].concat(smallComboOption));
        });
    });

    return combinations;
}