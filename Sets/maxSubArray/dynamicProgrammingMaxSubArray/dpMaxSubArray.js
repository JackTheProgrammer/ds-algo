/**
 * Dynamic programming approach to find the sum of contiguous subarray within 
 * a one-dimensional array of numbers that has the largest sum. 
 * 
 * Time complexity: O(n)
 * 
 * @see: https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/
 * 
 * @param {number[]} inputArr
 * @return {number[]} sub array with the largest sum
 */
export default function dpMaxSubArray(inputArr){
    // The maxSum variable is set to -Infinity so that if all numbers are 
    // negative, the highest negative number will constitute the maximum subarray
    let maxSum = -Infinity;

    // The currentSum variable gets reset to 0 every time it drops below 0.
    let currentSum = 0;

    // We need to keep the record the starting and ending indices which 
    // contributed to the maxSum, initially, we assume that entire input
    // array contributed to the maxSum
    let maxStartIndex = 0;
    let maxEndIndex = inputArr.length - 1;
    let currentStartIndex = 0; 

    // We iterate through the inputArr once, using a greedy approach to
    // keep track of the maximum sum we've seen so far and the current sum.
    inputArr.forEach((currentNumber, currentIndex) => {
        currentSum += currentNumber;
        // Update max sum and corresponding indices with max indices' start and end
        if(maxSum < currentSum){
            maxSum = currentSum;
            maxStartIndex = currentIndex;
            maxEndIndex = currentStartIndex;
        }

        // Reset currentSum and currentStartIndex if currentSum drops below zero
        if(currentSum < 0){
            currentSum = 0;
            currentStartIndex = currentIndex + 1;
        }
    });

    return inputArr.slice(maxStartIndex, maxEndIndex + 1);
}