const read = require('readline-sync')
const fs = require('fs')

while (true) {
    console.log("1. Add User");
    console.log("2. Update User");
    console.log("3. Delete User");
    console.log("4. Search User");
    console.log("5. Display all users");
    console.log("6. Search by Email");
    console.log("7. Exit");

    let option = read.question('Please select an option: ');
    switch (option) {
        case "1":
            addUser();
            break;
        case "2":
            updateUser();
            break;
        case "3":
            let userName = read.question('Enter the username to delete: ');
            var fileName = getFileName(userName);


            fs.unlinkSync(fileName)
            console.log("File removed",fileName);
            break;
        case "4":
            let userNamedisplay = read.question('Enter the username: ');
            var fileName = getFileName(userNamedisplay);
        
            var userText = fs.readFileSync(fileName, 'utf8');
            var user = JSON.parse(userText);
            console.log(user)
            break;
        case "5":
           
            var files=fs.readdirSync('./data1/')

        for(i=0;i<files.length;i++)

        {

            var data=fs.readFileSync(`./data1/${files[i]}`,'utf-8')
            var obj=JSON.parse(data)
            console.log(obj)

        }
            
            break;
            // Code ends here....
            // 
        case "6":
            // Search by email
            let emailid = read.question('Enter the Email: ');
            var files=fs.readdirSync('./data1/')

        for(i=0;i<files.length;i++)

        {

            var data=fs.readFileSync(`./data1/${files[i]}`,'utf-8')
            var obj=JSON.parse(data)
            var em=obj.email
            if(emailid==em){
                console.log(obj)
                break;
            }
            

        }
            
            break;
        case "7":
            process.exit(0);
            break;
        default:
            console.log("Invalid option");
    }
}

function updateUser() {
    let userName = read.question('Enter the username: ');
    var fileName = getFileName(userName);

    var userText = fs.readFileSync(fileName, 'utf8');
    var user = JSON.parse(userText);

    console.log("Enter the details or leave it blank");
    let name = read.question("Name: ");
    let email = read.question("Email: ");
    let phone1 = read.question("Phone1: ");
    let phone2 = read.question("Phone2: ");

    user.name = name == "" ? user.name : name;
    user.email = email == "" ? user.email : email;
    user.phone1 = phone1 == "" ? user.phone1 : phone1;
    user.phone2 = phone2 == "" ? user.phone2 : phone2;
    fs.writeFileSync(fileName, JSON.stringify(user));
    console.log("User updated successfully 👍");
}
// Adding user
function addUser() {
    console.log("Add User Selected");
    var user = {
        name: null,
        username: null,
        email: null,
        phone1: null,
        phone2: null
    };
    user.name = read.question("Name: ");
    user.username = read.question("Username: ")
        .toLowerCase();
    user.email = read.question("Email: ");
    user.phone1 = read.question("Phone1: ");
    user.phone2 = read.question("Phone2: ");

    let fileName = getFileName(user.username);
    var json = JSON.stringify(user);
    fs.writeFileSync(fileName, json);
}

// Deleting User

function getFileName(userName){
    return `data1/${userName}.json`;
}