let addLogo= document.querySelector('#addLogo');
let addNoteText= document.querySelector('#addNoteText');
let textAreas= document.querySelector('#textAreas');
let crossNote= document.querySelector('#crossNote');
let title= document.querySelector('#title');
let content= document.querySelector('#content');
let impArr= localStorage.getItem('imp')==null?[]:JSON.parse(localStorage.getItem('imp'));
let pageNos= document.getElementById('pageNos');
let other = document.querySelector('#other');
let pin = document.querySelector('#pin');
let prevBtn = document.querySelector('#prev');
let nextBtn= document.querySelector('#next');
let notification = document.getElementById('notification');
let notifMssg = document.getElementById('notifMssg');
let notifCross = document.getElementById('notifCross');
let currentPage=1, totalPages=0;
let length=0, c=0;

showNotes();
updatePage();

addLogo.addEventListener('click',()=>{
    textAreas.classList.remove('noneDisp');
    crossNote.classList.remove('noneDisp');
    textAreas.classList.add('blockDisp');
    crossNote.classList.add('blockDisp');
    addLogo.classList.remove('visible');
    addLogo.classList.add('hidden');
    addNoteText.classList.remove('visible');
    addNoteText.classList.add('hidden');
});

crossNote.addEventListener('click',()=>{
    textAreas.classList.add('noneDisp');
    crossNote.classList.add('noneDisp');
    textAreas.classList.remove('blockDisp');
    crossNote.classList.remove('blockDisp');
    title.value="";
    content.value="";
    addLogo.classList.add('visible');
    addLogo.classList.remove('hidden');
    addNoteText.classList.add('visible');
    addNoteText.classList.remove('hidden');
});

//Function to add notes.

let add = document.querySelector('#add');
add.addEventListener('click', function (e) {

    addLogo.classList.add('visible');
    addLogo.classList.remove('hidden');
    addNoteText.classList.add('visible');
    addNoteText.classList.remove('hidden');

    let titles = localStorage.getItem('titles');
    if (titles == null) {
        titlesArr = [];
    }
    else {
        titlesArr = JSON.parse(titles);
    }
    titlesArr.unshift(title.value);
    localStorage.setItem('titles', JSON.stringify(titlesArr));

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }
    notesArr.unshift(content.value);
    impArr.unshift(0);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    localStorage.setItem('imp',JSON.stringify(impArr));

    
    textAreas.classList.add('noneDisp');
    crossNote.classList.add('noneDisp');
    textAreas.classList.remove('blockDisp');
    crossNote.classList.remove('blockDisp');
    title.value="";
    content.value="";
    currentPage=1;
    notification.style.display="flex";
    notifMssg.innerHTML="Note added successfully..!";
    showNotes();
    updatePage();
});

//Function to delete notes.

function delFunc(index) {
    
    let mark = localStorage.getItem('imp');
    if (mark == null) {
        impArr = [];
    }
    else {
        impArr = JSON.parse(mark);
    }

    let titles = localStorage.getItem('titles');
    if (titles == null) {
        titlesArr = [];
    }
    else {
        titlesArr = JSON.parse(titles);
    }
    titlesArr.splice(index, 1);
    notesArr.splice(index, 1);
    impArr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    localStorage.setItem('titles', JSON.stringify(titlesArr));
    localStorage.setItem('imp', JSON.stringify(impArr));
    notification.style.display="flex";
    notifMssg.innerHTML="Note deleted successfully..!";
    showNotes();
    updatePage();
}

//Function to pin a note.

function markImp(index1) {
    let mark = localStorage.getItem('imp');
    if (mark == null) {
        impArr = [];
    }
    else {
        impArr = JSON.parse(mark);
    }
    i1 = Number(index1) + 6000;
    document.getElementById(index1).classList.toggle('imp');
    if (impArr[i1] == undefined || impArr[i1] == 0 || impArr[i1] == null) 
        impArr[i1] = 1;
    else
        impArr[i1] = 0;
    localStorage.setItem('imp', JSON.stringify(impArr));
    showNotes();
}

//Search note.

