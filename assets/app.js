let userList = document.querySelector("ul");
let searchInput = document.querySelector("#searchInput");

let users = [];
let filteredUsers = [];
fetch('https://randomuser.me/api/?results=100')
.then(res => res.json())
.then(data => {
    users = data.results;
    fillUserList(users);
})

searchInput.addEventListener('keyup', function () {
    let searchValue = this.value.toLowerCase();
    let filteredData = users.filter(q => (q.name.first+' '+q.name.last).toLowerCase().includes(searchValue)
    || q.name.last.toLowerCase().includes(searchValue) || q.location.city.toLowerCase().includes(searchValue)
    || q.location.country.toLowerCase().includes(searchValue));
    fillUserList(filteredData);
    filteredUsers = filteredData;
});

const fillUserList = (data) => {
    userList.innerHTML = "";

    data.forEach(element => {
        var userLi = document.createElement('li');
        
        var userImg = document.createElement('img');
        userImg.src = element.picture.thumbnail;

        var userInfo = document.createElement("div");
        userInfo.classList.add("user-info");
        var userName = document.createElement("h4");
        userName.textContent = `${element.name.title}. ${element.name.first} ${element.name.last}`;
        var userLocation = document.createElement("span");
        userLocation.textContent = `${element.location.country}, ${element.location.city}`;
        userInfo.append(userName,userLocation);
        userLi.append(userImg,userInfo);
        userList.append(userLi);
    });
}