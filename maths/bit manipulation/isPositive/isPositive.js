/**
 * @param {number} number 
 * @returns {boolean}
 */
export default function isPositive(number){
    if(number === 0){
        return false; // zero is neither +ive nor -ive
    }
    // We'll start from the most 32nd bit of the number for checking positivity
    return (number >> 31) & 1 === 0;
}