function checkInput () {
  
  let inputValue = document.getElementById("textInput").value;
  
  if (inputValue.trim().length === 0) {
    alert("Please enter at least something🤍")
    
  }
  
  else {

    let ul = document.getElementById("ulOfTasks");
    let li = document.createElement("li");
    let currentTime = new Date().toLocaleString();
    let currentTimeSpan = document.createElement("span");
    currentTimeSpan.style.fontSize = "11px";
    currentTimeSpan.style.color = "grey";
    currentTimeSpan.appendChild(document.createTextNode(" (" + currentTime + ")"));
    li.appendChild(document.createTextNode(inputValue));
    li.appendChild(currentTimeSpan);
    ul.appendChild(li);

    document.getElementById("textInput").value = "";
    
  }
  
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});