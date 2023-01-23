export default class BloomFilter{
    /**
     * size is inversely proportional to false - positives in the bloomfilter tree,the
     * bigger the tree, the more is its accuracy.
     * @param {number} size 
     */
    constructor(size = 100) {
        this.size = size;
        this.filterArray = new Array(this.size).fill(false);
        this.filterArrayInterface = {
            /**
             * @param {number} index 
             * @returns {boolean}
             */
            getValue(index){
                return this.filterArray[index];
            },

            /**
             * @param {number} index 
             */
            setValue(index){
                this.filterArray[index] = true;
            }
        };
    }

    /**
     * @param {string} item
     * @return {number}
     */
    hash1(item) {
        let hash = 0;
        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            let char = item.charCodeAt(charIndex);
            hash &= hash + char; //converts to 32 - bit integer
            hash = Math.abs(hash);
        }
        return hash % this.size;
    }

    /**
     * @param {string} item
     * @return {number}
     */
    hash2(item) {
        let hash = 0;
        for(let charIndex = 0; charIndex < this.size; charIndex++) {
            let char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char;
        }
        return Math.abs(hash%this.size);
    }

    /**
     * @param {string} item
     * @return {number}
     */
    hash3(item) {
        let hash = 0;
        for(let charIndex = 0; charIndex < item.length; charIndex++){
            let charCode = item.charCodeAt(charIndex);
            hash = (hash << 5) - hash;
            hash += charCode;
            hash &= hash; //converts to 32 bit integer
        }
        return Math.abs(hash%this.size);
    }

    /**
     * @param {string} item 
     * @return {number[]}
     */
    getHashes(item){
        return [
            this.hash1(item),
            this,hash2(item),
            this.hash3(item)
        ];
    }

    insertItem(item){
        const hashValues = this.getHashes(item);
        hashValues.forEach(index => this.filterArrayInterface.setValue(index));
    }

    mayContain(item){
        const hashValues = this.getHashes(item);
        for(let hashIndex = 0; hashIndex < hashValues.length; hashIndex++) {
            if(!this.filterArrayInterface.getValue(hashIndex) === true){
                return false;
            }
        }
        return true;
    }
}