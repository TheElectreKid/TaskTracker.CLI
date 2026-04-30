import fs from "fs";
//DATABASE SYSTEM

//Contains all the critical logic for handling interactions with the database
//Configuration of the database is set up inside 'config.json' at the root of the application's directory
//The database primarily interacts with its records inside 'database.json'

//==============================================================================================================
const db = {
    targetFile: null,
    database: null,
    configfile: null,
    currentID: null,


    // setDBFile(file) {
        


    //     if (!file) {
    //         throw Error("Database file does not exist!");
    //     }
    //     this.targetFile = file;
    //     console.log(`FILE LOADED! FILE IS SET TO ${file}`);
       
    // },

    setDBFile() {
        try {
            this.configfile = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
        }
        catch (err) {
            throw Error("config.json could not be read!");
        }

         this.targetFile = this.configfile.databasePath;

    },

    loadDB() {
        if (!this.targetFile) {
            throw Error("Database cannot be read!");
        }
        try {
            this.database = JSON.parse(fs.readFileSync(this.targetFile, 'utf-8'));
        } catch (err) {
            throw Error('Could not find database file!');
        }
        
        //A little verbose, but this is for the check for an empty database to set the first record's ID to 1
        this.currentID = Math.max(...this.database.map(records => records.id));
        if (this.currentID === -Infinity) {
            this.currentID = 1;
        }
        else {
            
            this.currentID++;
        }
        //console.log(`SET CURRENT ID TO: ${this.currentID}`);
        //console.log(`DATABASE LOADED!`);

        return this.database;
    }

}

//==============================================================================================================
const dbServices = {
    selectedDB: null,
    dataBuffer: null,

    updateID() {
        return db.currentID++;
    },
    
    selectDB(database) {
        if (!database) {
            throw Error("No database is selected!")

        }
        //console.log(`DATABASE SELECTED!`);
        this.selectedDB = database;
    },


    queryCREATE(queryData) {
        //Read database
        //Add check for whether selectedDB = null where it throws error if true.

        if (!this.selectedDB) {
            throw Error("No database is selected!")
        }

        if (queryData.description.trim() === "") {
            throw Error("Task description is empty!")
        }

        //Push data into database
        this.selectedDB.push(queryData);

        //Finalize and write
        try {
            fs.writeFileSync(db.targetFile, JSON.stringify(this.selectedDB, null, 2), 'utf-8');

        }
        catch (err) {
            console.log("Could not write to database!")
        }
        console.log(`Task added!`);

    },

    queryUPDATE(queryData) {
        //Code copied from queryADD, but I need it to overwrite rather than add a new one
        //Read database
        //Add check for whether selectedDB = null where it throws error if true.

        if (!this.selectedDB) {
            throw Error("No database is selected!");
        }
        
        if (isNaN(queryData.id)) {
            throw Error("No task ID selected!");
        }

        if (queryData.description.trim() === "") {
            throw Error("Task description is empty!");
        }

        const selectedData = this.selectedDB.find(records => records.id === queryData.id);
        if (!selectedData) {
            throw Error(`Could not find data! Did you check if it exists?`)
        }

        //Update and Overwrite Data
        

        selectedData.updatedAt = queryData.updatedAt;

        if (queryData.description) {
            selectedData.description = queryData.description;
        }

        if (queryData.status) {
            selectedData.status = queryData.status;
        }

        //Finalize and write
        try {
            fs.writeFileSync(db.targetFile, JSON.stringify(this.selectedDB, null, 2), 'utf-8');

        }
        catch (err) {
            console.log("Could not write to database!");
        }
        console.log(`Task Updated!`);
       
    },

    queryREAD(queryData) {
        if (!this.selectedDB) {
            throw Error("No database is selected!")
        }

        let selectedData = null;

        switch (queryData.statusToParse) {
            case "done":
                selectedData = this.selectedDB.filter(records => records.status === "Done");
                break;
            case "todo":
                selectedData = this.selectedDB.filter(records => records.status === "to-do");
                break;
            case "in-progress" :
                selectedData = this.selectedDB.filter(records => records.status === "In-progress");
                break;
            case undefined:
                selectedData = this.selectedDB;
                break;
            default:
                throw Error("Invalid argument!");
        }

        for (const record of selectedData) {
            console.log(`[${record.id}] ${record.description} - ${record.status} | ${record.updatedAt}`);
        }


    },

    queryDELETE(queryData) {

        //More copy pasted code
        if (!this.selectedDB) {
            throw Error("No database is selected!")
        }

        if (isNaN(queryData.id)) {
            throw Error("No task ID selected!");
        }
        

        const selectedData = this.selectedDB.find(records => records.id === queryData.id);

        if (!selectedData) {
            throw Error(`Could not find data! Did you check if it exists?`);
        }


        this.selectedDB = this.selectedDB.filter(records => records.id !== queryData.id);

        //Finalize and write
        try {
            fs.writeFileSync(db.targetFile, JSON.stringify(this.selectedDB, null, 2), 'utf-8');

        }
        catch (err) {
            console.log("Could not write to database!");
        }
        console.log(`DELETE on entry: ${queryData.id} SUCCESFUL!`);
        

    }


}

//==============================================================================================================
// const query = {
// Pass the data inside an object first before interaction with the database
//     id: 1,
//     name: 'John',
//     age: 24,
//     country: 'United States'
//

//==============================================================================================================

export {db, dbServices};

//TEST

// db.setDBFile();
// db.loadDB();
// dbServices.selectDB(db.database);
// dbServices.queryCREATE(query);