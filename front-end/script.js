function toggleForms() {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (signupForm.style.display === "none") {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }
}

function signup(event) {
  event.preventDefault();

  // Get input values
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const designation = document.getElementById("designation").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;

  // Create signup request body
  const signupData = {
    name: name,
    gender: gender,
    designation: designation,
    phoneNumber: phoneNumber,
    password: password,
  };

  // Make a POST request to the signup API
  fetch("http://localhost:8000/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle signup response
      if (data.success) {
        // Redirect to login page
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again.");
    });
}

function login(event) {
  event.preventDefault();

  // Get input values
  const phoneNumber = document.getElementById("loginPhoneNumber").value;
  const password = document.getElementById("loginPassword").value;

  // Create login request body
  const loginData = {
    phoneNumber: phoneNumber,
    password: password,
  };

  // Make a POST request to the login API
  fetch("http://localhost:8000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle login response
      if (data.success) {
        // Save access token in localStorage or session
        const accessToken = data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // Redirect to todo list page
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
      alert("An error occurred during login. Please try again.");
    });
}

function createTodo(event) {
  event.preventDefault();

  // Get input values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  // Get access token from localStorage or session
  const accessToken = localStorage.getItem("accessToken");

  // Create todo request body
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
      // Handle create todo response
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
      alert("An error occurred while creating the todo. Please try again.");
    });
}

function fetchTodoList(accessToken) {
  // Make a GET request to fetch the todo list
  fetch("http://localhost:8000/api/v1/todos", {
    headers: {
      Authorization: `${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle fetch todo list response
      if (data.success) {
        // Clear existing todo list
        const todoList = document.getElementById("todo-items");
        todoList.innerHTML = "";

        // Display user's todo list
        const todoItems = data.data;

        todoItems.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.title;
          todoList.appendChild(li);
        });
      } else {
        // Show error message
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "An error occurred while fetching the todo list. Please try again."
      );
    });
}

function updateTodoStatus(todoId, isDone) {
  // Get access token from localStorage or session
  const accessToken = localStorage.getItem("accessToken");

  // Create todo request body
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
      // Handle update todo response
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
      alert("An error occurred while updating the todo. Please try again.");
    });
}

function deleteTodoItem(todoId) {
  // Get access token from localStorage or session
  const accessToken = localStorage.getItem("accessToken");

  // Make a DELETE request to delete the todo item
  fetch(`http://localhost:8000/api/v1/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle delete todo response
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
      alert("An error occurred while deleting the todo. Please try again.");
    });
}

function fetchTodoList(accessToken) {
  // Make a GET request to fetch the todo list
  fetch("http://localhost:8000/api/v1/todos", {
    headers: {
      Authorization: `${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle fetch todo list response
      if (data.success) {
        // Clear existing todo list
        const todoList = document.getElementById("todo-items");
        todoList.innerHTML = "";

        // Display user's todo list
        const todoItems = data.data;

        todoItems.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.title;
          const description = document.createElement("div");
          description.textContent = item.description;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => deleteTodoItem(item.id));
          li.appendChild(deleteButton);

          const statusCheckbox = document.createElement("input");
          statusCheckbox.type = "checkbox";
          statusCheckbox.checked = item.is_done;
          statusCheckbox.addEventListener("change", (event) => {
            updateTodoStatus(item.id, event.target.checked);
          });
          li.appendChild(statusCheckbox);

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
        "An error occurred while fetching the todo list. Please try again."
      );
    });
}
