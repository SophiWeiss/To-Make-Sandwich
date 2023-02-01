function checkInput () {
  
  let inputValue = document.getElementById("textInput").value;
  
  if (inputValue.trim().length === 0) {
    alert("Please enter at least something🤍")
    
  }
  
  else {

    let ul = document.getElementById("ulOfTasks");
    let li = document.createElement("li");
    let currentTime = new Date().toLocaleString();
    li.appendChild(document.createTextNode(inputValue + " (" + currentTime + ")"));
    ul.appendChild(li);

    document.getElementById("textInput").value = "";
    
  }
  
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});