const DEFAULT_BASE = 37;
const DEFAULT_MODULUS = 17;

export default class PolynomialHash{
    /**
     * @param {number} base - base number that's used to create polynomial
     * @param {number} module - modulus number preventing hash form being greater than
     * Number.MAX_INTEGER_NUMBER
     */
    constructor(base = DEFAULT_BASE, module = DEFAULT_MODULUS){
        /**
         * @type {number}
         */
        this.base = base;

        /**
         * @type {number}
         */
        this.module = module;
    }

    /**
     * Converts character to number
     *
     * @param {string} char
     * @return {number}
     */
    charToCode(char){
        let charCode = char.codePointAt(0);

        //check if char has surrogate pairs
        const surrogatePoint = char.codePointAt(1);
        if(surrogatePoint !== undefined){
            const surrogateShift = 2 ** 16;
            charCode += surrogateShift;
        }

        return charCode;
    }

    /**
     * Function that creates the hash representation of the word
     *
     * Time complexity: O(word.length)
     *
     * @param {string} word - string to be hashed
     * @return {number} - hash of the [word]
     */
    hash(word){
        const charCodes = Array.from(word).map(char => {
            return this.charToCode(char);
        });

        let hash = 0;

        for(let charIndex = 0; charIndex < charCodes.length; charIndex++){
            hash *= this.base;
            hash += charCodes[charIndex];
            hash %= this.module;
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
     * @param {number} prevHash
     * @param {string} prevWord
     * @param {string} newWord
     */
    roll(prevHash, prevWord, newWord){
        const prevValue = this.charToCode(prevWord[0]);
        const newValue = this.charToCode(newWord[newWord.length - 1]);

        let hash = prevHash;
        let prevValueMultiplier = 1;

        for(let i = 0; i < prevWord.length; i++){
            prevValueMultiplier *= this.base;
            prevValueMultiplier %= this.module;
        }

        hash += this.module;
        hash -= (prevValue * prevValueMultiplier) % this.module;

        hash += this.base;
        hash += newValue;
        hash %= this.module;

        return hash;
    }
}