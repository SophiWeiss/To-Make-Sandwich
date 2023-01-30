let myNodelist = document.getElementsByTagName("list");
let i;
for (i = 0; i < myNodelist.length; i++) {
  let button = document.createElement('button');
  let text = document.createTextNode('\u00d7');
  button.className = 'close';
  button.appendChild(text)
  myNodelist[i].appendChild(button);
}


