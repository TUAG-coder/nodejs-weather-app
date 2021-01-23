// THIS IS THE CLIENT SIDE JS FILE //


console.log("Client side JS is running");  // this will be visble in the console of the webpage

/*
fetch("http://localhost:3000/weather?address=Lucknow").then((response) => {
    response.json().then((data) => {
        if (data.Error) {
            return console.log(data.Error);
        }
        console.log(data);
    });
});
*/

const weatherForm = document.querySelector('form');
const searched = document.querySelector('input');

const lineOne = document.querySelector("#line-1");
const lineTwo = document.querySelector("#line-2");
const lineThree = document.querySelector("#line-3");

weatherForm.addEventListener('submit', (event) => {   
    event.preventDefault();        // to prevent our form from reloading the page instantly

    const location = searched.value;    // will give us the location we have typed in the search box

    lineOne.textContent = 'Loading...';
    lineTwo.textContent = '';
    lineThree.textContent = '';

    // fetch('http://localhost:3000/weather?address=' + location)      (this command was there only for localhost)

    fetch('/weather?address=' + location).then((response) => {   // we use then() method on return value from "fetch"
    response.json().then((data) => {
        if (data.Error) {                     // this object is being sent from app.js
            lineOne.textContent = data.Error;
            lineTwo.textContent = '';
            lineThree.textContent = '';
        }
        else {
            lineOne.textContent = data.Location;
            lineTwo.textContent = data.forecastData.Temperature;
            lineThree.textContent = 'Rel. Humidity: ' + data.forecastData.Relative_Humidity;
        }
    });
});
})
