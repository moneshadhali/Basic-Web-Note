const noteContainer = document.getElementById("app");
const addNoteBttn = noteContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  noteContainer.insertBefore(noteElement, addNoteBttn);
});

addNoteBttn.addEventListener("click", () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem("userNotes") || "[]");
}

function saveNote(content) {
    localStorage.setItem("userNotes", JSON.stringify(content));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note"); //The textarea is associated with the note class (css)
    element.value = content;
    element.placeholder = "Empty note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you wish to delete the note?");
        if(doDelete){
            deleteNote(id, element);
        }
    });
    return element;
}


function addNote() {
    const allNotes = getNotes();
    const newNoteObj = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElement = createNoteElement(newNoteObj.id, newNoteObj.content);
    noteContainer.insertBefore(noteElement,addNoteBttn);

    allNotes.push(newNoteObj);
    saveNote(allNotes);
}


function updateNote(id, newContent) {
    const allNotes = getNotes();
    const targetNote = allNotes.filter((note) => note.id == id)[0];

    targetNote.content = newContent;
    saveNote(allNotes);
}

function deleteNote(id, element) {
    const allNotes = getNotes().filter((note) => note.id != id);
    saveNote(allNotes);
    noteContainer.removeChild(element);
}