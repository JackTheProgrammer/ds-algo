/**
 * The nth fibonacci is given by the formula:
 *    Fn = ((1 / sqrt(5)) * (1 + sqrt(5) / 2))
 * 
 * @param {number} n
 * @return {number}
 */
export default function nthClosedFormFibonacci(n){
    const squareRoot5 = Math.sqrt(5);
    return ((1 / squareRoot5) * ((1 + squareRoot5) / 2));
}