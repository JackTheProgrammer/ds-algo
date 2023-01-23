/**
 * Time complexity: 0(n*n)
 * @param {*[][]} inputMatrix 
 * @return {*[][]}
 */
export default function rotateImage90Degree(inputMatrix){
    let n = inputMatrix[0].length;
    for(let layer = 0; layer < n / 2; layer++){
        for(let column = layer; column < (n - layer) - 1; column++){
            // (0, 0)
            let temp = inputMatrix[layer][column];
            console.log(`${layer}, ${column}`);

            // Putting values via comments for the understanding for 3 x 3 array
            // and these are the moves when first (0th) sub - array is processed

            // (0,0)                    (2, 0)
            inputMatrix[layer][column] = inputMatrix[n - column - 1][layer];
            // (2, 0)                           (2, 2)
            inputMatrix[n - column - 1][layer] = inputMatrix[n - 1 - layer][n - column - 1];
            // (2, 2)                                 (0, 2)
            inputMatrix[n - 1 - layer][n - column -1] = inputMatrix[column][n - 1 - layer];
            // (0, 2)                          (0, 0)
            inputMatrix[column][n - 1 - layer] = temp;
        }
    }

    return inputMatrix;
}