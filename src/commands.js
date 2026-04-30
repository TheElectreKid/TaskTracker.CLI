import {db, dbServices} from './db/databasesys.js';
const todayDate = new Date().toISOString();

//This contains the commands for the CLI, this only contains the first half of the logic.
//commands.js job is to package the arguments after the command inside an object called 'queryData'
//'queryData' is then passed into one of the methods inside the object dbServices imported from 'databasesys.js'

export default {
    add(...args) {
        //The description variable is for parsing strings with spaces
        const description = args.join(" ");
        const queryData = {
            id: db.currentID,
            description: description,
            status: 'to-do',
            createdAt: String(todayDate),
            updatedAt: String(todayDate)
            
        }
        dbServices.queryCREATE(queryData);
        dbServices.updateID();
    },
    update(...args) {
        //First paramteter is select ID, then ze next parameter must be next new string. Ex: >update 1 bananas
        const [selectedID, ...updateArgs] = args;
        const description = updateArgs.join(" ");

        const id = Number(selectedID);
        const queryData = {
            id: id,
            description: description,
            updatedAt: new Date().toISOString()
        }
        dbServices.queryUPDATE(queryData);
    },

    delete(...args) {
        const [selectedID] = args;
        const id = Number(selectedID);

        const queryData = {
            id: id
        }
        dbServices.queryDELETE(queryData);
    },

    "mark-in-progress"(...args) {
        const [selectedID] = args;
        const id = Number(selectedID);
        const queryData = {
            id: id,
            status: "In-progress",
            updatedAt: new Date().toISOString()
        }
        dbServices.queryUPDATE(queryData);
    },
    "mark-done"(...args) {
        const [selectedID] = args;
        const id = Number(selectedID);
        const queryData = {
            id: id,
            status: "Done",
            updatedAt: new Date().toISOString()
        }
        dbServices.queryUPDATE(queryData);
    },

    list(...args) {
        const [selectedStatus] = args;
        const queryData = {
            statusToParse: selectedStatus
        }
        dbServices.queryREAD(queryData);
    },

    exit(...args) {
        console.log("Thank you for using this tool! Exiting...")
        process.exit();
    },


    //Couldnt bother typing these out, had to get it generated lmao
help(...args) {
    console.log(`
        Commands:
        add <description>              - Add a new task
        update <id> <description>      - Update a task
        delete <id>                    - Delete a task
        mark-in-progress <id>          - Mark a task as in progress
        mark-done <id>                 - Mark a task as done
        list                           - List all tasks
        list done                      - List completed tasks
        list todo                      - List pending tasks
        list in-progress               - List tasks in progress
        exit                           - Exit the application
    `);
}
}



