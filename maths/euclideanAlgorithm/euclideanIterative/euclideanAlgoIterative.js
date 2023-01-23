/**
 * @param {number} numberA 
 * @param {number} numberB 
 * @return {number}
 */
export default function euclideanAlgoIterative(numberA, numberB){
    let a = Math.abs(numberA);
    let b = Math.abs(numberB);

    while((a && b) && (a !== b)){
        [a, b] = a > b ? [a - b, b]: [a, b - a];
    }

    return a || b;
}