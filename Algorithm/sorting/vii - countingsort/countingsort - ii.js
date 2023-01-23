/**
 * @param {number[]} arr
 * @param {number} pos
 * @return {number[]} 
 */
export default function countingSort(arr, pos){
    let key = Math.max(...arr);
    let n = arr.length;
    let count = Array(key + 1).fill(0);
    let sortedArr = [];

    for(let i = 0; i < n; i++){
        ++count[(arr[i] / pos) % 10];
    }

    for(let i = 1; i <= n; i++){
        count[i] += count[i - 1];
    }

    for(let i = n - 1; i >= 0; i -= 1){
        sortedArr[((arr[i] / pos) % pos) - 1] = arr[i];
    }

    arr = [...sortedArr];
    return arr;
}