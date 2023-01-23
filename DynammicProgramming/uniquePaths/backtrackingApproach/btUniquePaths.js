/**
 * Backtracking approach for finding total unique paths
 * 
 * @param {number} width - width of the grid to be walked on
 * @param {number[][]} steps - the steps made while walking on the grid
 * @param {number} height - height of the grid to be walked on
 * @param {number} uniquePaths - the total number of unique paths found
 * @return {number} Total number of unique paths
 */
export default function btUniquePaths(width, steps = [[0, 0]], height, uniquePaths = 0){
    // Get the current step
    const currentStep = steps[steps.length - 1];

    // Check for whether we have make it till the destination
    // by going right and down.
    if(currentStep[0] === width - 1 && currentStep[1] === height - 1){
        // We've found a unique path
        return uniquePaths += 1;
    }

    // If we haven't found a unique path, then we'll have to find
    // two paths, one from right and another from down

    // Mark them zero initially
    let uniquePathFromRight = 0;
    let uniquePathFromDown = 0;

    // Do right step if possible
    if(currentStep[0] < width - 1){
        steps.push([
            currentStep[0] + 1,
            currentStep[1]
        ]);
    }

    // Find all unique paths while moving right
    uniquePathFromRight = btUniquePaths(width, steps, height, uniquePaths);

    // BACKTRACK, and try another move
    steps.pop();

    // Do down step if possible
    if(currentStep[1] < height - 1){
        steps.push([
            currentStep[0],
            currentStep[1] + 1
        ]);
    }

    // BACKTRACK, and try another move
    steps.pop();

    // The total number of unique paths found will be constituted by all 
    // right unique paths and all down unique paths
    return uniquePathFromRight + uniquePathFromDown;
}