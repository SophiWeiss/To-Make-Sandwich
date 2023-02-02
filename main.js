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

    const span = document.createElement('span')
    span.textContent = inputValue
    li.appendChild(span);
    li.appendChild(currentTimeSpan);

    
    //edit button
    let editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));

    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));

    deleteButton.addEventListener("click", function() {
      ul.removeChild(li);
    });

    //done function
    li.addEventListener("click", function() {
      if (li.firstElementChild.tagName !== 'INPUT') {
        if (span.style.textDecoration === "line-through") {
          span.style.textDecoration = "none";
          li.appendChild(editButton);
          deleteButton.style.borderRadius = "0 5px 5px 0";
        } else {
          span.style.textDecoration = "line-through";
          editButton.remove()
          deleteButton.style.borderRadius = "5px";
        }
      }
    });

    editButton.addEventListener("click", function() {
      let originalText = li.firstChild.firstChild.nodeValue;
      let input = document.createElement("input");
      input.value = originalText;
      li.replaceChild(input, li.firstChild);
      editButton.remove()
      deleteButton.remove()
      currentTimeSpan.remove()

      let saveButton = document.createElement("button");
      saveButton.appendChild(document.createTextNode("Save"));
      saveButton.addEventListener("click", function() {
        span.textContent = input.value
        li.removeChild(input);
        li.insertBefore(span, li.firstChild);
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.appendChild(currentTimeSpan)

        saveButton.remove()
        cancelButton.remove()
        li.click()
        li.click()
        li.click()
      });
      li.appendChild(saveButton);

      //style settings for saveButton
      saveButton.style.backgroundColor = "#d074d7";
      saveButton.style.color = "white";
      saveButton.style.padding = "5px 7px";
      saveButton.style.borderRadius = "5px 0 0 5px";
      saveButton.style.cursor = "pointer";
      saveButton.style.border = 'none'

      let cancelButton = document.createElement("button");
      cancelButton.appendChild(document.createTextNode("Cancel"));
      cancelButton.addEventListener("click", function() {
        li.replaceChild(span, input)
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.appendChild(currentTimeSpan)
        saveButton.remove()
        cancelButton.remove()
        li.click()
        li.click()
        li.click()
      });
      li.appendChild(cancelButton);
      
      //style settings for cancelButton
      cancelButton.style.backgroundColor = "#7e74d7";
      cancelButton.style.color = "white";
      cancelButton.style.padding = "5px 7px";
      cancelButton.style.borderRadius = "0 5px 5px 0";
      cancelButton.style.cursor = "pointer";
      cancelButton.style.border = 'none'
    });

    //appending two main buttons
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    ul.appendChild(li);

    document.getElementById("textInput").value = "";

    //style settings for buttons
    editButton.style.backgroundColor = "#d074d7";
    editButton.style.color = "white";
    editButton.style.padding = "5px 7px";
    editButton.style.borderRadius = "5px 0 0 5px";
    editButton.style.cursor = "pointer";
    editButton.style.border = 'none'
    editButton.style.float = "right";

    deleteButton.style.backgroundColor = "#7e74d7";
    deleteButton.style.color = "white";
    deleteButton.style.padding = "5px 7px";
    deleteButton.style.borderRadius = "0 5px 5px 0";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.border = 'none'
    deleteButton.style.float = "right";
    
  }
  
}

document.getElementById("textInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    document.getElementById("button-push").click();
  }
});