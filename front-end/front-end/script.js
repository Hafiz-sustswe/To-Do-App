// Function to toggle between sign-up and login forms
function toggleForms() {
  const registerForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (registerForm.classList.contains("hidden")) {
    // If sign-up form is hidden, show it and hide login form
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  } else {
    // If sign-up form is visible, hide it and show login form
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  }
}

// Function to handle user registration
function register(event) {
  event.preventDefault();

  // Get input values
  const fullName = document.getElementById("fullName").value;
  const gender = document.getElementById("gender").value;
  const role = document.getElementById("role").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;

  // Create registration data object
  const registerData = {
    fullName: fullName,
    gender: gender,
    role: role,
    phoneNumber: phoneNumber,
    password: password,
  };

  // Make a POST request to register user
  fetch("http://localhost:8000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Hide registration form and show login form
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
        
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while registering. Please try again.");
    });
}

// Function to handle user login
function login(event) {
  event.preventDefault();

  // Get input values
  const phoneNumber = document.getElementById("loginPhoneNumber").value;
  const password = document.getElementById("loginPassword").value;

  // Create login data object
  const loginData = {
    phoneNumber: phoneNumber,
    password: password,
  };

  // Make a POST request to login
  fetch("http://localhost:8000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Save access token in localStorage
        const accessToken = data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // Hide login form and show todo list
        document.getElementById("login-form").style.display = "none";
        document.getElementById("todo-list").style.display = "block";
      
        // Fetch and display user's todo list
        fetchTodoList(accessToken);
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while logging in. Please try again.");
    });
}

// Function to create a new todo
function createTodo(event) {
  event.preventDefault();

  // Get input values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  // Get access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Create todo data object
  const todoData = {
    title: title,
    description: description,
  };

  // Make a POST request to create a todo
  fetch("http://localhost:8000/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(todoData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Clear input fields
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        // Fetch and display updated todo list
        fetchTodoList(accessToken);
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while creating the todo. Please try again.");
    });
}

// Function to fetch and display the user's todo list
function fetchTodoList(accessToken) {
  // Make a GET request to fetch the todo list
  fetch("http://localhost:8000/api/v1/todos", {
    headers: {
      Authorization: `${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Clear existing todo list

       

        const todoList = document.getElementById("todo-items");
        todoList.innerHTML = "Tasks To Be Done :";

        // Display user's todo list
        const todoItems = data.data;
        let i = 1;
        todoItems.forEach((item) => {
          // Create list item for each todo
          
          const li = document.createElement("li");
          li.classList.add("todo-item");
          li.textContent = "Task " + i + " : " + item.title  + "    ";
          i = i+1 ;
          // Create description element
          const description = document.createElement("div");
          description.classList.add("todo-item-des"); 
          description.textContent = "Description : " + item.description + "    ";
          

          // Create edit button for each todo
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.classList.add("edit-button");
          editButton.addEventListener("click", () => editTodoItem(item.id));
          li.appendChild(editButton);

          // Create delete button for each todo
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("delete-button");
          deleteButton.addEventListener("click", () => deleteTodoItem(item.id));
          li.appendChild(deleteButton);

          // Create status checkbox for each todo
          const statusCheckbox = document.createElement("input");
          statusCheckbox.type = "checkbox";
          statusCheckbox.checked = item.is_done;
          statusCheckbox.addEventListener("change", (event) => {
            updateTodoStatus(item.id, event.target.checked);
          });
          li.appendChild(statusCheckbox);

          // Append todo item to the list
          todoList.appendChild(li);
          todoList.appendChild(description);


          
        });
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Something went wrong while fetching the todo list. Please try again."
      );
    });
}

// Function to update the status of a todo
function updateTodoStatus(todoId, isDone) {
  // Get access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Create todo data object
  const todoData = {
    is_done: isDone,
  };

  // Make a PATCH request to update the todo status
  fetch(`http://localhost:8000/api/v1/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(todoData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Fetch and display updated todo list
        fetchTodoList(accessToken);
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while updating the todo. Please try again.");
    });
}

// Function to delete a todo
function deleteTodoItem(todoId) {
  // Get access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Make a DELETE request to delete the todo
  fetch(`http://localhost:8000/api/v1/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Fetch and display updated todo list
        fetchTodoList(accessToken);
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while deleting the todo. Please try again.");
    });
}

// Function to edit a todo
function editTodoItem(todoId) {
  // Get access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Get the todo item element
  const todoItemElement = document.getElementById(todoId);

  // Get the title and description elements of the todo item
  const titleElement = todoItemElement.querySelector(".title");
  const descriptionElement = todoItemElement.querySelector(".description");

  // Get the current title and description values
  const currentTitle = titleElement.textContent;
  const currentDescription = descriptionElement.textContent;

  // Prompt the user to enter the new title and description
  const newTitle = prompt("Enter the new title:", currentTitle);
  const newDescription = prompt(
    "Enter the new description:",
    currentDescription
  );

  // If the user clicked Cancel or entered empty values, do nothing
  if (newTitle === null || newDescription === null || newTitle === "" || newDescription === "") {
    return;
  }

  // Create todo data object with the updated values
  const todoData = {
    title: newTitle,
    description: newDescription,
  };

  // Make a PATCH request to update the todo
  fetch(`http://localhost:8000/api/v1/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(todoData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Fetch and display updated todo list
        fetchTodoList(accessToken);
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong while updating the todo. Please try again.");
    });
}
