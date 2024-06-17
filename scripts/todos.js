"use strict"

window.onload=()=>{

    // checking the script is linked to html
    console.log("hello world!");

    // grabbing the dropdown from the html page to further work with it
    let userDropdown = document.querySelector("#userSelect");


    //when a option is picked from the userdropdown a function to display data will appear
    userDropdown.addEventListener("change", displayTask);

    //calling the function that puts information in dropdown
    displayUser();

}

let displayTask = async ()=>{

//grabbing the div where the results will go 
let displayUserTask = document.querySelector("#toDoList");

//fetching the data we called for through the link
let toDosByUser = await getTaskByUser();

let userDropdown = document.querySelector("#userSelect");

//reset the options
displayUserTask.innerHTML="";

toDosByUser.forEach((task)=>{
   
        displayUserTask.innerHTML += `
        <hr>
        Category: ${task.category}<br>
        Description: ${task.description}<br>
        Deadline: ${task.deadline}<br>
        Priority: ${task.priority}<br>
        Completed: ${task.completed}`
        
    
});

if(userDropdown.value === "0"){

    displayUserTask.innerHTML="";
}
   
console.log(userDropdown.value)
}

let displayUser = async ()=>{

    //grabbing dropdown from html
    let userDropdown = document.querySelector("#userSelect");

   
     
    //getting a hold of the data fetched to display
    let allToDos = await getAllUsers();

     //creating a default option to the dropwdown
     let defaultOption = document.createElement("option");
     defaultOption.value = "0";
     
     defaultOption.innerText = "----Select User----";
  
     userDropdown.appendChild(defaultOption);

     //here a loop is run to apply the names we need inside the dropdown 
    allToDos.forEach((user) => {

        //create the new option for the category we are on in the loop
        let newOption = document.createElement("option");

        //set the value for the option
        newOption.value = user.id;

        //set what the user sees 
        newOption.textContent = user.name;

        userDropdown.appendChild(newOption);


    })



}
//grabing the data needed to add to the dropdown as well as div
let getAllUsers= async () =>{

    try {
        let response = await fetch("http://localhost:8083/api/users");
        let list = await response.json();

        return list;
        
    } catch (err) {
        console.log("Attempt not working")
        throw new Error(err)
    }

}

let getTaskByUser = async ()=>{

    let userDropdown = document.querySelector("#userSelect").value
        try {
        let response = await fetch("http://localhost:8083/api/todos/byuser/"+ userDropdown);
        let list = await response.json();

        return list;
        
    } catch (err) {
        console.log("Attempt not working")
        throw new Error(err)
    }

}

