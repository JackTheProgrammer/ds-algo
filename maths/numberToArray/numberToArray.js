export default function numberToArray(number){
    if(number % 1 === 0){
        return false;
    }

    // Getting the string as a parameter
    // and typecasting it into an integer
    let myFunc = num => Number(num);
    
    let intArr = Array.from(String(number), myFunc);

    return intArr;
}