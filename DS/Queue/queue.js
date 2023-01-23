class Queue{
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

    enqueue(item){
        if(this.isFull === false){
            this.#list.push(item);
        }

        return this.size;
    }

    dequeue(){
        if(this.isEmpty === false){
            this.#list.shift();
        }

        return this.size;
    }

    peek(){
        for (let index = 0; index < this.size; index++) {
            console.log(this.#list[index]);
        }
    }
}