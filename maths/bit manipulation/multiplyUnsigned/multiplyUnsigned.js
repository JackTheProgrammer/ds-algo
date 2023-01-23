/**
 * Multiply two unsigned numbers
 * 
 * Every number will be splitted into power of 2. e.g. 19 = 2^4 + 2^1 + 2^0.
 * So multiplying x with 19 implies x * 19 = x*(2^4 + 2^1 + 2^0).
 * 
 * Now we need to remember that x*(2^4) is equal to x << 4.
 * 
 * @param {number} number1
 * @param {number} number2
 * @return {number}
 */
export default function multiplyUnsigned(number1, number2){
    let result = 0; 
    let bitIndex = 0;
    let multiplier = number2;

    while(multiplier !== 0){
        // Check if last bit exists
        if(multiplier & 1){
            // If it exists then multiply it by 2 power of the bit index 
            // at which it exists, then add it to the result variable.
            result += (number1 << bitIndex);
        }
        bitIndex += 1;
        multiplier >>= 1;
    }
    return result;
}