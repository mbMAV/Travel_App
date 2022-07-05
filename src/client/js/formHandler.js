export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let data = {
        text: formText
    }

    if(Client.checkForName(data) == true) {
    console.log(data)
    apiRequest('http://localhost:8083/meaningApi', data)
    } else {
        console.log("No imput from user!")
        return
    }


    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8083/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}


// Make async POST request
const apiRequest = async ( url = '', data)=>{
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
     // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log("::: newData is here! :::");
        console.log(newData);
        const message = JSON.stringify(newData)
        document.getElementById('results').innerHTML = message
    }

    catch(error) {
    console.log("error", error);
    }
}