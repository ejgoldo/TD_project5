// global variables
const randomUrl = 'https://randomuser.me/api/?nat=us&results=12';
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');

// fetch function
/*
this fetch function separates code that would have cluttered the fetch api.
this is more readable and separates the respond to the actual implementation of the returned data from the API
*/
function fetchData(url){
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('An error occurred', error));
}

// fetch
fetchData(randomUrl)
    .then(data => {
        generateGallery(data.results)
    })

// functions
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function generateGallery(users){
    const html = users.map(data => {
        return `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="card-text">${data.email}</p>
                <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
            </div>
        </div>
        `
        });
    gallery.innerHTML = html.join('');
}