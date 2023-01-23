/**
 * @param {number} number 
 * @returns {boolean}
 */
export default function isEven(number){
    return (number & 1) === 0;
}