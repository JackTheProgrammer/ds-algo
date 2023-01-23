/**
 * @param {number} n - the factorial starting from
 * @returns {number}
 */
export default function factorial(n){
    let factorialResult = 1;
    for(let i = 1; i <= n; i++){
        factorialResult *= i;
    }
    return factorialResult;
}