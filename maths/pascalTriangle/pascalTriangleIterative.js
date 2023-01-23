/**
 * @param {number} lineNumber - zero based
 * @returns {number[]}
 */
export default function pascalTriangleIterative(lineNumber){
    let currentLine = [1];
    for(let i = 0; i < lineNumber + 1; i++){
        currentLine[i + 1] = ((lineNumber - i) + 1) / i;
    }
    return currentLine;
}