let search = document.querySelector('#searchNote');
search.addEventListener('input', function () {
    let card = document.getElementsByClassName('noteCards');
    let val = search.value;
    Array.from(card).forEach(function (element) {
        let txt1 = element.getElementsByClassName('nthead')[0].innerText.toLowerCase();
        let txt2 = element.getElementsByClassName('para')[0].innerText.toLowerCase();
        if (txt1.includes(val.toLowerCase()) || txt2.includes(val.toLowerCase())) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});

//Implementing Pagination.

function updatePage(){
length=notesArr.length;
totalPages= Math.ceil(length/6);
let pageButtons="";
for(let i=1;i<=totalPages;i++){
    pageButtons+= `<div id="${i}" class="pgBtns">${i}</div>` 
}
pageNos.innerHTML=pageButtons;

//Handling page button click

Array.from(document.getElementsByClassName('pgBtns')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        currentPage=Number(e.target.id);
        markPageBtn();
        showNotes();
    })
})
markPageBtn();
}


prevBtn.addEventListener('click',()=>{
    currentPage!=1?currentPage-=1:currentPage=1;
    if(currentPage==1){
        notification.style.display="flex";
        notifMssg.innerHTML="You are on the first page..!";
    }
    markPageBtn();
    showNotes();
    search.value="";
})

nextBtn.addEventListener('click',()=>{
    currentPage!=totalPages?currentPage+=1:currentPage=totalPages;
    if(currentPage==totalPages){
        notification.style.display="flex";
        notifMssg.innerHTML="You are on the last page..!";
    }
    markPageBtn();
    showNotes();
    search.value="";
})


//Function to Display all notes.

function showNotes() {
    document.getElementsByClassName('menuLogo')[0].style.backgroundColor="red";
    document.getElementsByClassName('menuLogo')[1].style.backgroundColor="white";

    titles = localStorage.getItem('titles');
    if (titles == null) {
        titlesArr = [];
    }
    else {
        titlesArr = JSON.parse(titles);
    }

    notes = localStorage.getItem('notes');
    if (notes == null) {
        notesArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
    }

 

    let html = "",html1="";
    notesArr.forEach(function (element, index) {
        if(index<currentPage*6 && index>=(currentPage-1)*6){
        if(impArr[index]==1){
            html1 += `
                    <div class="noteCards" id="noteCards-${index}">
                    <h4 class="nthead">${titlesArr[index]}</h4>
                    <div class="para"><p>${element}</p></div>
                    <div class="noteEnd">
                    <button class="delbtn" id="${index}" onclick="delFunc(this.id)" class="delBtn"><i class="fas fa-trash"></i></button>
                    <button class="editNoteBtn" id="noteCards-${index}">EditNote</button>
                    <button class="star imp" id="${index - 6000}" onclick="markImp(this.id)"><i class="fa fa-thumb-tack"></i></button>
                    </div>
                    </div>
            `
        }

        else {
        html += `
                <div class="noteCards" id="noteCards-${index}">
                <h4 class="nthead">${titlesArr[index]}</h4>
                <div class="para"><p>${element}</p></div>
                <div class="noteEnd">
                <button class="delbtn" id="${index}" onclick="delFunc(this.id)" class="delBtn"><i class="fas fa-trash"></i></button>
                <button class="editNoteBtn" id="noteCards-${index}">EditNote</button>
                <button class="star imp" id="${index - 6000}" onclick="markImp(this.id)"><i class="fa fa-thumb-tack"></i></button>
                </div>
                </div>
        `
        }
    }
});

    if(html=="")
    other.innerHTML=`<div class="blankMssg">Notes get added here..</div>`;
    else
    other.innerHTML = html;

    if(html1=="")
    pin.innerHTML=`<div class="blankMssg">No pinned notes in this page to display..</div>`;
    else
    pin.innerHTML = html1;
     
    let mark1=localStorage.getItem('imp');
    if(mark1==null)
    mark2=[];
    else
    mark2=JSON.parse(mark1);
    mark2.forEach(function(element,index){
        if(index<currentPage*6 && index>=(currentPage-1)*6){
        let i2=String(index-6000);
        if(element==1)
        document.getElementById(i2).classList.toggle('imp');
    }
    });

    //Edit note.

    let editNote= document.querySelector('#editNote');

    Array.from(document.getElementsByClassName('editNoteBtn')).forEach((element,index)=>{
        element.addEventListener('click',()=>{
            position =Number(element.id.substr(10));
            let editNoteBox ="";
            editNoteBox=`
            <div id="editNoteHere">Edit Note Here</div>
            <div><textarea class="editTitle" rows="1">${titlesArr[position]}</textarea></div>
            <div><textarea class="editContent" rows="4">${notesArr[position]}</textarea></div>
            <button id="confirmChanges">Confirm Changes</button>
            `
            editNote.innerHTML=editNoteBox;
            makeChanges();
        })
    })
}

