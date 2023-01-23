/**
 * @param {number[]} candidates - candidate numbers we're picking from.
 * @param {number} remainingSum - remaining sum after adding candidates to currentCombination.
 * @param {number[][]} finalCombinations - resulting list of combinations.
 * @param {number[]} currentCombination - currently explored candidates.
 * @param {number} startFrom - index of the candidate to start further exploration from.
 * @return {number[][]}
 */
function targetSumRecursive(
    candidates, 
    remainingSum, 
    finalCombinations = [], 
    currentCombination = [],
    startFrom = 0,
){
    if(remainingSum < 0){
        // By adding a candidate, if we yield less than zero, 
        // it implies that the last candidate was not acceptable
        return finalCombinations;
    }

    if(remainingSum === 0){
        // If adding previous candidate yields zero, this means
        // that we've got the combination leading to target sum.
        // We need to add it to the list of all found required combinations
        finalCombinations.push(currentCombination.slice());

        // returns the found combination
        return finalCombinations;
    }

    // If remainingSum isn't equal to zero yet, then keep going 
    // for all of the candidates
    for(let candidateIndex = startFrom; candidateIndex < candidates.length; candidateIndex++){
        // Pick and check every candidate
        let currentCandidate = candidates[candidateIndex];

        // Add it as current combination
        currentCombination.push(currentCandidate);

        // Explore further option with current candidate being added.
        targetSumRecursive(
            candidates,
            remainingSum - currentCandidate,
            finalCombinations,
            currentCombination,
            candidateIndex
        );

        // BACKTRACKING
        // Let's get back, exclude current candidate and try another ones later.
        currentCombination.pop();
    }

    return finalCombinations;
}

/**
 * Backtracking algorithm of finding all possible combination for specific sum.
 * 
 * @param {number[]} candidates 
 * @param {number} target 
 * @return {number[][]}
 */
export default function targetSum(candidates, target){
    return targetSumRecursive(candidates, target);
}