/**
 * Tests a number n being a prime or not
 * 
 * @param {number} n 
 * @return {boolean}
 */
export default function trialDivision(n){
    if(n % 1 === 0){
        return false; // number is floating point
    }

    if(n <= 1){
        return false; // number is [0,1]
    }

    if(n <= 3){
        return true; // number is [2, 3]
    }

    if(n % 2 === 0){
        return false; // number is even
    }

    // make a divider limit
    let dividerLimit = Math.sqrt(n);
    
    // Divide the number until divider limit, if there isn't then 
    // there's no higher divider as well
    for(let divider = 3; divider <= dividerLimit; divider += 2){
        if(n % divider === 0){
            return false;
        }
    }

    return true;
}