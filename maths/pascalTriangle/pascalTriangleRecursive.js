/**
 * 
 * @param {number} lineNumber 
 * @returns {number[]}
 */
export default function pascalTriangleRecursive(lineNumber){
    if(lineNumber === 0){
        return [1];
    }

    const currentLineSize = lineNumber + 1;
    const previousLineSize = currentLineSize - 1;

    // In order to calculate the current line , we'll calculate 
    // previous ones and based on them we'll calculate current ones
    const previousLine = pascalTriangleRecursive(lineNumber - 1);
    
    /**
     * Container for current lines
     * 
     * @type {number[]}
     */
    const currentLine = [];

    // Go through all of the elements of currentLine except 
    // for 0th and last. They'll always have 1's in them. Calculate
    // the current co - efficient based on previous line.
    for(let numbIndex = 0; numbIndex < currentLineSize; numbIndex += 1){
        const leftCoEfficient = (numbIndex -  1) >= 0 ? previousLine[numbIndex - 1] : 0;
        const rightCoEfficient = numbIndex < previousLineSize ? previousLine[numbIndex] : 0;
        currentLine[numbIndex] = leftCoEfficient + rightCoEfficient;
    }

    // containing previous and current line of the pascal triangle
    return currentLine;
}