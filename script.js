let url = "https://61c41880f1af4a0017d992dd.mockapi.io/user";


// To get all the mails in Inbox when Primary button is clicked 
async function getData(url) {
    try{
        const response = await fetch(url);

        let data = await response.json();
        console.log(data);

        allEmail(data);

    } catch (error) {
        console.error();
        alert("Problem in loading the mails")
    }
}

function allEmail(data) {
    let cell = "";
    for (let i of data){
        cell += `<tr>
            <td> <input type = "checkbox"> </td>
            <td><b> ${i.username} </b></td>
            <td> ${i.emailContent} </td>
            <td> ${i.timestamp}</td>
            </tr>`;   
    }

    document.getElementById("emaillist").innerHTML = cell;
}

// write and send email

function composeEmail() { 

    document.getElementById("emaillist").innerHTML = 
    `<style>
        .container {width : 100vh}
        input {display : inline-flex; border : none transparent; }
    </style>
    <div class = "container">
    <tr>
        <td id="recipient">To: <input type = "text" placeholder = "Recipients email address"></td>
    </tr>
    <tr>
        <td id="subject">Subject: <input type = "text" placeholder = "subject"></td>
    </tr>
    <tr>
        <td id="emailbody"><input type = "text" placeholder = "Write your Email"></td>
    </tr>
    <tr>
        <td><button class="btn btn-primary" onclick = "setSent()">Send</button></td>
    </tr>
    </div>`   
}

async function setSent() {
    const recipient = document.querySelector("#recipient").value;
    const subject = document.querySelector("#subject").value;
    const emailbody = document.querySelector("#emailbody").value;

    const data = await fetch(url, 
        {
            method : "POST",
            body: JSON.stringify({
                
                emailaddress : recipient,
                subject : subject,
                emailContent: emailbody
            
            }),
            headers: {
                "Content-Type" : "application/json",
            },
        });
        
        sentList(data);
}


function sentList(data) {
    document.getElementById("emaillist").innerHTML = 
    `<tr>
            <td> <input type = "checkbox"> </td>
            <td><b> ${data.recipient} </b></td>
            <td> ${data.subject} </td>
            <td> ${data.emailbody}</td>
            </tr>`;    
}

