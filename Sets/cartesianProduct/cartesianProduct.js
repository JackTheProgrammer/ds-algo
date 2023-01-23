/**
 * @param {number[]} setA 
 * @param {number[]} setB 
 * @returns {number[]}
 */
export default function cartesianProduct(setA, setB){
    if((!setA || !setB) || (!setA.length || !setB.length)){
        throw new Error("Empty or null arrays");
    }

    const cartesianProductResult = [];
    for(let i = 0 ;i < setA.length; i++){
        for(let j = 0; j < setB.length; j += 1){
            cartesianProductResult.push(setA[i], setB[j]);
        }
    }

    return cartesianProductResult;
}