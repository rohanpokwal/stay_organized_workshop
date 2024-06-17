"use strict";

window.onload = () => {
  //populate userDropdown
  populateUserDropdown();
  populateCategoriesDropdown();

  //Create User
  //get hold of create form off the html page
  let addUserForm = document.querySelector("#addUserForm");

  //listen for the event
  addUserForm.addEventListener("submit", addAnewToDo);
};

//this async function will populate the users
const populateUserDropdown = async () => {
  const userDropdown = document.querySelector("#userDropdown");

  //get the data from api
  let response = await fetch(`http://localhost:8083/api/users`);

  //turn response to json so we can work with it
  let users = await response.json();

  console.log(users);

  users.forEach((user) => {
    let newOption = document.createElement("option");
    newOption.textContent = user.name;
    newOption.value = user.id;
    userDropdown.appendChild(newOption);
  });
};

//this async function will populate the categories
const populateCategoriesDropdown = async () => {
  const categoriesDropdown = document.querySelector("#categoryDropdown");

  //get the data from api
  let response = await fetch(`http://localhost:8083/api/categories`);

  //turn response to json so we can work with it
  let categories = await response.json();

  console.log(categories);

  categories.forEach((category) => {
    let newOption = document.createElement("option");
    newOption.textContent = category.name;

    categoriesDropdown.appendChild(newOption);
  });
};

const addAnewToDo = async (event) => {
  //calling preventDefault to keep the page from reloading
  event.preventDefault();

  //Get hold of Result Page
  let result = document.querySelector("#result");

  //generating the new data object
  //whenever event is activated by user meaing that user clicks the "add to list" button, it will create an object using the value from the user
  let formData = new FormData(event.target);

  //generating a Javascript object from the formdata object created above
  let formDataAsObject = Object.fromEntries(formData);

  try {
    //making a fetch POST request to add a user in the api
    let response = await fetch(`http://localhost:8083/api/todos`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formDataAsObject),
    });

    //turning the response into something that we can work with
    let newList = await response.json();

    console.log(newList);

    //Display the Result
    result.innerHTML = `<p>You have successfully added the following </p> 
    <p>Category: ${newList.category}</p>
    <p>Description: ${newList.description}</p>
    <p>Deadline: ${newList.deadline}</p>
    <p>Priority: ${newList.priority}</p> 
    `;
  } catch {
    //what the hell happend
    result.innerHTML = "Hang on something went wrong";
  }
};
