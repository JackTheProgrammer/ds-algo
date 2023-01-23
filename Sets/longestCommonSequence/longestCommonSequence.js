/**
 * The longest common subsequence (LCS) problem is the problem of finding the longest 
 * subsequence common to all sequences in a set of sequences (often just two sequences). 
 * It differs from the longest common substring problem: unlike substrings, 
 * subsequences are not required to occupy consecutive positions within the 
 * original sequences.
 * 
 * For example:
 *      LCS for input Sequences ABCDGH and AEDFHR is ADH of length 3.
 *      LCS for input Sequences AGGTAB and GXTXAYB is GTAB of length 4.
 * 
 * @see: https://youtube.com/watch?v=NnD96abizww
 * 
 * @param {string[]} seq1
 * @param {string[]} seq2
 * @return {string[]}
 */
export default function longestCommonSubsequence(seq1, seq2){
    const lcsMatrix = Array(seq2.length + 1).fill(null).map(() => {
        return Array(seq1.length + 1).fill(null);
    });

    for(let row = 0; row < seq2.length; row++){
        for(let col = 0; col < seq1.length; col++){
            lcsMatrix[row][col] = 0;
        }
    }

    // Fill the rest of the array values that corresponds to
    // each of the strings in these two arrays.
    for(let row = 1; row <= seq2.length; row++){
        for(let col = 1; col <= seq1.length; col++){
            if(seq2[row - 1] === seq2[col - 1]){
                lcsMatrix[row][col] = lcsMatrix[row - 1][col - 1] + 1;
            } else {
                lcsMatrix[row][col] = Math.max(
                    lcsMatrix[row - 1][col],
                    lcsMatrix[col][row - 1]
                );
            }
        }
    }

    // Calculate LCS based on LCS matrix.
    if(!lcsMatrix[seq2.length][seq1.length]){
        // If the length of largest common string is zero then return empty string.
        return [''];
    }

    let commonLongestSubsequence = [];
    let longestRowIndex = seq2.length;
    let longestColumnIndex = seq1.length;

    // Find the common sequences found by using the lcs matrix
    while(longestRowIndex > 0 || longestColumnIndex > 0){
        if(seq2[longestRowIndex - 1] === lcsMatrix[longestColumnIndex - 1]){
            // Move by diagonal left-top.
            commonLongestSubsequence.unshift(seq2[longestColumnIndex - 1]);
            longestRowIndex -= 1;
            longestColumnIndex -= 1;
        } else if(
            lcsMatrix[longestRowIndex][longestColumnIndex] === 
            lcsMatrix[longestRowIndex][longestColumnIndex - 1]
        ){
            longestColumnIndex -= 1; // move left
        } else {
            longestRowIndex -= 1; //move right
        }
    }

    return commonLongestSubsequence;
}