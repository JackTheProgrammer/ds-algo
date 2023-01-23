/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @returns {Object<number, number>}
 */
export default function bitWiseSwapping(x, y){
    x = x ^ y;
    y = x ^ y;
    x = x ^ y;

    return {
        x: x,
        y: y
    };
}