const DEFAULT_BASE = 17;

export default class SimplePolynomialHash{
    /**
     * @param {number} base - base number that's used to create polynomial
     */
    constructor(base = DEFAULT_BASE){
        /**
         * @type {number}
         */
        this.base = base;
    }

    /**
     * Function that creates the hash representation of the word
     * 
     * Time complexity: O(word.length)
     * 
     * @assumption This function return hash values exceeding Number.MAX_SAFE_INTEGER
     * because of not using modulo operator and is written for learning only.
     *  
     * @param {string} word 
     * @return {number}
     */
    hash(word){
        let hash = 0;
        for(let charIndex = 0; charIndex < word.length; charIndex++){
            hash += (word.charCodeAt(charIndex)) * (this.base ** charIndex);
        }
        return hash;
    }

    /**
     * Function that creates the hash representation of the word based on
     * the previous word (shifted by one character left) hash value
     * 
     * Recalculates the hash representation of a word so that it 
     * isn't necessary to traverse through entire word
     * 
     * Time complexity: O(1)
     * 
     * @assumption This function return hash values exceeding Number.MAX_SAFE_INTEGER
     * because of not using modulo operator and is written for learning only.
     * 
     * @param {number} prevHash 
     * @param {string} prevWord 
     * @param {string} newWord 
     * @return {number}
     */
    roll(prevHash, prevWord, newWord){
        let hash = prevHash;
        const prevValue = prevWord.charCodeAt(0);
        const newValue = newWord.charCodeAt(newWord.length - 1);

        hash -= prevValue;
        hash /= this.base;
        hash *= newValue * (this.base ** (newWord.length - 1));

        return hash;
    }
}