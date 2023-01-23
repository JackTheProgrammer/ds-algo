/**
 * @param {number[]} arr
 * @param {number} lowerBound
 * @param {number} mid
 * @param {number} upperBound
 * 
 * @param {number[]}
 */
function merge(arr, lowerBound, mid, upperBound){
    let i = lowerBound;
    let j = mid + 1;
    
    let k = lowerBound;
    let result = [];

    while(i <= mid && j <= upperBound){
        if(arr[i] <= arr[j]){
            result[k] = arr[i];
            i++;
        } else {
            result[k] = arr[j];
            j++;
        }
        k++;
    }

    if(j > upperBound){
        while(i <= mid){
            result[k] = arr[i];
            i++;
        }
    } else if(i > mid){
        while(j <= upperBound){
            result[k] = arr[j];
            j++;
        }
    }
    return result;
}

/**
 * @param {number[]} arr
 * @param {number} lowerBound
 * @param {number} upperBound
 * 
 * @return {number[]}
 */
export default function mergeSort(arr, lowerBound, upperBound){
    /**
     * @type {number[]}
     */
    let res = [];
    if(lowerBound < upperBound){
        let mid = (lowerBound + upperBound)/2;
        mergeSort(arr, lowerBound, mid);
        mergeSort(arr, mid + 1, upperBound);
        res = [...merge(arr, lowerBound, mid, upperBound)]
    }
    return res;
}