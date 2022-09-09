let userList = document.querySelector("ul");
let searchInput = document.querySelector("#searchInput");


let users = [];
let filteredUsers = [];

fetch('https://randomuser.me/api/?results=100')
.then(res => res.json())
.then(data => {
    users = data.results;
    FillUser(users);
})

searchInput.addEventListener("input",function(e){
    var searchValue = e.target.value.toLowerCase();
    filteredUsers = users.filter((x)=>(x.name.first+" "+x.name.last).toLowerCase().includes(searchValue)
    || x.name.last.toLowerCase().includes(searchValue) || x.location.city.toLowerCase().includes(searchValue))
    FillUser(filteredUsers);
});



function FillUser(data){
    userList.innerHTML = "";
    data.forEach(user => {
        let userLi = document.createElement('li');
        let userImage = document.createElement("img");
        userImage.src = user.picture.thumbnail;

        var userInfo = document.createElement("div");
        userInfo.classList.add("user-info");
        userName = document.createElement("h4");
        userName.textContent = `${user.name.title}. ${user.name.first} ${user.name.last}`;
        userLocation = document.createElement("span");
        userLocation.textContent = `${user.location.country}, ${user.location.city}`;
        userInfo.append(userName,userLocation);
        userLi.append(userImage,userInfo);
        userList.append(userLi);
    });
  
}