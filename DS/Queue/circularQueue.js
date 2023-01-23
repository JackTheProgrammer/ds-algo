class CircularQueue{
    #list
    #capacity = 0;
    #head = -1;
    #tail = -1;
    #size = 0;

    constructor(capacity = 0) {
        this.#capacity = Math.max(Number(capacity), 0) || 10;
        this.#list = new Array(this.#capacity).fill(null);
    }

    get size(){
        return this.#size;
    }

    get isFull(){
        return this.size === this.#capacity;
    }

    get isEmpty(){
        return this.size === 0;
    }

    enqueue(item){
        this.#tail = (this.#tail + 1) % this.#capacity;
        this.#list[this.#tail] = item;
        this.#size++;

        if(this.#head === -1){
            this.#head = this.#tail;
        }

        return this.size;
    }

    dequeue(){
        let item = null;

        if(!this.isEmpty){
            item = this.#list[this.#head];
            this.#list[this.#head] = null;
            this.#head = (this.#head + 1) % this.#capacity;
            this.#size--;
        }

        if(!this.size){
            this.#head = -1;
            this.#tail = -1;
        }

        return this.size;
    }

    peek(){
        return this.#list[this.#head];
    }
}