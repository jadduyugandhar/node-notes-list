const fs = require('fs');
const chalk = require('chalk');

const readNote = title => {
    const notes = loadNotes();
    const getNote = notes.find( note => note.title === title);
    if(!getNote){
        console.log(chalk.red('No note found.!'));
    } else {
        console.log(chalk.bgGreen(getNote.title));
        console.log(getNote.body);
    }
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.find(note => note.title === title);

    if (duplicateNotes) {
        console.log(chalk.red("Title alreday exist.!"));
    } else {
        notes.push({ title: title, body: body});
        saveNotes(notes);
        console.log(chalk.green("Notes added successfuly.!"));
    }
    
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json');
        const dataJSON = notesBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJson);
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title);
    if (newNotes.length < notes.length) {
        saveNotes(newNotes);
        console.log(chalk.green(`${title} Removed successfuly.`))
    } else {
        console.log(chalk.red(`${title} not found.`));
    }
    
}

const notesList = () => {
    const notes = loadNotes();
    console.log(chalk.bgGreen('Your notes..'));
    notes.forEach(note => {
        console.log(note.title)
    });
}

module.exports = {
    addNotes: addNotes, 
    removeNotes: removeNotes,
    notesList: notesList,
    readNote: readNote
}
