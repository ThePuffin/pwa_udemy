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
    Name: <span class="name">${data.name}</span>
    <p>Phone number :<span class="phone">${data.phone}</span></p>

    <div href="#!" class="secondary-content" data-id=${id} style= "text-align:right;">
      <i class="material-icons modal-trigger" style='cursor:pointer' href='#edit_contact_modal'>edit</i>
      <i class="material-icons fav" style='cursor:pointer'>${data.favorite ? "star" : "star_border"}</i>
      <i class="material-icons" style='cursor:pointer'>delete_outline</i>
    </div>
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
