// global variables
const randomUrl = 'https://randomuser.me/api/?nat=us&inc=picture,name,location,email&results=12';
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