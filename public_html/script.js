/*Initialisations*/
var con = "";
var index = 0;
var lucky = 0;
var moreLucky = true;
var moreUnlucky = true;
var mysql = "";
var numbers = [];
var numbersFinal = [];
var unlucky = 0;
var userID = "";

/*draw() Function*/
function draw() {
    for (var i = 0; i < 47; i++) {
        numbers.push(i + 1);
    }
    while (moreLucky === true) {
        lucky = parseInt(window.prompt(`Enter a lucky number from 1-47...`));
        if (numbers.includes(lucky) === true) {
            numbersFinal.push(lucky);
            numbers.splice(numbers.indexOf(lucky), 1);
        } else if (lucky < 1 || lucky > 47 || numbersFinal.includes(lucky) === true) {
            alert(`${lucky} is an invalid number for lucky number!`);
        } else {
            alert(`${lucky} is an invalid type for lucky number!`);
        }
        if (confirm(`Click OK if you have more lucky numbers...\nOR\nClick Cancel to add unlucky numbers...`) === true) {
            moreLucky = true;
        } else {
            moreLucky = false;
        }
    }
    while (moreUnlucky === true) {
        unlucky = parseInt(window.prompt(`Enter an unlucky number from 1-47...`));
        if (numbers.includes(unlucky) === true) {
            numbers.splice(numbers.indexOf(unlucky), 1);
        } else if (unlucky < 1 || unlucky > 47 || unlucky >= 1 && unlucky <= 47 && numbers.includes(unlucky) === false) {
            alert(`${unlucky} is an invalid number for unlucky number!`);
        } else {
            alert(`${unlucky} is an invalid type for lucky number!`);
        }
        if (confirm(`Click OK if you have more unlucky numbers...\nOR\nClick Cancel to finish the draw...`) === true) {
            moreUnlucky = true;
        } else {
            moreUnlucky = false;
        }
    }
    while (numbersFinal.length < 6) {
        index = Math.floor(Math.random() * numbers.length);
        numbersFinal.push(numbers[index]);
        numbers.splice(index, 1);
    }
    if (confirm(`${numbersFinal}\n\nClick OK if you want to save this draw...\nOR\nClick Cancel to delete this draw...`) === true) {
        userID = window.prompt(`Enter your username...`);
        window.fetch(`http://localhost:3000/insertDraws?userID=${userID}&draw=${numbersFinal}`)
            .then(alert("SAVED"));
    }
}

/*history() Function*/
function history() {
    document.getElementById("btn").style.display = "none";
    userID = window.prompt(`Enter your username...`)
    window.fetch(`http://localhost:3000/selectDraws?userID=${userID}`)
        .then(urlRes => urlRes.json())
        .then(jsonRes => displayResponse(jsonRes));
}

/*displayResponse(response) Function*/
function displayResponse(response) {
    if (response.length > 0) {
        document.getElementById("draws").innerHTML = `${userID}<br />${response.map(arrayItem => arrayItem.draw).join("<br />")}`;
    }
    else {
        alert(`${userID} not found!`);
    }
}