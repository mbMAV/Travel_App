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

    // calculate dates and durations
    let date1 = Date.now()
    let date2 = new Date(data.date)
    let date3 = new Date(data.return)

    let timeSpan = date2 - date1
    let timeSpanDays = timeSpan / (1000 * 3600 * 24)
    timeSpanDays = Math.round((timeSpanDays + 0.5))

    let timeDuration = date3 - date2
    timeDuration = timeDuration / (1000 * 3600 * 24)
    timeDuration = timeDuration + 1

    Object.assign(data, {
        timeSpanDays,
        timeDuration
    })

    // call post routes to get data from APIs
    if (Client.checkForName(data) == true) {
        await apiRequest('http://localhost:8083/geonamesApi', data)
        await apiRequest1('http://localhost:8083/weatherApi', data)
        await apiRequest2('http://localhost:8083/pictureApi', data)
    } else {
        console.log("No imput from user!")
    }
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
        Object.assign(data, newData)
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
        Object.assign(data, newData)
    } catch (error) {
        console.log("error", error);
    }
}

// Make async picture POST request
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
        Object.assign(data, newData)

        // manipulate DOM with new data
        if (data.name == data.country) {
            document.getElementById('results_geo').innerHTML = "Your Trip goes to:<br>"+data.country
        } else {
            document.getElementById('results_geo').innerHTML = "Your Trip goes to:<br>"+data.name+"<br>"+data.country
        }
        document.getElementById('results_weather').innerHTML = "The Weather is:<br>"+data.midTemp+"°C"+"<br>"+data.sky
        document.getElementById('results_time').innerHTML = "Start in:<br>"+data.timeSpanDays+" Days"
        document.getElementById('results_duration').innerHTML = "Duration:<br>"+data.timeDuration+" Days"
        document.getElementById('results_picture').innerHTML = `<img style="border: goldenrod; border-style: double;" src=${data.picLink} alt=Picture of ${data.name}>`;
    } catch (error) {
        alert("error", error);
    }
}

// handleSubmit = () => {
//     navigator.serviceWorker.controller.handleSubmit(event);
// };