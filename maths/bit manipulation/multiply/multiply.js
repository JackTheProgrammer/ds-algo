import multiplyByTwo from "../multiplyByTwo/multiplyByTwo";
import divideByTwo from "../divideByTwo/divideByTwo";

import isEven from "../isEven/isEven";
import isPositive from "../isPositive/isPositive";

/**
 * Multiply two signed numbers
 * 
 * if a or b = 0, or both a and b are zero then multiply(a, b) === 0.
 * 
 * if b is even and +ive then: multiply(a, b) = multiply(2a, b/2)
 * 
 * if b is odd and +ive, then: multiply(2a, (b - 1)/2) + a
 * 
 * if b is odd and -ive, then: multiply(2a, (b + 1)/2) - a
 * 
 * Time complexity: O(log(b))
 * 
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export default function multiply(a, b){
    if(a === 0 || b === 0){
        return 0;
    }

    const multiplyByOddPositive = () => {
        return multiply(multiplyByTwo(a), divideByTwo(b - 1)) + a;
    };

    const multiplyByOddNegative = () => {
        return multiply(multiplyByTwo(a), divideByTwo(b + 1)) - a;
    }

    const multiplyEven = () => {
        return multiply(multiplyByTwo(a), divideByTwo(b));
    };

    const multiplyOdd = () => {
        return isPositive(b) ? multiplyByOddPositive() : multiplyByOddNegative();
    }

    return isEven(b) ? multiplyEven() : multiplyOdd();
}