import { test } from "./testdemo.js";

const test1 = new test();
if(test1.arr.length !== 0) {
    const noList = document.querySelector("no-list");
    noList.classList.add("d-none");
}