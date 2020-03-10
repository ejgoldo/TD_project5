// global variables
const randomUrl = 'https://randomuser.me/api/?results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');

// fetch
fetch(randomUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })