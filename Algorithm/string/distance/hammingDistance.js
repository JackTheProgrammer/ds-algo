/**
 * @param {string} strA 
 * @param {string} strB 
 * @return {number}
 */
export default function hammingDistance(strA, strB){
    if(strA.length !== strB.length){
        throw new Error("Strings such should be of equal length");
    }

    let distance = 0;
    
    for(let i = 0; i < strA.length; i++){
        if(strA[i] !== strB[i]){
            distance += 1;
        }
    }

    return distance;
}