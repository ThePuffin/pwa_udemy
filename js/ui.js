const contacts = document.querySelector(".contacts");

document.addEventListener("DOMContentLoaded", function () {
  var fab = document.querySelectorAll(".fixed-action-btn");
  var sidenav = document.querySelectorAll(".sidenav");
  var modals = document.querySelectorAll(".modal");

  M.Sidenav.init(sidenav);
  M.Modal.init(modals);
  M.FloatingActionButton.init(fab);
});

const renderContacts = (data, id) => {
  const html = `    
  <li class="collection-item avatar contact" data-id=${id}>
  <img src='${data.avatar}' alt='' class='circle'>
    Name: <span class="name">${data.first_name} ${data.last_name}</span>
    <p>Email :<span class="email">${data.email}</span></p>
  </li>`;
  contacts.innerHTML += html;
};

const removeContact = (id) => {
  const contact = document.querySelector(`.contact[data-id=${id}]`);
  contact.remove();
};

const updateContact = (data, id) => {
  console.log(data);
  const contact = document.querySelector(`.contact[data-id='${id}']`);
  contact.querySelector(".name").innerHTML = data.name;
  contact.querySelector(".phone").innerHTML = data.phone;
  const textFavorite = data.favorite ? "star" : "star_border";
  contact.querySelector(".fav").textContent = textFavorite;
};
