export function checkForName(data) {
    console.log("::: Running checkForName :::", data.text)
    event.preventDefault()

    if(data.text == "") {
        alert("Insert location please!")
    } else if (data.date == "") {
        alert("Insert Travel date please!")
    } else if (data.return == "") {
        alert("Insert Return date please!")
    } else {
        return true
    }

}
