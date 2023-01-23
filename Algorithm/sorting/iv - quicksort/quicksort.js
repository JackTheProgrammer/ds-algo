import swap from "../swap";

/**
 * @param {number[]} arr 
 * @param {number} lowerBound 
 * @param {number} upperBound 
 * 
 * @return {number}
 */
function partition(arr, lowerBound, upperBound){
    let pivot = arr[lowerBound];
    let start = lowerBound;
    let end = upperBound;

    while(start < end){
        while(arr[start] <= pivot){
            start += 1;
        }

        while(arr[end] > pivot){
            end -= 1;
        }
        swap(arr[start], arr[end]);
    }
    

    swap(arr[end], pivot);

    return end;
}

/**
 * @param {number[]} arr
 * @param {number} lowerBound
 * @param {number} upperBound 
 * 
 * @return {number[]}
 */
export default function quickSort(arr, lowerBound = 0, upperBound = arr.length - 1){
    if(lowerBound < upperBound){
        let pos = partition(arr, lowerBound, upperBound);
        quickSort(arr, lowerBound, pos - 1);
        quickSort(arr, pos + 1, upperBound);
    }
    return arr;
}