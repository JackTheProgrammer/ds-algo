/**
 * @param {number} integerNumber 
 * @returns {number}
 */
export default function integerPartition(integerNumber){
    if(integerNumber / 1 !== 0){
        throw new Error(`${integerNumber} can't be floating type`);
    }

    const partitionMatrix = Array(integerNumber + 1).fill(null).map(() => {
        return Array(integerNumber).fill(null);
    });

    // Let's fill the column of the above array with how many ways we've 
    // to combine numbers 1, 2, 3, 4,....integerNumber with number 0. We
    // would've zero ways obviously, because with 0 numbers we may form
    // only zero.
    for(let numberIndex = 1; numberIndex <= integerNumber; numberIndex += 1){
        partitionMatrix[0][numberIndex] = 0;
    }

    // Let's fill the row indicating number of ways we can form number
    // zero out of numbers {0, 0} ,{1, 0}, {1, 2}, {0, 1}, {1, 2} 
    // and {2, 3},... Obviously we've 1 way to form 0 and that is from
    // the number 0 itself.
    for(let summandIndex = 1; summandIndex <= integerNumber; summandIndex += 1){
        partitionMatrix[summandIndex][0] = 1;
    }

    // Now go through all possible options to find out how we could 
    // form m out of 0, 1, 2, 3,....m using dynamic programming
    for(let summandIndex = 1; summandIndex <= integerNumber; summandIndex += 1){
        for(let numberIndex = 1; numberIndex <= integerNumber; numberIndex += 1){
            if(summandIndex > numberIndex){
                // If the summand number is greater than the current number
                // then just it won't add any new way to form the integerNumber, henceforth
                // , we may copy from the row above the current number.
                partitionMatrix[summandIndex][numberIndex] = partitionMatrix[summandIndex - 1][numberIndex];
            } else {
                /**
                  * The number of combinations will be equal to the combinations
                  * for forming the same number but without current summand number
                  * PLUS combinations for forming the same number but WITH current
                  * summand
                  * 
                  * EXAMPLE:
                  *     No. of ways to form 5 using summand {0, 1, 2} would be equal to:
                  *      - Number of ways to find 5 using {0, 1} (we've excluded 2).
                  *      - Number of ways to find 3 (because 5 - 2 =3) using summand
                  *        {0, 1, 2} summand (2 included)
                 */
                const combinationWithoutSummand = partitionMatrix[summandIndex - 1][numberIndex];
                const combinationWithSummand = partitionMatrix[summandIndex][numberIndex - summandIndex];
                partitionMatrix[summandIndex][numberIndex] = combinationWithoutSummand + combinationWithSummand
            }
        }
    }

    return partitionMatrix[integerNumber][integerNumber];
}