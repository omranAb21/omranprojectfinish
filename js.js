

const users = [
    {
    
        "username": "Omran abo lil  ",
        "phone": "05489844",
        "email":"abolilomran25@gmail.com",
        "photo": "images/AVtar.png" 
    },
    {
        "id": "2235537",
        "username":"nera abu salah   "  ,
        "email":"nera @gmail.com",
        "phone": "0534534534",
           "photo": "images/Avtar.png"
    },
    {
       
        "username": "sara   ",
        "email":"ebroria@gmail.com",
        "phone": "0546876987",
        "photo": "images/Avtar.png"
    },

  
  ];
  
  const list = document.querySelector(".list");
  
  function loadContacts() {
    list.innerHTML = '';
    users.forEach((elem, ind) => {
        const item = document.createElement('li');
        item.className = "item";
        item.innerHTML = `
            <img src="${elem.photo}" alt="Contact Photo" style="width:50px;height:50px;">
            <span>${elem.username}</span>
            <button onclick="editContact(${ind})"><img src="images/add.png" ></button>
            <button onclick="showContactInfo(${ind})"><img src="images/information.png"></button>
            <button onclick="deleteContact(${ind})"><img src="images/delete (3).png" "></button>
        `;
        list.append(item);
    });
    updatePeopleCount();
  }
  
  function openPopup() {
    document.getElementById('popupTitle').innerText = 'Add Contact';
    document.getElementById('contactIndex').value = '';
    document.getElementById('inputUserName').value = '';
    document.getElementById('inputUserPhone').value = '';
    document.getElementById('inputUserPhoto').value = '';
    document.getElementById('myModal').style.display = 'flex';
  }
  
  function closeModal(event) {
    if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
        document.getElementById('myModal').style.display = 'none';
    }
  }
  
  function saveContact() {
    const index = document.getElementById('contactIndex').value;
    const name = document.getElementById('inputUserName').value;
    const phone = document.getElementById('inputUserPhone').value;
    const photoInput = document.getElementById('inputUserPhoto');
    let photo = '';
  
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photo = e.target.result;
            if (index === '') {
                users.push({ id: Date.now().toString(), username: name, phone: phone, photo: photo });
            } else {
                users[index] = { ...users[index], username: name, phone: phone, photo: photo };
            }
            closeModal({ target: document.getElementById('myModal') });
            loadContacts();
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        if (index === '') {
            users.push({ id: Date.now().toString(), username: name, phone: phone, photo: 'images/default.jpg' });
        } else {
            users[index] = { ...users[index], username: name, phone: phone };
        }
        closeModal({ target: document.getElementById('myModal') });
        loadContacts();
    }
  }
  
  function editContact(index) {
    document.getElementById('popupTitle').innerText = 'Edit Contact';
    document.getElementById('contactIndex').value = index;
    document.getElementById('inputUserName').value = users[index].username;
    document.getElementById('inputUserPhone').value = users[index].phone;
    document.getElementById('myModal').style.display = 'flex';
  }
  
  function deleteContact(index) {
    users.splice(index, 1);
    updatePeopleCount();
    loadContacts();
  }
  
  function deleteAllContacts() {
    users.length = 0;
    updatePeopleCount();
    loadContacts();
  }
  function searchContacts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(query) || 
        user.phone.includes(query) || 
        user.email.toLowerCase().includes(query)
    );
    list.innerHTML = '';
    filteredUsers.forEach((elem, ind) => {
        const item = document.createElement('li');
        item.className = "item";
        item.innerHTML = `
            <img src="${elem.photo}" alt="Contact Photo" style="width:50px;height:50px;">
            <span>${elem.username}</span>
            <button onclick="editContact(${ind})"><img src="images/add.png" ></button>
            <button onclick="showContactInfo(${ind})"><img src="images/information.png"></button>
            <button onclick="deleteContact(${ind})"><img src="images/delete (3).png" "></button>
        `;
        list.append(item);
    });
    updatePeopleCount();
}
  function showContactInfo(index) {
    const user = users[index];
    document.getElementById('infoName').textContent = `Name: ${user.username}`;
    document.getElementById('infoPhone').textContent = `Phone: ${user.phone}`;
    document.getElementById('infoAddress').textContent = `Address: ${user.address}`;
    document.getElementById('infoEmail').textContent = `Email: ${user.email}`;
    document.getElementById('infoModal').style.display = 'flex';
  }
  
  function closeInfoPopup() {
    document.getElementById('infoModal').style.display = 'none';
  }
  
  function updatePeopleCount() {
    const count = users.length;
    document.getElementById('peopleCount').textContent = `${count} People`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
  });
  