import './styles/style.scss'

import { handleSubmit } from './js/formHandler'
import { checkForName } from './js/nameChecker'

// Add event listener
const el = document.getElementById("load");
el.addEventListener("click", handleSubmit);

export {
    handleSubmit,
    checkForName
}