/**
 * @param {number} number 
 * @param {number} pos 
 * @returns {number}
 */
export default function getBitAt(number, pos){
    const mask = 1 << pos;
    let bitAtPos = number & mask;
    return bitAtPos > 0 ? 1 : 0;
}