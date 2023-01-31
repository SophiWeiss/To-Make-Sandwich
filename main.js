document.querySelector('#button-push').onclick = function() {
  if (document.querySelector('#textInput').value.length === 0 || ' ') {
    alert("Please enter at least something🤍")
  }
}