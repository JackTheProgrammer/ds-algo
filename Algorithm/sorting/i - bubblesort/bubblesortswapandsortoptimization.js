/**
 * @param {number[]} arr
 * @return {number[]}
 */
export default function bubbleSortSwapsOptimized(arr){
    let n = arr.length;
    for(let i = 0; i < (n -1); i++){
        let flag = 0
        for(let j = 0; j < (n - 1) - i; j++){
            if(arr[i + 1] < arr[i]){
                let temp = arr[i + 1];
                arr[i + 1] = arr[i];
                arr[i] = temp;
                flag = 1;
            }
        }
        if(flag === 0)
        break;
    }
    return arr;
}