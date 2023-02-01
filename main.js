document.querySelector('#button-push').onclick = function() {
  
  let inputValue = document.getElementById("textInput").value;
  
  if (inputValue.trim().length === 0) {
    alert("Please enter at least something🤍")
    
  }
  
  else {

    let ul = document.getElementById("ulOfTasks");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(inputValue));
    ul.appendChild(li);

    document.getElementById("textInput").value = "";
    
  }
}