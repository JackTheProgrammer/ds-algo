/**
 * @param {string} word
 * @return {number[]}
 */
function buildPatternTable(word){
    const patternTable = [0];
    const prefixIndex = 0;
    const suffixIndex = 1;

    while(suffixIndex < word.length){
        if(word[suffixIndex] === word[prefixIndex]){
            patternTable[suffixIndex] = prefixIndex + 1;
            prefixIndex += 1;
            suffixIndex += 1;
        } else if(prefixIndex === 0){
            patternTable[suffixIndex] = 0;
            suffixIndex += 1;
        } else {
            prefixIndex = patternTable[prefixIndex - 1];
        }
    }

    return patternTable;
}

/**
 * @param {string} text
 * @param {string} word
 * @return {number}
 */
export default function knuthMorrisPratt(text, word){
    if(word.length === 0) return 0;

    let textIndex = 0;
    let wordIndex = 0;
    let patternTable = buildPatternTable(word);

    while(textIndex < text.length){
        if(text[textIndex] === word[wordIndex]){
            //match found
            if(wordIndex === word.length){
                return textIndex - word.length;
            }

            wordIndex += 1;
            textIndex += 1;
        } else if(wordIndex > 0){
            wordIndex = patternTable[wordIndex - 1];
        } else {
            wordIndex = 0;
            textIndex += 1;
        }
    }

    return -1;
}