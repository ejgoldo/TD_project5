// global variables
const randomUrl = 'https://randomuser.me/api/?nat=us&results=12'; 
// random user api down - move url below above once the random user api is working again
const treehouseUrl = 'https://fsjs-public-api-backup.herokuapp.com/api'; 

const searchContainer = document.querySelector('.search-container');
const modalBtns = document.getElementsByClassName('modal-btn-container');
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
        clickCard(data.results)

        searchUsersForm();
        submitSearch();
    })

// functions
// // fetch function
function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

// // search functions 
function searchUsersForm(){
    const html = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;

    searchContainer.innerHTML = html;
}

function usingSearch(e){
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');
    const siValue = searchInput.value.toUpperCase();

    e.preventDefault();
    for(let i=0; i<cards.length; i++){
        let names = cards[i].getElementsByTagName('h3')[0];
        let namesContent = names.textContent;

        if(namesContent.toUpperCase().indexOf(siValue) > -1){
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        } 
    }
}

function submitSearch(){
    const submitButton = document.getElementById('search-submit');
    submitButton.addEventListener('click', (e) => {
        usingSearch(e);
    });
}



// // gnerate gallery of users
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


// modal window 

// // open and close functions
function clickCard(user){
    const cards = document.querySelectorAll('.card');
    for(let i=0; i<cards.length; i++){
        cards[i].addEventListener('click', () => {
            modalWindow(user, i);

            closeModal();
        });
    }
}

function closeModal(){
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
}

// // modal window creation
function modalWindow(user, i){
    const userDob = new Date(user[i].dob.date).toLocaleDateString();
    const html = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user[i].name.first} ${user[i].name.last}</h3>
                    <p class="modal-text">${user[i].email}</p>
                    <p class="modal-text cap">${user[i].location.city}, ${user[i].location.state}</p>
                    <hr>
                    <p class="modal-text">${user[i].cell}</p>
                    <p class="modal-text">${user[i].location.street.number} ${user[i].location.street.name} ${user[i].location.city}, ${user[i].location.state} ${user[i].location.postcode}</p>
                    <p class="modal-text">Birthday: ${userDob}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;

    modal.innerHTML = html;

    body.appendChild(modal);
    for(let j=0; j<modalBtns.length; j++){
        modalBtns[j].addEventListener('click', event => {
            if(event.target.id === "modal-next"){
                if(i === user.length - 1){
                    i=0;
                }
                modalWindow(user, i + 1);
                closeModal();
            } else if(event.target.id === "modal-prev"){
                if(i === 0){
                    i = user.length;
                }
                modalWindow(user, i - 1);
                closeModal();
            }
        });
    }
}