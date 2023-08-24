"use strict";
import { functionalities } from "./functionalities.js";
// import { editButtons } from "./index.js";
// import { test } from "./testdemo.js"

const order = new functionalities();
// const test1 = new test();

editButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log(JSON.parse(sessionStorage.getItem('orders'))[index].poNumber);

        const stakeholdersDetailsContainer = document.querySelector(".stakeholders-details-container");
        order.editDropdownList(stakeholdersDetailsContainer, "VendorList", "vendor-list", "Vendors: ", "VendorName", "vendor-feedback", "Please select a vendor!!!");
        order.makeDropdownList(stakeholdersDetailsContainer, "ShipTo", "ship-to", "Ship To: ", "CompanyName", "ship-to-feedback", "Please select a ship to address!!!");

        const logisticsContainer = document.querySelector(".logistics-details");
        order.editDropdownList(logisticsContainer, "DeliveryMethod", "delivery-method", "Delivery Method: ", "", "delivery-feedback", "Please select a delivery method!!!");
        order.editDropdownList(logisticsContainer, "PaymentTerms", "payment-terms", "Payment Terms: ", "", "payment-feedback", "Please select your payment terms!!!");

    })
})



