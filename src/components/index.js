const list = document.querySelector('#list');

if (sessionStorage.length !== 1) {
    document.querySelector('.no-list').classList.add("d-none");
    list.classList.remove('d-none');
}

let row = "";

row += "<tr><th>P.O. Number</th><th>Date</th><th>Product(s)</th><th>Vendor</th><th>Ship To</th></tr>";

const orders = JSON.parse(window.sessionStorage.getItem('orders'));
for (let i = 0; i < orders.length; i++) {
    row += "<tr><td>" + orders[i].poNumber + "</td><td>" + orders[i].date + "</td>"

    for (let j = 0; j < orders[i].nameArray.length; j++) {
        row += "<td>" + orders[i].nameArray[j] + "</td>"
    }

    row += "<td>" + orders[i].vendor + "</td><td>" + orders[i].shipTo + "</td><td><button class='table-button' id='edit-button' type='click'>Edit</button></td></tr>"

}

list.innerHTML = row;