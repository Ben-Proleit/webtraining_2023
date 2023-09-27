function htmlEventHandler() {
  console.log('HTML EventHandler');
}

function domEventHandler() {
  console.log('DOM EventHandler');
}

function domEventListener() {
  console.log('DOM EventListener');
}

document.getElementById('domEventHandler').onclick = domEventHandler; // Vorsicht, keine runden Klammern!

document.getElementById('domEventListener').addEventListener('', domEventListener);

// removeEventListener()


function inputChanged(newInput) {
  console.log(newInput);
}


// Typische Events

  // Mausinteraktionen
  // Interaktion mit Tastatur oder Textfeldern