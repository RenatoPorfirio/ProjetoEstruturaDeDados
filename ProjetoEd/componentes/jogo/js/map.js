var tab = document.getElementById("map");
var tr = document.createElement("tr");
tr.appendChild(document.createElement("th").appendChild(document.createTextNode(".")));

for(let i = 48; i < 58; i++){
let txt = String.fromCharCode(i);
  let th = document.createElement("th");
  th.innerHTML = txt;
  tr.appendChild(th);
 }
tab.appendChild(tr);

for(let i = 97; i < 107; i++){
  let txt = String.fromCharCode(i);
  tr = document.createElement("tr");
  let line = document.createTextNode(txt);
  let label = document.createElement("th");
  label.appendChild(line);
  tr.appendChild(label);
  for(let j = 0; j < 10; j++){
    let td = document.createElement("td");
    let box = "'" + txt + j + "'";
    let but = '<button type="button" class="butt" id=' + box + ' onclick="pushB(' + box + ')"><img class="img" src="../imagens/empty.png"/></button>';
    td.innerHTML = but;
    tr.appendChild(td);
  }
  tab.appendChild(tr);
}