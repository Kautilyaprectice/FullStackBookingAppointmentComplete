// scripts.js

const appointmentForm = document.getElementById('appointmentForm');
const userList = document.getElementById('userList');

// Function to fetch users from backend and display them
function fetchUsers() {
  axios.get('http://localhost:3000/users')
    .then((res) => {
      const users = res.data;
      userList.innerHTML = ''; // Clear existing list items

      users.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} - ${user.email} - ${(user.phone).toLocaleString()}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
          deleteUser(user.id);
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
          editUser(user);
        };

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        userList.appendChild(listItem);
      });
    })
    .catch(err => console.error(err));
}

// Function to submit form data
appointmentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(appointmentForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');

  axios.post('http://localhost:3000/users', { name, email, phone })
    .then((res) => {
      fetchUsers(); // Refresh user list after new user is added
      appointmentForm.reset(); // Clear form fields
    })
    .catch(err => console.error(err));
});

// Function to delete a user
function deleteUser(userId) {
  axios.delete(`http://localhost:3000/users/${userId}`)
    .then(() => {
      fetchUsers(); // Refresh user list after deletion
    })
    .catch(err => console.error(err));
}

// Function to edit user details (not implemented in this example)
function editUser(user) {
  // Implement edit functionality as per your requirements
  const name = prompt("Enter new name:", user.name);
  const email = prompt("Enter new email:", user.email);
  const phone = prompt("Enter new phone:", user.phone);

  const updatedUser = {
    name: name,
    email: email,
    phone: phone
  };

  axios.put(`http://localhost:3000/users/${user.id}`, updatedUser)
    .then(() => {
      fetchUsers(); // Refresh user list after editing
    })
    .catch(err => console.error(err));
}

// Fetch users when page loads
window.onload = fetchUsers;
