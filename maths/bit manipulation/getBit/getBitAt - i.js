/**
 * @param {number} number 
 * @param {number} pos 
 * @returns {number}
 */
export default function getBitAt(number, bitPosition){
    return (number >> bitPosition) & 1;
}