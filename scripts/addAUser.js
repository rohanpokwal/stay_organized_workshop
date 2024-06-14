"use strict"

window.onload = () => {

    console.log("heh im inside your addAUser.js >:)");

    let createUserForm = document.querySelector("#createUserForm");
    createUserForm.addEventListener("submit", createAUser);
}

let createAUser = async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let formDataAsObject = Object.fromEntries(formData);
    
    console.log("Form data as object:", formDataAsObject);

    try {
        let response = await fetch("http://localhost:8083/api/users", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(formDataAsObject)
        });

        // let newUser = await response.json();
        // console.log(newUser, "this should show up if i created a new user");

        // Redirect to another page if needed
        // window.location.href = "./index.html";

    } catch (error) {
        console.log("Error occurred:", error);
    }
}
