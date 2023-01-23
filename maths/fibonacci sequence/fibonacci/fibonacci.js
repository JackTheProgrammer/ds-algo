/**
 * Returns the list of fibonacci sequence upto nth number
 * 
 * @param {number} n
 * @return {number[]}
 */
export default function fibonacci(n){
    let nextFib = 1;
    let prevFib = 0;

    let fibonacciSequence = new Array(n);
    let noOfElements = n - 1;

    while(noOfElements !== 0){
        nextFib += prevFib;
        prevFib = nextFib - prevFib;
        fibonacciSequence.push(prevFib, nextFib);
        noOfElements -= 1;
    }

    return fibonacciSequence;
}