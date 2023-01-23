/**
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export default function bitDifference(a, b){
    let abXor = a ^ b;
    let requiredBits = 0;
    while(abXor !== 0){
        abXor = abXor & (abXor - 1);
        requiredBits += 1;
    }
    return requiredBits;
}