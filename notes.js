const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return 'Your Notes';
}

const listNotes = () => {
    const notes = loadNotes();

    if (notes.length > 0) {

        console.log(chalk.green.inverse('Your Notes !'));
        notes.forEach((note) => console.log(note.title));
    } else {
        console.log(chalk.green.inverse('You don\'t have any notes'));
    }
}

const readNote = (title) => {
    const notes = loadNotes()

    const noteFound = notes.find((note) => note.title === title);

    if (noteFound) {
        console.log(chalk.green.inverse('Your Note !'));
        console.log(chalk.green.inverse(noteFound.title));
        console.log(chalk.green.inverse(noteFound.body));
    } else {
        console.log(chalk.red.inverse('Note not found !'));
    }
}

const addNote =  (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    });


    if (duplicateNotes.length === 0) {
        notes.push({
            title:title,
            body:body
        });

        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note title taken');
    }


}

const removeNote = (title) => {
    const notes = loadNotes();

    // const notesToKeep = notes.filter(function (note) {
    //     return note.title !== title
    // })

    const notesToKeep = notes.filter((note) => note.title !== title )

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }


}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote : readNote
}