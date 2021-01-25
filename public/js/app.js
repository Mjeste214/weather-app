var  weatherForm = document.querySelector('form');
var search =  document.querySelector('input');
var messageOne = document.querySelector('#message1');
var messageTwo = document.querySelector('#message2');
var image = document.querySelector('#weather_icon');


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    var location = search.value;
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('/weather?adress=' + location).then((response) => {
        response.json().then((data)=> {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.weather_descriptions[0];
                image.src = data.forecast.weather_icons[0];
            }
        })
    })
});