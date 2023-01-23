export default class KnapsackItem{
    /**
     * @param {Object} itemSetting
     * @param {number} itemSetting.weight
     * @param {number} itemSetting.value
     * @param {number} itemSetting.itemsAmount
     */
    constructor({weight, value, itemsAmount}){
        this.weight = weight;
        this.value = value;
        this.itemsAmount = itemsAmount
        // The quantity in which items will be added;
        this.quantity = 1;
    }

    /**
     * @returns {number}
     */
    getTotalWeight(){
        return this.quantity * this.weight;
    }

    /**
     * @returns {number}
     */
    getTotalValue(){
        return this.quantity * this.value;
    }

    /**
     * @returns {number}
     */
    getValuePerWeight(){
        return this.value / this.weight;
    }

    /**
     * @returns {string}
     */
    toString(){
        return `${this.weight}, ${this.value}, ${this.itemsAmount}`;
    }
}