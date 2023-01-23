/**
 * @param {number} stairNumber 
 * @return {number}
 */
export default function recursiveStairCaseIT(stairNumber){
    if(stairNumber <= 0){
        // You're at 0th stair and neither you can't go down
        // nor you've to do anything to stay at 0th stair
        return 0;
    }

    // Init the number of ways to step on a stair
    const steps = [1, 2];

    if(stairNumber <= 2){
        // Return the no. of ways to go to 1st or 2nd stair
        return steps[stairNumber - 1];
    }

    // Calculate the number of ways to go the specified stair number.
    // Comparing to Dynamic Programming solution we don't store info 
    // for all the steps but rather for two previous ones only.
    for(let currentStep = 3; currentStep <= stairNumber; currentStep += 1){
        [steps[0], steps[1]] = [step[1], step[0] + step[1]];
    }

    // Return possible ways to get to the requested step.
    return steps[1];
}