const Employee = document.querySelector(".Employee")

const createNoteBtn = document.querySelector(".createNoteBtn")

const typeNoteEmp = document.querySelector(".typeNoteEmp")

const checkIcon = document.querySelector(".checkIcon")

const closeIcon = document.querySelector(".closeIcon")

let typeNoteTextarea = document.querySelector(".typeNoteTextarea")



addEventListeners();



function addEventListeners() {


    createNoteBtn.addEventListener("click", createNote)

    closeIcon.addEventListener("click", typeNoteClose)

    checkIcon.addEventListener("click", addNote)
    document.addEventListener("DOMContentLoaded", loadAllNotesUI)

}


function createNote() {

    if (typeNoteEmp.classList.contains("none")) {

        typeNoteEmp.classList.remove("none")
    }

}

function typeNoteClose(e) {
    typeNoteEmp.classList.add("none")


    e.target.nextElementSibling.value = ""
}


function addNote(e) {

    let NoteText = e.target.nextElementSibling.nextElementSibling.value



    if (NoteText.length != 0) {

        addNoteToUI(NoteText);
        addNoteToStorage(NoteText)
    }




}

function addNoteToUI(newNote) {
    let Note = document.createElement("div");
    let pre = document.createElement("pre");

    pre.textContent = newNote;

    Note.appendChild(pre)


    Note.className = "Note"
    Note.style.margin = margin();
    Note.style.transform = rotate();
    Note.style.backgroundColor = bgColor();


    Employee.appendChild(Note)

    typeNoteTextarea.value = " "
    typeNoteTextarea.focus()


    Note.addEventListener("mouseenter", () => {
        let rotateValue = rotate()
        Note.style.transform = `${rotateValue} scale(1.1)`
        Note.style.zIndex = "85"

    })
    Note.addEventListener("mouseleave", () => {
        let rotateValue = rotate()
        Note.style.transform = `${rotateValue} scale(1)`
        Note.style.zIndex = "1"

    })
    Note.addEventListener("dblclick", () => {
        Note.remove()

        deleteNoteFromStorage(Note)


    })

}

function addNoteToStorage(newNote) {


    notes = getNotesFromStorage();


    notes.push(newNote);


    localStorage.setItem("notes", JSON.stringify(notes))

}


function loadAllNotesUI() {



    let notes = getNotesFromStorage()


    notes.forEach(function(note) {


        addNoteToUI(note);


    })



}



function margin() {

    var random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"]

    return random_margin[Math.floor(Math.random() * random_margin.length)]

}

function rotate() {

    var random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"]


    return random_rotate[Math.floor(Math.random() * random_rotate.length)]

}

function bgColor() {

    var random_bgColor = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#FF6000", " rgb(54, 121, 184)", "#04e022", "#bc83e6", "rgb(248, 80, 105)", "lightblue"];


    var index = Math.floor(Math.random() * random_bgColor.length)


    let response = random_bgColor[index]

    console.log("Dönen renk degeri : ", response)
    return response

}


function getNotesFromStorage() {

    let notes;


    if (localStorage.getItem("notes") == null) {


        notes = []

    } else {

        notes = JSON.parse(localStorage.getItem("notes"))

    }

    return notes


}



function deleteNoteFromStorage(Note) {


    let notes = getNotesFromStorage()


    let NoteText = Note.firstElementChild.textContent


    console.log(NoteText)


    notes.forEach(function(el, index) {

        if (el == NoteText) {
            notes.splice(index, 1)
            console.log("SİLİNDİ", el)

        }


    })
    localStorage.setItem("notes", JSON.stringify(notes))



}