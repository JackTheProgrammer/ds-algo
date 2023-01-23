/**
 * @param {string} strA 
 * @param {string} strB 
 * @return {number}
 */
export default function levenshteinDistance(strA, strB){
    /**
     * Create an edit distance matrix for all possible modification
     * of substring of strA to substring of strB
     * 
     * @type {number[][]}
     */
    const editDistanceMatrix = Array(strB.length + 1).fill(null).map(
        () => Array(strA.length + 1).fill(null)
    );

    // Fill the first row of editDistanceMatrix
    for(let row = 0; row < strB.length; row++){
        editDistanceMatrix[row][0] = row;
    }

    // Fill the first column of editDistanceMatrix
    for(let column = 0; column < strA.length; column++){
        editDistanceMatrix[0][column] = column;
    }

    for(let row = 1; row <= strB.length; row++){
        for(let column = 1; column <= strA.length; column++){
            // Indicator of equality
            const indicator = strA[row - 1] === strB[column - 1] ? 0 : 1;

            editDistanceMatrix[row][column] = Math.min(
                editDistanceMatrix[row][column - 1] + 1, // deletion
                editDistanceMatrix[row - 1][column] + 1, // insertion
                editDistanceMatrix[row - 1][column - 1] + indicator //substitution
            );
        }
    }

    return editDistanceMatrix[strB.length][strA.length];
}