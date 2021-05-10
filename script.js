const url = "https://randomuser.me/api?results=50";
const cardContainer = document.querySelector(".card-live-users");
const search = document.querySelector(".card-live-nav-input");
let users;

getDatas()
.then((innerUsers) => {
    users = innerUsers;
    ShowUI();
})

async function getDatas(){
    let users = await fetch(url);
    let usersJSON = await users.json();

    return usersJSON.results;
}

function ShowUI(data){
    let html = "";
    users.forEach((user) => {
        html += createCard(user,data);
        cardContainer.innerHTML = html;
    })
}

function createCard(user, data){
    let card = "";
    let fullname = (user.name.first + " " + user.name.last).toLowerCase();
    let city = user.location.city.toLowerCase();
    let country = user.location.country.toLowerCase();

    if(data){
        data = data.toLowerCase();
        if(fullname.includes(data) || city.includes(data) || country.includes(data)){
            card = `
            <div class="user">
                <img src="${user.picture.medium}" alt="thumbnail" class="user-img">
                <div class="user-info">
                    <h4 class="user-fullname">${user.name.first} ${user.name.last}</h4>
                    <div class="user-address">${user.location.city}, ${user.location.country}</div>
                </div>
            </div>
            `;
        }
    }else{
        card = `
        <div class="user">
            <img src="${user.picture.medium}" alt="thumbnail" class="user-img">
            <div class="user-info">
                <h4 class="user-fullname">${user.name.first} ${user.name.last}</h4>
                <div class="user-address">${user.location.city}, ${user.location.country}</div>
            </div>
        </div>
        `;
    }

    return card;
}

search.addEventListener("keyup", (e) => {
    ShowUI(search.value);
})