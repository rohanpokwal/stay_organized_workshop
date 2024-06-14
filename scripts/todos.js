"use strict"

window.onload=()=>{

    // checking the script is linked to html
    console.log("hello world!");

    // grabbing the dropdown from the html page to further work with it
    let userDropdown = document.querySelector("#userSelect");


    //when a option is picked from the userdropdown a function to display data will appear
    userDropdown.addEventListener("change", displayTask);



}
let displayTask = async ()=>{

    //grabbing dropdown from html
    let userDropdown = document.querySelector("#userSelect");
    
    //getting a hold of the data fetched to display
    let allToDos = await getAllData();


    



}
//grabing the data needed to add to the dropdown as well as div
async function getAllData() {

    try {
        let response = await fetch("http://localhost:8083/api/todos");
        let list = await response.json();

        return list;
        
    } catch (err) {
        console.log("Attempt not working")
        throw new Error(err)
    }

}

