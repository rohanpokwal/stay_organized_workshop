"use strict";

window.onload = () => {
    console.log("heh im inside your addAUser.js >:)");

    let createUserForm = document.querySelector("#createUserForm");
    createUserForm.addEventListener("submit", createAUser);

    // Toggle password visibility when checkbox changes
    let togglePasswordCheckbox = document.getElementById("togglePasswordCheckbox");
    togglePasswordCheckbox.addEventListener("change", () => {
        togglePasswordVisibility("password", togglePasswordCheckbox.checked);
        togglePasswordVisibility("retypePassword", togglePasswordCheckbox.checked);
    });
}

function togglePasswordVisibility(fieldId, show) {
    let field = document.getElementById(fieldId);
    if (show) {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

function checkPasswordMatch() {
    let password = document.getElementById("password").value;
    let retypePassword = document.getElementById("retypePassword").value;

    if (password !== retypePassword) {
        document.getElementById("retypePassword").setCustomValidity("Passwords must match");
    } else {
        document.getElementById("retypePassword").setCustomValidity("");
    }
}

let createAUser = async (event) => {
    event.preventDefault();

    checkPasswordMatch();

    let formData = new FormData(event.target);
    let formDataAsObject = Object.fromEntries(formData);

    console.log("Form data as object:", formDataAsObject);

    try {
        let response = await fetch("http://localhost:8083/api/users", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(formDataAsObject)
        });

        if (response.status === 403) {
            alert("Username is already in use. Please choose a different username.");
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to add user. Please try again later.");
        }

        // let newUser = await response.json();
        // console.log(newUser, "this should show up if i created a new user");

        // [ since we are adding/creating a user dont know if you guys wanna redirect when clicking "create user" either to the userpage or homepage ]
        // window.location.href = "./index.html";

    } catch (error) {
        console.log("Error occurred:", error);
        alert("An error occurred while adding the user. Please try again later.");
    }
}