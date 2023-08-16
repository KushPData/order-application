"use strict";
import { functionalities } from "./functionalities.js";
import { test } from "./testdemo.js"

const order = new functionalities();
const test1 = new test();

const stakeholdersDetailsContainer = document.querySelector(".stakeholders-details-container");
order.makeDropdownList(stakeholdersDetailsContainer, "VendorList", "vendor-list", "Vendors: ", "VendorName", "vendor-feedback", "Please select a vendor!!!");
order.makeDropdownList(stakeholdersDetailsContainer, "ShipTo", "ship-to", "Ship To: ", "CompanyName", "ship-to-feedback", "Please select a ship to address!!!");

const logisticsContainer = document.querySelector(".logistics-details");
order.makeDropdownList(logisticsContainer, "DeliveryMethod", "delivery-method", "Delivery Method: ", "", "delivery-feedback", "Please select a delivery method!!!");
order.makeDropdownList(logisticsContainer, "PaymentTerms", "payment-terms", "Payment Terms: ", "", "payment-feedback", "Please select your payment terms!!!");

const addButton = document.querySelector("#add-button");
const productList = document.querySelector(".product-list");
order.addProduct(addButton, productList, ["product-name", "quantity", "unit-price"], ["Product Name/Description: ", "Qty Approx: ", "Unit Price: "], ["name-feedback", "quantity-feedback", "price-feedback"], ["Please enter a product name!!!", "Please enter the quantity of product!!!", "Please enter the unit price of the product!!!"]);


let inputArray = [];

