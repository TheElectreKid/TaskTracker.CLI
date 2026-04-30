import readline from "readline";
import commands from './commands.js';
import {db, dbServices} from './db/databasesys.js';

//First initilization of the CLI, this is the real main program that is executed by 'index.js'
//This file sets up the CLI and its prompt to handle commands.
//It first sets up the database before then running the CLI's shell

//During operation, the commands are first tokenized into an array where the first keyword, which is the command itself,
//is parsed and matched to one of the functions inside commands.js. The function names inside the commands.js
//is the same as the entered command!


export function startApp() {
    //App start
    console.log("Task-Tracker.JS ver. 1.0.0");
    console.log("Type `help` to list out commands.")
    
    const tokens = [];
    const SHELL = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'task-tracker.cli>'
    })
    
    db.setDBFile();
    db.loadDB();
    dbServices.selectDB(db.database);
    SHELL.prompt();

    SHELL.on('line', (receivedLine) => {
        //tekonize the line firzt!
        tokens.length = 0;
        tokens.push(...receivedLine.trim().split(/\s+/));
        const [commandName, ...args] = tokens;

        //Check if ze command is valid, oderwize execute command?!
        if (commandName in commands && typeof commands[commandName] === 'function') {
            try {
                commands[commandName](...args);
            } catch (err) {
                console.log(`Error: ${err.message}`);
            }
            
        }
        else {
            console.log(`'${commandName}' is not a valid command!`);
        }

        
    })


}

