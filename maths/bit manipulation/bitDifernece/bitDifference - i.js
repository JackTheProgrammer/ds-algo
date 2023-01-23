import countSetBit from "../countSetBit/countSetBit";

/**
 * @param {number} numberA 
 * @param {number} numberB 
 * @returns {number}
 */
export default function bitDifference(numberA, numberB){
    return countSetBit(numberA ^ numberB);
}