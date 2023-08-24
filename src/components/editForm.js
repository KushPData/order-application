"use strict";
import { functionalities } from "./functionalities.js";
import { test } from "./testdemo.js"

const order = new functionalities();
// const test1 = new test();

const stakeholdersDetailsContainer = document.querySelector(".stakeholders-details-container");
order.makeDropdownList(stakeholdersDetailsContainer, "VendorList", "vendor-list", "Vendors: ", "VendorName", "vendor-feedback", "Please select a vendor!!!");
order.makeDropdownList(stakeholdersDetailsContainer, "ShipTo", "ship-to", "Ship To: ", "CompanyName", "ship-to-feedback", "Please select a ship to address!!!");

const logisticsContainer = document.querySelector(".logistics-details");
order.makeDropdownList(logisticsContainer, "DeliveryMethod", "delivery-method", "Delivery Method: ", "", "delivery-feedback", "Please select a delivery method!!!");
order.makeDropdownList(logisticsContainer, "PaymentTerms", "payment-terms", "Payment Terms: ", "", "payment-feedback", "Please select your payment terms!!!");
