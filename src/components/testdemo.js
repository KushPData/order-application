import orders from './../data/data.json' assert { type: "json" };

export class test {


    add(data) {
        orders.orders.push(data);
        console.log(orders.orders);
    }

    List() {
        return orders.orders;
    }

    remove() {
        const length = orders.orders.length;
        for(let i = 0; i < length; i++) {
            orders.orders.pop();
        }
        console.log(orders.orders);
    }

}