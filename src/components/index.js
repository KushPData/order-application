import { functionalities } from "./functionalities.js";

const order = new functionalities();
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

// export const editButtons = document.querySelectorAll("#edit-button");
const editSection = document.querySelector(".edit-section");

document.querySelectorAll("#edit-button").forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log(JSON.parse(sessionStorage.getItem('orders'))[index].poNumber);
        editSection.classList.remove("d-none");
        
        const stakeholdersDetailsContainer = document.querySelector(".stakeholders-details-container");
        order.editDropdownList(stakeholdersDetailsContainer, "VendorList", "vendor-list", "Vendors: ", "VendorName", "vendor-feedback", "Please select a vendor!!!", index, "vendor");
        order.makeDropdownList(stakeholdersDetailsContainer, "ShipTo", "ship-to", "Ship To: ", "CompanyName", "ship-to-feedback", "Please select a ship to address!!!", index, "shipTo");

        const logisticsContainer = document.querySelector(".logistics-details");
        order.editDropdownList(logisticsContainer, "DeliveryMethod", "delivery-method", "Delivery Method: ", "", "delivery-feedback", "Please select a delivery method!!!", index, "deliveryMethod");
        order.editDropdownList(logisticsContainer, "PaymentTerms", "payment-terms", "Payment Terms: ", "", "payment-feedback", "Please select your payment terms!!!", index, "paymentTerms");
    })
})



{/* <a href='./../src/edit.html'> */ }