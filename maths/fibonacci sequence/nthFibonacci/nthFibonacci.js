/**
 * Returns nth fibonacci number in the fibonacci sequence
 * 
 * @param {number} n
 * @return {number}
 */
export default function nthFibonacci(n){
    let previousNumber = 0; 
    let nextNumber = 1;

    while(n !== 0){
        nextNumber += previousNumber;
        previousNumber = nextNumber - previousNumber;
        n -= 1;
    }

    return nextNumber;
}