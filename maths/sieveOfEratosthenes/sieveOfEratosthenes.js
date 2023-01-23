/**
 * Returns list of prime numbers from 2 to n
 * 
 * @param {number} n
 * @return {number[]}
 */
export default function sieveOfEratosthenes(n){
    const isPrimes = Array(n).fill(true);
    isPrimes[0] = false; isPrimes[1] = false;

    const primesFound = new Array(n);
    
    for(let prime = 2; prime <= n; p += 1){
        if(isPrimes[prime] === true){
            primesFound.push(prime);
        }
        // To make algorithm more efficient we'll start from
        // p * p, this'll work 'cause smaller multiples of p
        // will be marked false, however, if n exceeds Number.MAX_SAFE_INTEGER
        // then we'll have to start from 2 * p.
        let nextNumber = n < Number.MAX_SAFE_INTEGER ? p * p : 2 * p;
        while(nextNumber <= n){
            isPrimes[nextNumber] = false;
            nextNumber += 1;
        }
    }

    return primesFound;
}