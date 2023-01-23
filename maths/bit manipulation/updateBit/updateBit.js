/**
 * @param {number} number 
 * @param {number} bitValue 
 * @param {number} bitPos 
 * 
 * @returns {number}
 */
export default function updateBit(number, bitValue, bitPos){
    const normalizedBit = bitValue ? 1 : 0;
    // Clear mask
    const clearMask = ~(1 << bitPos);
    // Now set bit at [bitPos] in [number]
    return (number & clearMask) | (normalizedBit << bitPos);
}