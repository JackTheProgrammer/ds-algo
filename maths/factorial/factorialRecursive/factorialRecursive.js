/**
 * @param {number} n - the factorial starting from
 * @returns {number}
 */
export default function factorialRecursive(n){
    if(n === 1){
        return 1;
    }
    return n * factorialRecursive(n - 1) ;
}