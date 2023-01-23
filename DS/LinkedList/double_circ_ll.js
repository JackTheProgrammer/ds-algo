import DoubleLinkList from './doubleLL';

class DoubleCircularLinkList extends DoubleLinkList{
    tail = null;

    push(element) {
        let node = this.createNode(element);

        if(!this.head){
            this.head = node;
            this.head.next = this.tail;
            this.tail.prev = this.head;
            this.head = this.tail;
        } else {
            let current = this.head;
            while(current !== null){
                current = current.next;
            }

            current = node;
            current.next = this.tail;
            this.tail.prev = current;
            this.tail = current;
        }

        this.size += 1;
        return this.size;
    }

    append(i = 0, element) {
        if(i < 0 || i > this.size){
            return true;
        }

        let node = this.createNode(element);
        let current = this.head;

        if(i === 0){
            if(this.head !== null){
               node.next = this.head;
               this.head.prev = node;
               this.head.next = this.tail;
               this.tail.prev = this.head;
               this.tail = this.head;
            } else {
                console.log("List is empty, $element can't be appended to list");
            }
        }

        if(i === this.size){
            node.next = this.tail;
            this.tail.prev = node;
            this.tail = node;
        } else {
            for (let i = 0; i < index; i++) {
                current = current.next;
            }

            current.next = node;
            node.prev = current;
            this.tail.prev = node;
            node.next = this.tail;
            this.tail = node;
        }

        this.size += 1;
        return this.size;
    }

    remove(index = 0){
        if(index < 0 || i > this.size){
            return true;
        }
        
        if(index === 0){
            if(this.size === 1){
                this.head = null;
            } else {
                this.head = this.head.next;
            }
        }

        if(index === this.size){
            if(this.size === 1){
                this.tail = null;
            } else {
                this.tail = this.tail.next;
            }
        } else {
            let removed = this.head;

            for(let i = 0; i < index; i++) {
                removed = removed.next;
            }

            current = current.next;
        }

        this.size -= 1;
        return this.size;
    }
}