const fs = require('fs');
const notes = require('./notes');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

//fs.writeFileSync('notes.txt','This file was created by node');
// fs.appendFileSync('notes.txt', '\n Dinushan Jayakody');
// fs.appendFileSync('notes.txt', '\n Notes App');

yargs.command({
    command:'add',
    describe : 'Adding a new note !!',
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        },
        body: {
            describe: 'Note body',
            demandOption : true,
            type : 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command : 'remove',
    describe : 'Remove a note by title',
    handler : function (argv) {
        notes.removeNote(argv.title);
        console.log('Removing a note');
    }
});

yargs.command({
    command: 'list',
    describe: 'List all the nodes',
    handler : function () {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note by title',
    handler : function (argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();
// console.log(yargs.argv);