const submit = document.getElementById("submit-button");
submit.addEventListener("click", (event) => {
    event.preventDefault();

    // const summary = document.querySelector(".summary");
    // summary.classList.remove("d-none");

    let object = {};
    let arr = [];

    const orderDate = document.querySelector("#order-date");
    const orderPoNumber = document.querySelector("#order-po-number");
    const vendor = document.querySelector("#vendor-list");
    const shipTo = document.querySelector("#ship-to");
    const deliveryMethod = document.querySelector("#delivery-method");
    const paymentTerms = document.querySelector("#payment-terms");
    const againstQuote = document.querySelector("#against-quote");

    const nameList = document.querySelectorAll("#product-name");
    const quantityList = document.querySelectorAll("#quantity");
    const priceList = document.querySelectorAll("#unit-price");

    const discount = document.querySelector("#discount");
    const otherCosts = document.querySelector("#other-costs");
    const gstVatRate = document.querySelector("#gst-vat-rate");
    const note = document.querySelector("#note");

    const nameArray = order.getValues(nameList);
    const quantityArray = order.getValues(quantityList);
    const priceArray = order.getValues(priceList);

    inputArray = [orderDate, orderPoNumber, againstQuote, nameList, quantityList, priceList, discount, otherCosts, gstVatRate, note];
    const selectList = document.querySelectorAll("select");

    const vendorValue = vendor.value;
    const shipToValue = shipTo.value;
    const deliveryMethodValue = deliveryMethod.value;
    const paymentTermsValue = paymentTerms.value;

    let validator = order.validation(orderDate.value, orderPoNumber.value, vendorValue, shipToValue, nameArray, quantityArray, priceArray, deliveryMethodValue, paymentTermsValue, gstVatRate.value);

    let finalValidator = true;

    for (let i = 0; i < validator.length; i++) {
        if (validator[i] === false) {
            finalValidator = false;
            break;
        }
    }

    if (finalValidator === true) {
        const summary = document.querySelector(".summary");
        summary.classList.remove("d-none");

        for (const select of selectList.values()) {
            select.setAttribute('disabled', true);
        }

        let length = inputArray.length;

        while (length--) {
            if (inputArray[length] instanceof NodeList) {
                for (const product of inputArray[length].values()) {
                    product.readOnly = true;
                }
            } else {
                inputArray[length].readOnly = true;
            }
        }

        object = { "date": orderDate.value, "poNumber": orderPoNumber.value, "vendor": vendorValue, "shipTo": shipToValue, "deliveryMethod": deliveryMethodValue, "paymentTerms": paymentTermsValue, "againstQuote": againstQuote.value, "nameArray": nameArray, "quantityArray": quantityArray, "priceArray": priceArray, "discount": discount.value, "otherCosts": otherCosts.value, "gstVatRate": gstVatRate.value, "note": note.value };

        test1.add(object);

        arr = test1.List();
        let row = "";

        const table = document.querySelector("#table");

        for (let i = 0; i < arr.length; i++) {
            row += "<tr><th colspan='2'>Vendor</th><th colspan='3'>Ship To</th><tr>";
            row += "<tr><td colspan='2'>" + arr[i].vendor + "</td><td colspan='3'>" + arr[i].shipTo + "</td></tr>"

            row += "<tr><th colspan='2'>Delivery Method</th><th>Payment Terms</th><th colspan='2'>Against Quote No:</th></tr>";
            row += "<tr><td colspan='2'>" + arr[i].deliveryMethod + "</td><td>" + arr[i].paymentTerms + "</td><td colspan='2'>" + arr[i].againstQuote + "</td></tr>"

            row += "<tr><th>SR. NO.</th><th>Product Name/Description</th><th>Qty Approx</th><th>Unit Price</th><th>Total</th></tr>"

            let counter = 0;
            let totalExcludingTax = 0;
            let totalProduct = 0;
            for (let j = 0; j < arr[i].nameArray.length; j++) {
                let total = parseInt(arr[i].quantityArray[j]) * parseInt(arr[i].priceArray[j]);
                totalProduct += parseInt(arr[i].quantityArray[j]);
                row += "<tr><td>" + (j + 1) + "</td><td>" + arr[i].nameArray[j] + "</td><td>" + arr[i].quantityArray[j] + "</td><td>" + arr[i].priceArray[j] + "</td><td>" + total + "</td></tr>";

                counter++;
                totalExcludingTax += total;
            }

            for (let j = 0; j < (16 - counter); j++) {
                row += "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
            }

            row += "<tr><td></td><td colspan='2'>Total Excl. Tax</td><td>" + totalProduct + "</td><td>" + totalExcludingTax + "</td></tr>";

            row += "<tr><td rowspan='7' colspan='3'>" + "Note:" + arr[i].note + "</td><td>Discount</td><td>" + arr[i].discount + "</td></tr>";

            row += "<tr><td>Other Costs</td><td>" + arr[i].otherCosts + "</td></tr>";

            row += "<tr><td>GST/VAT Rate</td><td>" + arr[i].gstVatRate + "%" + "</td></tr>";

            let gstVatValue = (parseInt(arr[i].gstVatRate) / 100) * parseInt(totalExcludingTax);

            row += "<tr><td>GST/VAT " + arr[i].gstVatRate + "%" + "</td><td>" + gstVatValue + "</td></tr>"

            let grandTotal = (parseInt(totalExcludingTax) + parseInt(arr[i].otherCosts) + parseInt(gstVatValue)) - parseInt(arr[i].discount);

            row += "<tr><td colspan='2'></td></tr>"

            row += "<tr><td>Total</td><td>" + grandTotal + "</td></tr>"

            row += "<tr height='30px'><td rowspan='2' colspan='2'>Authorized signature</td></tr>"

            row += "<tr><td>Date</td><td colspan='2'>" + arr[i].date + "</td></tr>"

        }

        table.innerHTML = row;

    }

})

const edit = document.querySelector("#edit-button");
edit.addEventListener("click", (editText) => {
    editText.preventDefault();

    const summary = document.querySelector(".summary");
    summary.classList.add("d-none");

    const table = document.querySelector("#table");
    table.innerHTML = "";
    test1.remove();

    const orderDate = document.querySelector("#order-date");
    const orderPoNumber = document.querySelector("#order-po-number");
    const againstQuote = document.querySelector("#against-quote");

    const nameList = document.querySelectorAll("#product-name");
    const quantityList = document.querySelectorAll("#quantity");
    const priceList = document.querySelectorAll("#unit-price");

    const discount = document.querySelector("#discount");
    const otherCosts = document.querySelector("#other-costs");
    const gstVatRate = document.querySelector("#gst-vat-rate");
    const note = document.querySelector("#note");

    inputArray = [orderDate, orderPoNumber, againstQuote, nameList, quantityList, priceList, discount, otherCosts, gstVatRate, note];
    const selectList = document.querySelectorAll("select");

    console.log(selectList);
    for (const select of selectList.values()) {
        select.removeAttribute("disabled");
    }

    let length = inputArray.length;

    while (length--) {
        if (inputArray[length] instanceof NodeList) {
            for (const product of inputArray[length].values()) {
                product.readOnly = false;
            }
        } else {
            inputArray[length].readOnly = false;
        }
    }
})