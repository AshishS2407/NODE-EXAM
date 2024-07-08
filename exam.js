
const readline = require("readline");

const patient = new Map();

const rl = readline.createInterface (
    input = process.stdin,
    output = process.stdout
)
    


function askCommand() {

    console.log("Welcome to Patient Records")
    console.log("Available commands: add,remove,search,update,print")
    rl.question("Enter a Command", function (command) {

        switch (command.trim().toLowerCase()) {
            case "add":
                addItemPrompt()
                break;
            case "remove":
                removeItemPrompt()
                break;
            case "search":
                searchItemPrompt()
                break;
            case "update":
                updateItemPrompt()
                break;
            case "print":
                printSummary()
                askCommand()
                break;
            default:
                console.log("Please enter a valid comment")
                askCommand()
        }
    })
}

function addItemPrompt(id, name, age, diagnosis) {
    rl.question("Enter Id:", function (id) {
        rl.question("Enter Name:", function (name) {
            rl.question("Enter Age:", function (age) {
                rl.question("Enter Diagnosis:", function (diagnosis) {
                    addItem(id, name, parseInt(age), diagnosis)
                    askCommand()
                })
            })
        })
    })
}

function addItem(id, name, age, diagnosis) {
    if (patient.has(id)) {
        console.log(`${id} already exists`)
    } else {
        patient.set(id, { name, age, diagnosis })
        console.log(`Patient with Id ${id} added`)
    }
}

function removeItemPrompt(id) {
    rl.question("Enter Id to remove:", function (id) {
        removeItem(id)
        askCommand()
    })
}


function removeItem(id) {
    if (patient.has(id)) {
        patient.delete(id)
        console.log(`${id} deleted`)
    } else {
        console.log("id doesn't exist")
    }
}

function searchItemPrompt() {
    rl.question("Enter a search term", function (searchTerm) {
        searchItem(searchTerm)
        askCommand()
    })
}


function searchItem(searchTerm) {
    const results = [];
    for (const [id, item] of patient) {
        if (id.includes(searchTerm) || item.name.includes(searchTerm) || item.diagnosis.includes(searchTerm)) {
            results.push({ id,...item })
        }
    }
    if (results.length > 0) {
        console.log(`Results`, results)
    } else {
        console.log("Invalid Search Term")
    }
}



function updateItemPrompt(){
    rl.question("Enter patient id: ", function(id){
        rl.question("Enter patient name: ", function(newName){
            rl.question("Enter patient age: ", function(newAge){
                rl.question("Enter patient's diagnosis:", function(newDiagnosis){
                    updateItem(id, newName, newAge ? parseInt(newAge) : undefined, newDiagnosis );
                    askCommand();
                });
            });
        });
    });
}


function updateItem(id, newName, newAge, newDiagnosis){
    if(patient.has(id)){
        const item = patient.get(id);
        item.name = newName || item.name;
        item.age = newAge !== undefined ? newAge : item.age;
        item.diagnosis =newDiagnosis||item.diagnosis;
        patient.set(id,item);
        console.log(`Patient with ID ${id} updated.`);
    } else {
        console.log(`Error: Patient with ID ${id} not found.`);
    }

}

function printSummary() {

    if (patient.size > 0) {
        console.log("Patient Summary")
        for (const [id, item] of patient) {
            console.log(`Id: ${id}`, `Name: ${item.name}`, `Age: ${item.age}`, `Diagnosis : ${item.diagnosis}`)
        }
    } else {
        console.log("Invalid Id")
    }
}

askCommand();