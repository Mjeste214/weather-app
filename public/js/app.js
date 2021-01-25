var  weatherForm = document.querySelector('form');
var search =  document.querySelector('input');
var messageOne = document.querySelector('#message1');
var messageTwo = document.querySelector('#message2');


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    var location = search.value;
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('http://localhost:3000/weather?adress=' + location).then((response) => {
        response.json().then((data)=> {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
});