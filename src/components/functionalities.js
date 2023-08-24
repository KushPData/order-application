"use strict";

import data from './../data/fields.json' assert { type: "json" };

let numberOfProducts = 1;
let arr = [];
export class functionalities {
    makeDropdownList(place, jsonKey, elementId, elementDescription, value, feedbackName, feedback) {
        const jsonValueArray = data[jsonKey];

        const item = document.createElement("div");
        item.classList.add("item");

        const label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = elementDescription;
        item.appendChild(label);

        const select = document.createElement("select");
        select.setAttribute("class", "input-box");
        select.setAttribute("name", elementId);
        select.setAttribute("id", elementId);

        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "");
        defaultOption.textContent = "--- None Selected ---";
        select.appendChild(defaultOption);

        for (let i = 0; i < jsonValueArray.length; i++) {
            let option = document.createElement("option");
            if (typeof jsonValueArray[i] === 'object') {
                option.setAttribute("value", jsonValueArray[i][value]);
                option.textContent = jsonValueArray[i][value];
            } else {
                option.setAttribute("value", jsonValueArray[i]);
                option.textContent = jsonValueArray[i];
            }
            select.appendChild(option);
        }

        item.appendChild(select);

        const feedbackElement = document.createElement("div");
        feedbackElement.classList.add("invalid-input", "d-none", feedbackName);
        feedbackElement.textContent = feedback;

        item.appendChild(feedbackElement);

        place.appendChild(item);
    }

    makeProductValue(elementId, elementDescription, elementFeedbackId, elementFeedback) {
        const productValue = document.createElement("div");

        const label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = elementDescription;
        productValue.appendChild(label);

        const input = document.createElement("input");
        input.classList.add("input-box")
        input.setAttribute("type", "text");
        input.setAttribute("name", elementId);
        input.setAttribute("id", elementId);
        productValue.appendChild(input);

        const feedback = document.createElement("div");
        feedback.classList.add("invalid-input", "d-none", elementFeedbackId);
        feedback.textContent = elementFeedback;
        productValue.appendChild(feedback);

        return productValue;
    }

    addProduct(addButton, place, elementIdArray, elementDescriptionArray, elementFeedbackIdArray, elementFeedbackArray) {
        addButton.addEventListener("click", function (event) {
            event.preventDefault();


            numberOfProducts += 1;
            const order = new functionalities();

            const oneProduct = document.createElement("div");
            oneProduct.classList.add("one-product");
            oneProduct.setAttribute("id", numberOfProducts);



            for (let i = 0; i < elementIdArray.length; i++) {
                let productValue = order.makeProductValue(elementIdArray[i], elementDescriptionArray[i], elementFeedbackIdArray[i], elementFeedbackArray[i]);
                oneProduct.appendChild(productValue);
            }

            place.appendChild(oneProduct);
        })
    }

    getValues(list) {
        const array = [];
        for (const product of list.values()) {
            array.push(product.value);
        }

        return array;
    }

    validation(date, vendor, shipTo, nameArray, quantityArray, unitArray, deliveryMethod, paymentTerms, gstVat) {
        let validator = [];
        const validate = new functionalities();

        if (validate.validateEach(date)) {
            validator.push(true);
        } else {
            const place = document.querySelector(".date-feedback");
            place.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(vendor)) {
            validator.push(true);
        } else {
            const place = document.querySelector(".vendor-feedback");
            place.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(shipTo)) {
            validator.push(true);
        } else {
            const place = document.querySelector(".ship-to-feedback");
            place.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(nameArray)) {
            validator.push(true);
        } else {
            const place = document.querySelectorAll(".name-feedback");
            const lastElement = place[place.length - 1];
            lastElement.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(quantityArray)) {
            validator.push(true);
        } else {
            const place = document.querySelectorAll(".quantity-feedback");
            const lastElement = place[place.length - 1];
            lastElement.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(unitArray)) {
            validator.push(true);
        } else {
            const place = document.querySelectorAll(".price-feedback");
            const lastElement = place[place.length - 1];
            lastElement.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(deliveryMethod)) {
            validator.push(true);
        } else {
            const place = document.querySelector(".delivery-feedback");
            place.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(paymentTerms)) {
            validator.push(true);
        } else {
            const place = document.querySelector(".payment-feedback");
            place.classList.remove("d-none");
            validator.push(false);
        }

        if (validate.validateEach(gstVat)) {
            validator.push(true);
        } else {
            const place = document.querySelector(".gst-vat-rate-feedback");
            place.classList.remove("d-none");
            validator.push(false);
        }

        return validator;
    }

    validateEach(value) {
        let validator = true;

        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] === "" || value[i] === null) {
                    validator = false;
                    break;
                }
            }
        } else {
            if (value === "" || value === null) {
                validator = false;
            }
        }

        return validator;
    }

    putValue(array) {
        arr = array;
        console.log(arr);
    }


    makeOrderList(place) {
        console.log(place);
        console.log(arr);
    }

    editDropdownList(place, jsonKey, elementId, elementDescription, value, feedbackName, feedback, index, sessionKey) {
        const jsonValueArray = data[jsonKey];

        const item = document.createElement("div");
        item.classList.add("item");

        const label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = elementDescription;
        item.appendChild(label);

        const select = document.createElement("select");
        select.setAttribute("class", "input-box");
        select.setAttribute("name", elementId);
        select.setAttribute("id", elementId);

        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "");
        defaultOption.textContent = "--- None Selected ---";
        select.appendChild(defaultOption);

        for (let i = 0; i < jsonValueArray.length; i++) {
            let option = document.createElement("option");
            if (typeof jsonValueArray[i] === 'object') {
                option.setAttribute("value", jsonValueArray[i][value]);
                option.textContent = jsonValueArray[i][value];
                console.log(jsonValueArray[i][value]);
                console.log(JSON.parse(sessionStorage.getItem('orders'))[index][sessionKey]);
                if(jsonValueArray[i][value] === JSON.parse(sessionStorage.getItem('orders'))[index][sessionKey]) {
                    option.setAttribute("selected", true);
                }
            } else {
                option.setAttribute("value", jsonValueArray[i]);
                option.textContent = jsonValueArray[i];
                if(jsonValueArray[i] === JSON.parse(sessionStorage.getItem('orders'))[index][sessionKey]) {
                    option.setAttribute("selected", true);
                }
            }
            select.appendChild(option);
        }

        item.appendChild(select);

        const feedbackElement = document.createElement("div");
        feedbackElement.classList.add("invalid-input", "d-none", feedbackName);
        feedbackElement.textContent = feedback;

        item.appendChild(feedbackElement);

        place.appendChild(item);
    }
}