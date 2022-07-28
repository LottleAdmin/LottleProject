/*Initialisations*/
const numbers = [];
const numbersFinal = [];
var moreLucky = true;
var moreUnlucky = true;
var index = 0;
var lucky = 0;
var unlucky = 0;


/*draw() Function*/
function draw() {
    for (var i = 0; i < 47; i++) {
        numbers.push(i + 1);
    }

    while (moreLucky === true) {
        lucky = parseInt(window.prompt("Enter a lucky number from 1-47..."));
        if (numbers.includes(lucky) === true) {
            numbersFinal.push(lucky);
            numbers.splice(numbers.indexOf(lucky), 1);
        } else if (lucky < 1 || lucky > 47 || numbersFinal.includes(lucky) === true) {
            alert("Invalid number for lucky number!");
        } else {
            alert("Invalid type for lucky number!");
        }
        if (confirm("Click OK if you have more lucky numbers...\nOR\nClick Cancel to add unlucky numbers...") === true) {
            moreLucky = true;
        } else {
            moreLucky = false;
        }
    }

    while (moreUnlucky === true) {
        unlucky = parseInt(window.prompt("Enter an unlucky number from 1-47..."));
        if (numbers.includes(unlucky) === true) {
            numbers.splice(numbers.indexOf(unlucky), 1);
        } else if (unlucky < 1 || unlucky > 47 || unlucky >= 1 && unlucky <= 47 && numbers.includes(unlucky) === false) {
            alert("Invalid number for unlucky number!");
        } else {
            alert("Invalid type for unlucky number!");
        }
        if (confirm("Click OK if you have more unlucky numbers...\nOR\nClick Cancel to finish the draw...") === true) {
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
    document.getElementById("draw").innerHTML = numbersFinal;
}