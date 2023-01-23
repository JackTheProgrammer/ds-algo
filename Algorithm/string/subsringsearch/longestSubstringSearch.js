/**
 * @param {string} string1 
 * @param {string} string2 
 * @return {string}
 */

export default function longestCommonSubstring(string1, string2){
    // Convert strings to arrays to treat unicode's symbols correctly
    // e.g. 'U'.length === 2 while [....'U'].length === 1

    const s1 = [...string1];
    const s2 = [...string2];
    
    // Init subStringMatrix with 0s for dynamic programming approach
    const subStringMatrix = Array(s2.length + 1)
                            .fill(0)
                            .map(() => Array(s1.length + 1).fill(0));
    
    // Build the matrix of all substring length for dynamic programming
    let commonLongestSubstring = '';
    let longestSubstringLength = 0;
    let longestSubstringRow = 0;
    let longestSubstringColumn = 0;

    for(let row = 1; row <= s2.length; row++){
        for(let col = 1; col <= s1.length; col++){
            if(s2[row - 1] === s1[col - 1]){
                subStringMatrix[row][col] = subStringMatrix[row - 1][col - 1] + 1;
            } else {
                subStringMatrix[row][col] = 0;
            }

            // Try to find the biggest length of all common substrings and
            // memorize its last character index
            if(subStringMatrix[row][col] > longestSubstringLength){
                longestSubstringLength = subStringMatrix[row][col];
                longestSubstringColumn = col;
                longestSubstringRow = row;
            }
        }
    }

    if(longestSubstringLength === 0){
        // no longest common substring found
        return '';
    }

    // Detect longest substring from substring matrix
    while(subStringMatrix[longestSubstringRow][longestSubstringColumn] > 0){
        commonLongestSubstring = s1[longestSubstringColumn -  1] + commonLongestSubstring;
        longestSubstringRow -= 1;
        longestSubstringColumn -= 1;
    }

    return commonLongestSubstring;
}