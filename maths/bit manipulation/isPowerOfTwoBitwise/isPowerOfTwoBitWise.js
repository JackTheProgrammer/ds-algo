/**
 * @param {number} number 
 * @returns {boolean}
 */
export default function isPowerOfTwoBitWise(number){
    return number & (number - 1) === 0;
}