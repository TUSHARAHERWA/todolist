let arrObj1 = [];
let arrObj2 = [];
let check = localStorage.getItem("notes1");
if(check !== null)
showNotes();

let addBtn = document.getElementById("addButton");
let inputxt = document.getElementById("inputText");
let txtareas = document.getElementById("addTxtArea");

addBtn.addEventListener("click", function() {
  if(inputxt.value == '' || txtareas.value == '') {
    alert("your notes is empty");
  }
  else {
  let n1 = JSON.parse(localStorage.getItem("notes1"));
  let n2 = JSON.parse(localStorage.getItem("notes2"));

  if(n1 == null) {
    arrObj1 = [];
    arrObj2 = [];
  }
  else {
    arrObj1 = n1;
    arrObj2 = n2;
  }

    arrObj1.push(inputxt.value);
    arrObj2.push(txtareas.value);
    localStorage.setItem("notes1", JSON.stringify(arrObj1));
    localStorage.setItem("notes2", JSON.stringify(arrObj2));  
    txtareas.value = " ";
    inputxt.value = " ";
    showNotes();
}
});

let searchtxt = document.getElementById("Searchtxt");



function deleteNote(index) {
  let n1 = JSON.parse(localStorage.getItem("notes1"));
  let n2 = JSON.parse(localStorage.getItem("notes2"));
  arrObj1 = n1;
  arrObj2 = n2;
  arrObj1.splice(index, 1);
  arrObj2.splice(index, 1);
  localStorage.setItem("notes1", JSON.stringify(arrObj1));
  localStorage.setItem("notes2", JSON.stringify(arrObj2));  
  showNotes();
}

function editNote(index) {

  let n1 = JSON.parse(localStorage.getItem("notes1"));
  let n2 = JSON.parse(localStorage.getItem("notes2"));

  let currentTitleElement = n1[index];
  let currentNoteElement = n2[index];
  
  let newTitleElement = prompt("Enter new title" , currentTitleElement);
  if(newTitleElement == '') {
    alert("Please enter some text");
    editNote();
  }
  let newNoteELement = prompt("Enter new note", currentNoteElement);
  if(newNoteELement == '') {
    alert("Please enter some text");
    editNote();
  }
  if(newTitleElement != null && newNoteELement != null) {
    arrObj1[index] = newTitleElement;
    arrObj2[index] = newNoteELement;

    localStorage.setItem("notes1", JSON.stringify(arrObj1));
    localStorage.setItem("notes2", JSON.stringify(arrObj2));
    showNotes();
  }
}

function showNotes() {
  let n1 = JSON.parse(localStorage.getItem("notes1"));
  let n2 = JSON.parse(localStorage.getItem("notes2"));
  let html = "";
  n2.forEach(function (element, index) {
    let titleEle = n1[index]
    html += `
    <div id="mainResult">
    <div class="mainBox">
    <div class="mainBox2">
      <div class="bor">
        <p class ="boldTxt titleAndNote">TITLE<p>
        <p class ="boldTxt">${titleEle}</p>
        </div>
    </div>
    <div class="mainBox2">
    <div class="bor mainBox2">
        <p class ="boldTxt titleAndNote">NOTE</p>
        <div class="overFlowAuto">
        <p class ="boldTxt">${element}</p>
        </div>
    </div>
    </div>
    <div class="editDeleteNote">
       <input  onclick="editNote(${index})" class="deleteButton" type="button" value="Edit">
       <input id ="${index}"onclick="deleteNote(this.id)" class="deleteButton" type="button" value="Delete Note">
    </div>
    </div>
    </div>
      `;
  });
  let values = document.getElementById("outputCard");
  values.innerHTML = html;  
}