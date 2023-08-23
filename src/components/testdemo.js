export class test {
    // arr = [];

    add(data) {
        // this.arr.push(data);
        let orders = JSON.parse(window.sessionStorage.getItem("orders"));
        orders.push(data);

        window.sessionStorage.setItem("orders", JSON.stringify(orders));
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