/**
 * @param {number} numberA 
 * @param {number} numberB 
 * @returns {number}
 */
export default function euclideanAlgoRecursive(numberA, numberB){
    let a = Math.abs(numberA);
    let b = Math.abs(numberB);

    // To make algorithm efficient we'll pass a % b as b
    return b === 0 ? a : euclideanAlgoRecursive(a, a % b);
}