const list = document.querySelector('#list');

if (sessionStorage.length !== 1) {
    document.querySelector('.no-list').classList.add("d-none");
    list.classList.remove('d-none');
}

let row = "";

row += "<tr><th>P.O. Number</th><th>Date</th><th>Product(s)</th><th>Vendor</th><th>Ship To</th></tr>";

let keys = Object.keys(sessionStorage);
for (let key of keys) {
    if (key !== "IsThisFirstTime_Log_From_LiveServer") {
        console.log(typeof JSON.parse(sessionStorage.getItem(key)));
        console.log(JSON.parse(sessionStorage.getItem(key))[0].date);
        row += "<tr><td>" + key + "</td><td>" + JSON.parse(sessionStorage.getItem(key))[0].date + "</td>"

        for(let i = 0; i < JSON.parse(sessionStorage.getItem(key))[0].nameArray.length; i++) {
            row += "<td class='block'>" + JSON.parse(sessionStorage.getItem(key))[0].nameArray[i] + "</td>"
        }
        
        row += "<td>" + JSON.parse(sessionStorage.getItem(key))[0].vendor + "</td><td>" + JSON.parse(sessionStorage.getItem(key))[0].shipTo + "</td></tr>"
    }
}

list.innerHTML = row;