//Edit Note.

function makeChanges(){
let confirmChangesBtn= document.querySelector('#confirmChanges');
confirmChangesBtn.addEventListener('click',()=>{
    changedTitle=document.querySelector('.editTitle').value;
    changedContent= document.querySelector('.editContent').value;
    titlesArr[position]=changedTitle;
    notesArr[position]= changedContent;
    localStorage.setItem('titles',JSON.stringify(titlesArr));
    localStorage.setItem('notes',JSON.stringify(notesArr));
    editNote.innerHTML="";
    showNotes();
 })
}

document.getElementById('refresh').addEventListener('click',()=>{
    location.reload();
})

document.getElementById('allNotesMenu').addEventListener('click',()=>{
    document.getElementsByClassName('menuLogo')[0].style.backgroundColor="red";
    if(c==-1){
        location.reload();
        c=0;
    }
    else{
    currentPage=1;
    showNotes();
    }
})

document.getElementById('pinnedNotesMenu').addEventListener('click',()=>{
    document.getElementsByClassName('menuLogo')[0].style.backgroundColor="white";
    document.getElementsByClassName('menuLogo')[1].style.backgroundColor="red";
    showPinnedNotes();
})

//Function to display only the pinned notes.

function showPinnedNotes(){
    document.getElementsByClassName('menuLogo')[1].style.backgroundColor="red";
    document.getElementsByClassName('menuLogo')[0].style.backgroundColor="white";
    let html="";
    for(let i=0;i<impArr.length;i++){
        if(impArr[i]==1)
        html += `
                <div class="noteCards" id="noteCards-${i}">
                <h4 class="nthead">${titlesArr[i]}</h4>
                <div class="para"><p>${notesArr[i]}</p></div>
                <div class="noteEnd">
                <button class="delbtn" id="${i}" onclick="delFunc(this.id)" class="delBtn"><i class="fas fa-trash"></i></button>
                </div>
                </div>
        `
    }
    if(html==""){
        document.getElementById('mainBody').innerHTML=`
        <div id="pinHead">No Pinned Notes..!!</div>
        `;
        c=-1;
    }
    else{
    document.getElementById('mainBody').innerHTML=`
    <div id="pinHead" class="blankMssg">All Pinned Notes</div>
    <div id="displayPinnedNotes">${html}</div>
    `;
    c=-1;
    }
}

//To mark the page button of the current page.

function markPageBtn(){
        for(let i=1;i<=totalPages;i++){
            if(i==currentPage)
            document.getElementsByClassName('pgBtns')[i-1].style.backgroundColor="rgb(246, 145, 145)";
            else
            document.getElementsByClassName('pgBtns')[i-1].style.backgroundColor="rgb(244, 217, 202)";
        }
}

//Changing theme 

document.getElementById('theme').addEventListener('click',()=>{
    if(document.getElementById('theme').innerText=="Light"){
    document.body.style.backgroundImage="linear-gradient(rgb(240, 139, 102),white)";
    document.getElementById('theme').innerText="Dark";
    }
    else{
    document.body.style.backgroundImage="linear-gradient(rgb(246, 110, 100),black)";
    document.getElementById('theme').innerText="Light";
}
})

notifCross.addEventListener('click',()=>{
    notification.style.display="none";
})

