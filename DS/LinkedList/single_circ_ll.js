import LinkList from './linklist';

class SingleCircularLinkList extends LinkList {
    tail = null;

    push(element) {
        let node = this.createNode(element);
        if(!this.head){
            this.head = node;
            this.head.next = this.tail;
            this.tail = this.head;
        } else {
            let current = this.head;
            while(current !== this.tail){
                current = current.next;
            }
            current = node;
            current.next = this.tail;
            this.tail = current;
        }
        this.size += 1;
        return this.size;
    }

    append(index = 0, element){
        if(index < 0 || index > this.size) return false;
        
        let node = this.createNode(element);

        if(index === 0){
            if(this.head){
                node.next = this.head;  
            } else {
                node = node.next;
            }
        }

        if(index === this.size){
            node.next = this.tail;
            this.tail.next = node;
            this.tail = node;
        } else {
            let current = this.head;
            while(current !== this.tail){
                current = current.next;
            }
            node.next = this.tail;
            this.tail = node;   
        }
        this.size += 1;
        return this.size;
    }

    remove(element){
        let removeNode = this.head;

        while(removeNode.element !== element){
            removeNode = removeNode.next;
        }

        removeNode = removeNode.next;
        this.size -= 1;
        return this.size;
    }

    remove(index = 0){
        if(index < 0 || index > this.size){
            return true;
        }

        if (index === 0) {
            if(this.size === 1){
                this.head = null;
            } else {
                this.head = this.head.next;
            }
        }

        if(index === this.size){
            this.tail = this.tail.next;
        } else {
            let removeNode = this.head;
            for(let i = 0; i < index; i++){
                removeNode = removeNode.next;
            }

            removeNode = removeNode.next;
        }

        this.size -= 1;
        return this.size;
    }

    traverse(){
        let nodes = [];
        let current = this.head;

        while (current !== null) {
            nodes.push(current);
            current = current.next;
        }

        return nodes;
    }
}