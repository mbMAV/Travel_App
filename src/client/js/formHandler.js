export async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let formDate = document.getElementById('traveldate').value
    let data = {
        text: formText,
        date: formDate
    }
    console.log(data)

    let date1 = Date.now()
    let date2 = new Date(data.date)

    console.log(date1)
    console.log(date2)


    let Timespan = date2 - date1
    let Timespan_days = Timespan / (1000 * 3600 * 24)
    Timespan_days = Math.round(Timespan_days)

    console.log("::: Travel Date is :::")
    console.log(date2)
    console.log("::: Timespan is :::")
    console.log(Timespan_days)

    Object.assign(data, {
        Timespan_days
    })

    if (Client.checkForName(data) == true) {
        console.log("::: Before geo :::")
        console.log(data)
        await apiRequest('http://localhost:8083/geonamesApi', data)
    } else {
        console.log("No imput from user!")
        return
    }

    console.log("::: Before weateher :::")
    console.log(data)
    await apiRequest1('http://localhost:8083/weatherApi', data)

    // console.log("::: Before picture :::")
    // console.log(data)
    // await apiRequest1('http://localhost:8083/pictureApi', data)

    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8083/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}


// Make async geonames POST request
const apiRequest = async (url = '', data) => {
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
        Object.assign(data, newData)
        console.log(data)
        document.getElementById('results_geo').innerHTML = data.name+"<br>"+data.country
        document.getElementById('results_time').innerHTML = data.Timespan_days
    } catch (error) {
        console.log("error", error);
    }
}

// Make async weather POST request
const apiRequest1 = async (url = '', data) => {
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
        Object.assign(data, newData)
        document.getElementById('results_weather').innerHTML = data.midTemp+"<br>"+data.sky
    } catch (error) {
        console.log("error", error);
    }
}