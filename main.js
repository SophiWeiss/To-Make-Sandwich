function checkInput () {
  
  let inputValue = document.getElementById("textInput").value;
  
  if (inputValue.trim().length === 0) {
    alert("(👉ﾟヮﾟ)👉 Please enter at least something")
    
  }
  
  else {

    let ul = document.getElementById("ulOfTasks");
    let li = document.createElement("li");
    
    //current time 
    let currentTime = new Date().toLocaleString();
    let currentTimeSpan = document.createElement("span");
    currentTimeSpan.style.fontSize = "11px";
    currentTimeSpan.style.color = "grey";
    currentTimeSpan.appendChild(document.createTextNode(" (" + currentTime + ")"));
    
    li.appendChild(document.createTextNode(inputValue));
    li.appendChild(currentTimeSpan);
    
    //edit button
    let editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));
    
    editButton.addEventListener("click", function() {
      let input = document.createElement("input");
      input.value = li.firstChild.nodeValue;
      // li.removeChild(li.firstChild);
      // li.insertBefore(input, li.firstChild);
      li.replaceChild(input, li.firstChild);
      editButton.remove()
      deleteButton.remove()
      currentTimeSpan.remove()
      
      let saveButton = document.createElement("button");
      saveButton.appendChild(document.createTextNode("Save"));
      saveButton.addEventListener("click", function() {
        let text = document.createTextNode(input.value);
        li.removeChild(input);
        li.insertBefore(text, li.firstChild);
        li.appendChild(editButton)
        li.appendChild(deleteButton)
        li.appendChild(currentTimeSpan)
        
        saveButton.remove()
        cancelButton.remove()
      });
      li.appendChild(saveButton);

      let cancelButton = document.createElement("button");
      cancelButton.appendChild(document.createTextNode("Cancel"));
      cancelButton.addEventListener("click", function() {
        let text = document.createTextNode(input.value);
        li.removeChild(input);
        li.insertBefore(text, li.firstChild);
        li.appendChild(editButton)
        li.appendChild(deleteButton)
        li.appendChild(currentTimeSpan)
        
        saveButton.remove()
        cancelButton.remove()

        input.value = 
      });
      li.appendChild(cancelButton);
    });
    
    li.appendChild(editButton);

    //delete button 
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    
    deleteButton.addEventListener("click", function() {
      ul.removeChild(li);
    });
    
    li.appendChild(deleteButton);

    
    ul.appendChild(li);

    document.getElementById("textInput").value = "";
    
  }
  
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});