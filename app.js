const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes.js');
yargs.command({
    command: 'add',
    describe: 'Add Notes',
    builder: {
        title: {
            description: 'Notes Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Description of notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function({title, body}) {
        notes.addNotes(title, body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove notes',
    builder: {
        title: {
            description: 'Title which required remove notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: ({title}) => {
        notes.removeNotes(title);
    }
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        console.log("List notes !");
    }
})

yargs.command({
    command: 'read',
    describe: 'Read notes',
    builder: {
        title: {
            description: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler({title}) {
        notes.readNote(title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List Notes',
    handler() {
        notes.notesList();
    }
});

yargs.parse();