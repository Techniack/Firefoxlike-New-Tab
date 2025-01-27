var commandline = document.querySelector('#commandline')
var form = document.querySelector('form')
const date = new Date()

// date formater
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

commandline.placeholder = "Hi Jerry. It's " + formatAMPM(date) + ", " + date.toDateString() + "."

// search bar behavior
document.onclick = function(e) {
    if(e.target.localName == "body")
        commandline.select()
};

form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log(commandline.value)
    let q = commandline.value
    let command = q.substring(0, q.indexOf(' ') + 1)
    if(command === "w "){
        window.location.href = "http://en.wikipedia.org/wiki/" + q.slice(2)
    }
    else if(command === "y "){
        window.location.href = "http://youtube.com/results?search_query=" + q.slice(2)
    }
    else if(q === "moodle"){
        window.location.href = "https://moodle.clarkson.edu/my/"
    }
    else if(q === "mycu"){
        window.location.href = "https://mycu.clarkson.edu/psp/csprd92/EMPLOYEE/SA/s/WEBLIB_HCX_GN.H_DASHBOARD.FieldFormula.IScript_Main"
    }
    else if(q === "webassign"){
        window.location.href = "https://www.cengage.com/dashboard/#/my-dashboard/authenticated?page="
    }
    else if(q === "print.clarkson.edu"){
        window.location.href = "https://print.clarkson.edu:9192/app?service=page/UserSummary"
    }
    else if(q === "print"){
        window.location.href = "https://print.clarkson.edu:9192/app?service=page/UserSummary"
    }
    else if(q === "drive"){
        window.location.href = "https://drive.google.com/drive/u/1/my-drive"
    }
    else if(q === "youtube"){
        window.location.href = "https://youtube.com"
    }
    else if(command === "d "){
        window.location.href = "https://drive.google.com/drive/u/1/search?q=" + q.slice(2)
    } 
    else if(command === "e "){
        window.location.href = "https://mail.google.com/mail/u/1/#search/" + q.slice(2)
    } else{
        window.location.href = "https://duckduckgo.com/?q=" + q
    }
})


// worlds simpliest crud
var textarea = document.querySelector('#notes')
var notes = []
var currentNote = 0

document.getElementById('new').addEventListener('click', function(e) {
    e.preventDefault()
    notes.push('')
    textarea.value = ''
    currentNote = notes.length - 1
})

document.getElementById('delete').addEventListener('click', function(e) {
    e.preventDefault()
    if(notes.length == 0){
        return
    } 
    if(notes.length == 1){
        notes = ['']
        textarea.value = ''
        currentNote = 0
        localStorage.setItem('notes', JSON.stringify(notes))
        updateList()
        return
    }
    notes.splice(currentNote, 1)
    currentNote = notes.length - 1
    textarea.value = notes[currentNote]
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
})

function updateList(){
    document.querySelector('#all').innerHTML = ""
    for(let note of notes){
        let a = document.createElement('a')
        a.href = '#'
        a.textContent = note
        a.addEventListener('click', function(e) {
            e.preventDefault()
            textarea.value = note
            currentNote = notes.indexOf(note)
        })
        document.querySelector('#all').appendChild(a)
    }
}

if(localStorage.getItem('notes') !== null) {
    notes = JSON.parse(localStorage.getItem('notes'))
    textarea.value = notes[0]
    currentNote = notes.length - 1
    updateList()
} else {
    notes.push('')
    localStorage.setItem('notes', JSON.stringify(notes))
}

textarea.addEventListener('input', (e) => {
    notes[currentNote] = e.target.value
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
})