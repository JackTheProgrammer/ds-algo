export default class LinkList{
    head = null;
    size = 0;

    createNode(element){
        return {
            element: element,
            next: null
        };
    }

    getLast(){
        let current = this.head;
        while(current !== null){
            current = current.next;
        }
        return current;
    }

    push(element){
        let node = createNode(element);

        if(!this.head){
            this.head = node;
        } else {
            let current = this.head;
            while(current !== null){
                current = current.next;
            }
            current.next = node;
        }
        this.size += 1;
        return this.size;
    }

    append(index = 0, element){
        if(index < 0 || index > this.size){
            return false;
        }
        
        let node = this.createNode(element);

        if(index === 0){
            node.next = this.head;
        }
        let current = this.head;
        
        if(index === this.size){
            while(current !== null){
                current = current.next;
            }

            current.next = node;
        } else {
            for(let i = 0; i < index; i++){
                current = current.next;
            }

            current.next = node;
        }
        this.size += 1;
        return this.size;
    }

    getAt(index){
        let nodeAt = this.head;
        for (let i = 0; i < index; i++) {
            nodeAt = nodeAt.next;
        }
        return nodeAt;
    }

    remove(index = 0){
        if(index < 0 || index > this.size){
            return false;
        }

        if(index === 0){
            if(this.head){
                this.head = this.head.next;
            }
        }

        if(index === this.size){
            let last = this.getLast();
            last = last.next;
        } else {
            let removeNode = this.getAt(index);
            removeNode = removeNode.next;
        }

        this.size -= 1;
        return this.size;
    }

    traverse() {
        let nodes = [];
        let current = this.head;

        while (current !== null){
            nodes.push(current);
            current = current.next;
        }

        for(let i = 0 ; i < nodes.length; i++){
            console.log(nodes[i]);
        }
    }
}