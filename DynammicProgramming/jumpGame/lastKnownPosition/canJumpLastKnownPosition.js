/**
 * @param {number[]} numArr 
 * @return {boolean}
 */
export default function lastKnownPosition(numArr){
    let lastKnownPos = numArr.length - 1;
    let furthestJump = 0;

    for(let i = numArr.length - 2; i >= 0; i--){
        furthestJump = numArr[i] + i;
        if(furthestJump >= lastKnownPos){
            lastKnownPos = furthestJump;
        }
    }

    return furthestJump === 0;
}