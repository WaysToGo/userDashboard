const $sideNav = document.querySelector(".side-nav");
const $userDetail = document.querySelector(".user-detail");
const $searchField = document.querySelector(".search__input");
let userDataHtml = "";
let people = [];
//fetch data from local
fetch("people.json")
  .then(response => response.json())
  .then(data => {
    people = data.People;
    populateSideNav(people);
  });
//update user dashboard
let updateUserInfo = function(userName) {
  people.forEach(element => {
    if (element.name == userName) {
      let rating = "",
        likes = "",
        dislikes = "";

      for (let i = 1; i <= 5; i++) {
        if (i <= element.rating) {
          rating += `<svg class="heart__icon">
              <use href="./sprite.svg#icon-heart"></use>
            </svg>`;
        } else {
          rating += `<svg class="heart__icon">
              <use href="./sprite.svg#icon-heart-outlined"></use>
            </svg>`;
        }
      }
      for (let i = 0; i < element.Likes.length; i++) {
        likes += `<li class="list__item">${element.Likes[i]}</li>`;
      }
      for (let i = 0; i < element.Dislikes.length; i++) {
        dislikes += `<li class="list__item">${element.Dislikes[i]}</li>`;
      }

      $userDetail.innerHTML = `<div class="info">
          <div class="info__photo">
            <img
              src=${element.img}
              alt="user image"
              class="info__photo-photo"
            />
          </div>
          <div class="info__know">
            <div class="info__message">
              <button class="message-btn">Send Message</button>
            </div>
            <div class="info__rating">
              <div class="info__likes">
              ${rating}
              </div>
            </div>
          </div>
        </div>
        <div class="about">
          <p class="paragraph">
           ${element.Description}
          </p>

        </div>
        <div class="likes-dislikes">
          <div class="likes">
            <span class="likes-dislikes-title">Likes</span>
            <ul class="list">
            ${likes}
            </ul>
          </div>
          <div class="dislikes">
            <span class="likes-dislikes-title">Dislikes</span>
            <ul class="list">
            ${dislikes}
            </ul>
          </div>
        </div>`;
    }
  });
};
//remove adcive class
let removeActiveClass = function() {
  document.querySelectorAll(".side-nav__item--active").forEach(function(node) {
    node.classList.remove("side-nav__item--active");
  });
};
//populate the side nav with the data available
let populateSideNav = function(data) {
  data.forEach(element => {
    userDataHtml += `<li class="side-nav__item ">
          <a href="#" class="side-nav__link">
            <span>${element.name}</span>
          </a>
        </li>`;
  });
  $sideNav.innerHTML = userDataHtml;
};
//search filter
let searchUser = function(event) {
  userDataHtml = "";
  let updatedList;
  if (event.target.value == null || event.target.value == "") {
    populateSideNav(people);
  } else {
    updatedList = people.filter(a =>
      a.name.toLowerCase().includes(event.target.value)
    );
    populateSideNav(updatedList);
  }
};
//add event listnters
$sideNav.addEventListener("click", event => {
  event.stopPropagation();
  let userName;

  removeActiveClass();
  //on click of span
  if (event.target.nodeName == "SPAN") {
    event.target.parentNode.parentNode.classList.add("side-nav__item--active");
    userName = event.target.firstChild.nodeValue;
  }
  //on ckick of ancher tag
  if (event.target.nodeName == "A") {
    event.target.parentNode.classList.add("side-nav__item--active");
    userName = event.target.querySelector("span").innerText;
  }
  updateUserInfo(userName);
});
//on key change trigger search
$searchField.addEventListener("keyup", searchUser);
