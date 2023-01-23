/**
 * @param {number[]} arr
 * @return {number[]} 
 */
export default function countingSort(arr){
    let key = Math.max(...arr);
    let n = arr.length;
    let count = Array(key + 1).fill(0);
    let sortedArr = [];

    for(let i = 0; i < n; i++){
        ++count[arr[i]];
    }

    for(let i = 1; i <= n; i++){
        count[i] += count[i - 1];
    }

    for(let i = n - 1; i >= 0; i -= 1){
        sortedArr[(--count[i])] = arr[i];
    }

    arr = [...sortedArr];
    return arr;
}