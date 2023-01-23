import countingSort from "../vii - countingsort/countingsort - ii";

/**
 * @param {number[]} arr 
 * @return {number[]}
 */
export default function radixSort(arr){
    let max = Math.max(...arr);
    for(let pos = 1; max/pos > 0; pos *= 10){
        countingSort(arr, pos);
    }
    return arr;
}