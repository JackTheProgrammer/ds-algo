export default class PriorityQueue{
    #list = [];
    #capacity;

    constructor(capacity = 0) {
        this.#capacity = capacity;
    }

    get size(){
        return this.#list.length;
    }

    get isEmpty(){
        return this.#list.length === 0;
    }

    get isFull(){
        return this.#capacity === null && this.size === this.#capacity;
    }

    enqueue(item, priority = 0){
        priority = Math.max(Number(priority), 0);
        let element = {item, priority};
        if(this.isEmpty || element.priority >= this.#list[this.size - 1].priority){
            this.#list.push(element);
        } else {
            for(let index in this.#list){
                if(this.#list[index].item === element.item){
                    this.#list.splice(0, index).concat(this.#list.slice(index + 1));
                    element.item = item;
                    element.priority = priority;
                    this.#list.push(element);
                }
                if(element.priority < this.#list[index].priority){
                    this.#list.splice(index, 0, element);
                    break;
                }
            }
        }

        return this.size;
    }

    /**
     * Returns the object with lowest priority as its property
     * @returns {object}
     */
    dequeue(){
        if(this.isEmpty === false){
            this.#list.shift();
        }

        return this.size;
    }

    peek(){
        return this.#list[0];
    }

    hasItem(item){
        for (let index = 0; index < this.#list.length; index++) {
            const element = this.#list[index];
            if(item !== element.item){
                return false;
            }
        }

        return true;
    }

    /**
     * @param {*} item 
     * @param {number} priority 
     */
    changePriority(item, priority){
        return this.hasItem(item) === true ? this.enqueue(item, priority) : "Item not found";
    }

    print(){
        console.log(this.#list);
    }
}