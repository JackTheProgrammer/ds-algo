import swap from "../swap";

/**
 * @param {number[]} arr 
 * @return {number[]}
 */
export default function selectionSort(arr){
    let n = arr.length;
    for(let i = 0; i < n - 1; i++){
        let min = arr[i];
        for(let j = i + 1; j < n; j++){
            if(arr[j] < min){
                min = arr[j];
            }
        }
        if(min != arr[i]){
            swap(min, arr[i]);
        }
    }
    return arr;
}