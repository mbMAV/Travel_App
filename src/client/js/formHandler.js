export async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let formDate = document.getElementById('travelDate').value
    let reFormDate = document.getElementById('returnDate').value
    let data = {
        text: formText,
        date: formDate,
        return: reFormDate
    }
    console.log(data)

    let date1 = Date.now()
    let date2 = new Date(data.date)
    let date3 = new Date(data.return)

    console.log(date1)
    console.log(date2)
    console.log(date3)

    let timeSpan = date2 - date1
    let timeSpanDays = timeSpan / (1000 * 3600 * 24)
    timeSpanDays = Math.round((timeSpanDays + 0.5))

    let timeDuration = date3 - date2
    timeDuration = timeDuration / (1000 * 3600 * 24)
    timeDuration = timeDuration + 1

    console.log("::: Travel Date is :::")
    console.log(date2)
    console.log("::: Timespan is :::")
    console.log(timeSpanDays)
    console.log("::: Timeduration is :::")
    console.log(timeDuration)

    Object.assign(data, {
        timeSpanDays,
        timeDuration
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

    console.log("::: Before picture :::")
    console.log(data)
    await apiRequest2('http://localhost:8083/pictureApi', data)
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
        Object.assign(data, newData)
        console.log(data)
        document.getElementById('results_geo').innerHTML = data.name+"<br>"+data.country
        document.getElementById('results_time').innerHTML = data.timeSpanDays
        document.getElementById('results_duration').innerHTML = data.timeDuration
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
        Object.assign(data, newData)
        document.getElementById('results_weather').innerHTML = data.midTemp+"<br>"+data.sky
    } catch (error) {
        console.log("error", error);
    }
}

// Make async weather POST request
const apiRequest2 = async (url = '', data) => {
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
        Object.assign(data, newData)
        document.getElementById('results_picture').innerHTML = `<img src=${data.picLink} alt=Picture of ${data.name}>`;
    } catch (error) {
        console.log("error", error);
    }
}