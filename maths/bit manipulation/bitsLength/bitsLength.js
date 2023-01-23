/**
 * @param {number} number 
 * @returns {number}
 */
export default function bitsLength(number){
    let totalBits = 0;
    while((1 << number) <= number){
        totalBits += 1;
    }
    return totalBits;
}