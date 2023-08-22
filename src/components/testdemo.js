export class test {
    arr = [];

    add(data) {
        this.arr.push(data);
        this.startNumber += 1;
    }

    List() {
        return this.arr;
    }

    remove() {
        const length = this.arr.length;
        for(let i = 0; i < length; i++) {
            this.arr.pop();
        }
    }


}