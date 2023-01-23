/**
 * @param {*[]} originalArray 
 * @return {*[]}
 */
export default function fisherYates(originalArray){
    const arr = [...originalArray];
    for(let i = 0; i < arr.length; i++){
        let randomIndex = Math.floor(Math.random() * i + 1);
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}