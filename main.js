const HUMAN = [
    {
        name: "head",
        path: `<path id="path2985" sodipodi:rx="41" sodipodi:ry="41" sodipodi:type="arc" class="stick_human"
        d="m275 450.36c0 22.644-18.356 41-41 41s-41-18.356-41-41 18.356-41 41-41 41 18.356 41 41z"
        sodipodi:cy="450.36218" sodipodi:cx="234"/>`
    },
    {
        name: "body",
        path: `<path id="path3755" d="m234 511.91v138.91z" class="stick_human"
        style="stroke-linejoin:round;stroke-linecap:round;" inkscape:connector-curvature="0" />`
    },
    {
        name: "left_arm",
        path: `<path id="path3937-6-8" d="m211.5 520.36-47 72z" class="stick_human"
        style="stroke-linejoin:round;stroke-linecap:round;" inkscape:connector-curvature="0" />`
    },
    {
        name: "right_arm",
        path: `<path id="path3937-6-7" d="m257.5 514.36 47 72z" class="stick_human"
        style="stroke-linejoin:round;stroke-linecap:round;" inkscape:connector-curvature="0" />`
    },
    {
        name: "left_leg",
        path: `<path id="path3937" d="m244 667.36 47 72z" class="stick_human"
        style="stroke-linejoin:round;stroke-linecap:round;" inkscape:connector-curvature="0" />`
    },
    {
        name: "right_leg",
        path: `<path id="path3937-6" d="m222.5 666.36-47 72z" class="stick_human"
        style="stroke-linejoin:round;stroke-linecap:round;" inkscape:connector-curvature="0" />`
    }
]

const WORDS = [
    "GATO",
    "PERRO",
    "CASA",
    "COCHE",
    "AMARILLO",
    "COMPUTADORA",
    "PLAYA",
    "PATIO",
    "LIBRO",
    "JARDIN",
    "AVION",
    "HELADO",
    "SILLA",
    "CANCION",
    "FAMILIA",
    "TIEMPO",
    "MUSICA",
    "SOL",
    "CIUDAD",
    "TRABAJO"
];

let word
let tempWord = []
let attempts = 0
let innerGlobal = ''

const $human = document.querySelector('.human')
const $words = document.querySelector('.words')
const $letters = document.querySelectorAll('.letter')
const $panel = document.querySelector('.panel')
const $alert = document.querySelector('.alert')

function loadLetters() {
    word = WORDS[randomIndex() - 1]
    loadWordTemp()
}

$alert.addEventListener("click", () => {
    window.location.reload()
})

function loadWordTemp() {
    for (let i = 0; i < word.length; i++) {
        tempWord.push('')
    }
    loadLettersEmpty()
}

function randomIndex() {
    return Math.floor(Math.random() * WORDS.length + 1);
}

function loadLettersEmpty() {
    let inner = ''
    tempWord.forEach(item => {
        inner += `<input type="text" class="letter_word" maxlength="1" value="${item}" disabled>`
    })

    $words.innerHTML = inner
}

function validar(e) {
    const { target } = e
    const { value } = target
    target.setAttribute("disabled", true)
    let isOver = false

    let temp = word.split('')
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === value) {
            tempWord[i] = value
            isOver = true
        }
    }


    if (attempts >= 0 && attempts <= 5) {
        if (!isOver) {
            if (attempts >= 5) {
                $alert.querySelector('span').textContent = "¡Ooops! Intentalo de nuevo"
                $panel.style.display = "flex"
            }
            loadHuman();
        } else {
            loadLettersEmpty();
            if (tempWord.filter(temp => temp === '').length === 0) {  
                $alert.querySelector('span').textContent = "¡Genial! Intenta con otra palabra"              
                $panel.style.display = "flex"
                setTimeout(showConfetti(), 300)
            }
        }

    }
}

function loadHuman() {
    innerGlobal += HUMAN[attempts].path
    $human.innerHTML = innerGlobal
    attempts += 1;
}

$letters.forEach(letter => {
    letter.addEventListener("click", e => validar(e))
})

function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.8 },
    });
}

loadLetters()