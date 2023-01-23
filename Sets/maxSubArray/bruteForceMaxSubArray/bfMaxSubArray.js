/**
 * Brute force approach to find the sum of contiguous subarray within 
 * a one-dimensional array of numbers that has the largest sum. 
 * 
 * Time complexity: O(n^2)
 * 
 * @see: https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/
 * 
 * @param {number[]} inputArr
 * @return {number[]} sub array with the largest sum
 */
export default function bfMaxSubArray(inputArr){
    let maxSubArrayStartIndex = 0;
    let maxSubArrLength = 0;
    let maxSubArrSum = null;

    for(let arrIndex = 0; arrIndex < inputArr.length; arrIndex++){
        let subArraySum = 0;
        for(let subArrayLength = 1; subArrayLength <= (inputArr.length - arrIndex); subArrayLength++){
            subArraySum += inputArr[arrIndex + (subArrayLength - 1)];
            if(maxSubArrSum === null || maxSubArrSum < subArraySum){
                maxSubArrSum = subArraySum;
                maxSubArrayStartIndex = arrIndex;
                maxSubArrLength = subArrayLength;
            }
        }
    }

    return inputArr.slice(maxSubArrayStartIndex, maxSubArrayStartIndex + maxSubArrLength);
}