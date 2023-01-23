/**
 * @param {number[]} arr
 * @return {number[]}
 */
export default function bubbleSortNonOptimized(arr){
    let n = arr.length;
    for(let i = 0; i < n -1; i++){
        for(j = 0; j < (n - 1); j += 1){
            if(arr[i + 1] < arr[i]){
                let temp = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}