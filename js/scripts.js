// global variables
const randomUrl = 'https://fsjs-public-api-backup.herokuapp.com/api';
// random user api down - move url below above once the random user api is working again
const treehouseUrl = 'https://randomuser.me/api/?nat=us&results=12'; 

const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');

const body = document.querySelector('body');
const modal = document.createElement('DIV');

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

function modalWindow(user, i){
    const html = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}, ${data.location.state}</p>
                    <hr>
                    <p class="modal-text">${data.cell}</p>
                    <p class="modal-text">${data.location}</p>
                    <p class="modal-text">Birthday: ${data.date}</p>
                </div>
            </div>

            // IMPORTANT: Below is only for exceeds tasks 
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;

    modal.innerHTML = html;

    body.appendChild(modal);
}