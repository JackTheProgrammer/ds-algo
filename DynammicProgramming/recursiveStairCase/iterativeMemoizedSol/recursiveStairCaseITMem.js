/**
 * @param {number} totalStairs 
 * @return {number}
 */
export default function recursiveStairCaseITMem(totalStairs){
    // Array to keep the record of those stairs which steps are calculated to
    // avoid re - calculation
    const memo  = [];

    /**
     * Recursive closure to calculate and memoized each stair's required steps
     * @param {number} stairNumber 
     * @return {number}
     */
    const getSteps = (stairNumber) => {
        if(stairNumber <= 0){
            // You're at 0th stair and neither you can't go down
            // nor you've to do anything to stay at 0th stair
            return 0;
        }

        if(stairNumber === 1){
            // You're at 1st step, there's only 1 way to go there
            return 1;
        }

        if(stairNumber === 2){
            // There're 2 ways to go there, 1 + 1 or (2)
            return 2;
        }

        if(memo[stairNumber]){
            return memo[stairNumber];
        }

        // Sum up how many steps we need to take after doing one step up, with the number of
        // steps we need to take after doing two steps up.
        memo[stairNumber] = getSteps(stairNumber - 1) + getSteps(stairNumber - 2);

        return memo[stairNumber];
    }

    // Return possible ways to get to the requested step.
    return getSteps(totalStairs);
}