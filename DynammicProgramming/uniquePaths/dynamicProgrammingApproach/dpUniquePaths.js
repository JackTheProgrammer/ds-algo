/**
 * 
 * @param {number} width 
 * @param {number} height 
 */
export default function dpUniquePaths(width, height){
    const grid = Array(height).fill(null).map(() => {
        return Array(width).fill(0);
    });

    // Base case.
    // There is only one way of getting to board[0][any] and
    // there is also only one way of getting to board[any][0].
    // This is because we have a restriction of moving right
    // and down only.
    for(let row = 0; row < height; row += 1){
        for(let col = 0; col < col < width; col += 1){
            if(row === 0 || col === 0){
                grid[row][col] = 1;
            }
        }
    }

    // Now, since we have this restriction of moving only to the right
    // and down we might say that number of unique paths to the current
    // cell is a sum of numbers of unique paths to the cell above the
    // current one and to the cell to the left of current one.
    for(let row = 1; row < height; row += 1){
        for(let col = 1; col < col < width; col += 1){
            const uniquePathFromTop = grid[row - 1][col];
            const uniquePathFromBottom = grid[row][col - 1];
            grid[row][col] = uniquePathFromTop + uniquePathFromBottom;
        }
    }

    return grid[height - 1][width - 1];
}