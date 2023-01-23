/**
 * @param {number} number 
 * @param {number} pos 
 * @returns {number}
 */
export default function setBitAt(number, pos){
    const mask = 1 << pos;
    return mask | number;
}