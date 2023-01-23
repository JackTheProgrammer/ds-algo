import swap from "../swap";

/**
 * @param {number[]} arr 
 * @return {number[]}
 */
export default function shellSort(arr){
    let n = arr.length;
    for(let gap = Math.floor(n / 2); gap >= 1; gap /= 2){
        for(let j = gap; j < n; j++){
            for(let i = j - gap; i >= 0; i -= gap){
                if(arr[i] < arr[i - gap]){
                    swap(arr[i], arr[i - gap]);
                } else {
                    break;
                }
            }
        }
    }
    return arr;
}