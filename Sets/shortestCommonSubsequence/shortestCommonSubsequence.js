import longestCommonSubsequence from "../longestCommonSequence/longestCommonSequence";

/**
 * The shortest common super-sequence (SCS) of two sequences X and Y 
 * is the shortest sequence which has X and Y as subsequences.
 * 
 * For example:
 *   Example: 1   Input:   str1 = "geek",  str2 = "eke"
 *                Output: "geeke"
 *      
 *   Example 2:   Input:   str1 = "AGGTAB",  str2 = "GXTXAYB"
 *                Output:  "AGXGTXAYB"
 *  
 * @see: https://www.geeksforgeeks.org/shortest-common-supersequence/
 * 
 * @param {string[]} seq1 
 * @param {string[]} seq2 
 * @return {string[]}
 */
export default function shortestCommonSubsequence(seq1, seq2){
    // First we'll find the common subsequence
    const lcs = longestCommonSubsequence(seq1, seq2);

    if(lcs.length === 0 || !lcs){
        return seq1.concat(seq2);
    }
    
    let seq1Index = 0;
    let seq2Index = 0;
    let lcsIndex = 0;

    let seq1OnHold = false;
    let seq2OnHold = false;

    let superSequence = [];

    while(lcsIndex < lcs.length){
        // Add the unequal elements of both sequences in the superSequence.
        if(!seq1OnHold && (seq1[seq1Index] !== lcs[seq1Index])){
            superSequence.push(seq1[seq1Index]);
            seq1Index += 1;
        } else {
            seq1OnHold = true;
        }

        // Do the same for seq2 as done for seq1 above.
        if(!seq2OnHold && (seq2[seq2Index] !== lcs[seq2Index])){
            superSequence.push(seq2[seq2Index]);
            seq2Index += 1;
        } else {
            seq2OnHold = true;
        }

        // Add lcs elements in superSequence
        if(seq1OnHold && seq2OnHold){
            superSequence.push(lcs[lcsIndex]);
            
            seq1Index += 1;
            seq2Index += 1;

            seq1OnHold = false;
            seq2OnHold = false;
        }
    }

    // Check for left elements of both sequences (seq1 & seq2)
    if(lcsIndex < seq1.length){
        superSequence = superSequence.concat(seq1);
    }

    if(lcsIndex < seq2.length){
        superSequence = superSequence.concat(seq2);
    }

    return superSequence;
}