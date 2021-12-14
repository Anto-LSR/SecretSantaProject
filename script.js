window.addEventListener("DOMContentLoaded", (event) => {
    console.log("C BIEN CHARGER TU PEU YALER");


let giver = [];
let receiver = [];
let input = document.getElementById("nbParticipants");
let error = document.getElementById("errorMessage");
let confirmBtn = document.getElementById("confirmBtn");
let shuffleBtn = document.getElementById("shuffle");
let nameBox = document.getElementById("showNames");
let resultBtn = document.getElementById("showResultBtn")
let inputBtn = document.getElementById("inputBtn")

//Affichage des participants
function addNames(name) {
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(name.charAt(0).toUpperCase() + name.slice(1)));
    ul.appendChild(li);

}




const addParts = (ev) => {
    inputBtn.classList.remove('error-inputBtn');
    input.classList.remove('error-input');
    inputBtn.innerHTML = "Ok!"
    input.placeholder = 'Ex : Santa Klaus';
    ev.preventDefault();
    let name = document.getElementById('nbParticipants').value.toLowerCase();

    document.querySelector('form').reset();
    if (name === ' ' || name === '') {
        7
        input.placeholder = 'Field empty'
        input.classList.add('error-input')
        inputBtn.classList.add('error-inputBtn');
        inputBtn.innerHTML = "😕"

        return;
    }

    if (receiver.includes(name)) {
        input.placeholder = 'Nom en double!'
        input.classList.add('error-input')
        return;
    }
    giver.push(name);
    receiver.push(name);
    addNames(name);

};

//Entrée instead of click button like a dumbass
let errormsg = document.getElementById('error-msg')
input.addEventListener("keydown", function(event) {
    if (event.code === 13) {
        event.preventDefault();
        document.getElementById("bt1").click();
    }
    confirmBtn.classList.remove("errorBtn")
    errormsg.style.display = "none"
});


document.getElementById('inputBtn').addEventListener('click', addParts);

confirmBtn.addEventListener('click', () => {

    if (receiver.length === 0) {
        // alert("Appuies sur entrée déjà, on parlera en suite");
        confirmBtn.classList.add("errorBtn")
        errormsg.style.display = "block"
        errormsg.innerHTML = "I need at least 3 participants !"
        return;

    } else if (receiver.length === 1) {
        // alert("Un secret santa tout seul, ça s'appelle juste un ACHAT.");
        confirmBtn.classList.add("errorBtn")
        errormsg.style.display = "block"
        errormsg.innerHTML = "I need at least 3 participants !"
        return;
    } else if (receiver.length === 2) {
        confirmBtn.classList.add("errorBtn")
        errormsg.style.display = "block"
        errormsg.innerHTML = "I need at least 3 participants !"
            // alert("Un secret santa à deux, ça s'appelle juste Noël.");
        return;
    }

    confirmBtn.classList.add("clicked");
    confirmBtn.innerHTML = "Ok !"
    shuffleBtn.classList.remove("hidden");
    shuffleBtn.classList.add("confirmClicked")
    input.classList.add("inputHidden")
    inputBtn.classList.add("inputHidden")
    inputBtn.classList.add("inputBtnOff")
    inputBtn.setAttribute("disabled", true)
    input.setAttribute("disabled", true)
})


//Mélange de l'array receiver
const shuffle = () => {


    do {
        let verif = true;
        //Melange
        for (let i = 0; i < receiver.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = receiver[i];
            receiver[i] = receiver[j];
            receiver[j] = temp;

        }
        //Verification du mélange
        for (let i = 0; i < receiver.length; i++) {
            if (receiver[i] === giver[i]) {
                verif = false
            }
        }
        //Sortie de la boucle si mélangé correctement
        if (verif === true) {
            break;
        }
        console.log(receiver);
    } while (true)
};


shuffleBtn.addEventListener('click', shuffle);
shuffleBtn.addEventListener('click', () => {
    showNames.classList.add("shuffleAnimation"),
        shuffleBtn.classList.add("shuffleClickedBefore")
    shuffleBtn.innerHTML = "Shuffling..."
    repeatShuffle()
    let liElements = document.querySelectorAll("li");
    for (let li of liElements) {
        li.classList.add("onNameAdd")
    }




})



//shuffle LI

function shuffleList() {
    let ul = document.getElementById('list');
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);

    }
}

function repeatShuffle() {
    let i = 0
    let interval = setInterval(() => {
        if (i === 5) {
            clearInterval(interval)
            shuffleBtn.classList.add("shuffleClicked");
            shuffleBtn.innerHTML = "Ok !";
            resultBtn.classList.add("confirmClicked");
            resultBtn.classList.remove("hidden");
            // confirmBtn.style.display = "none";
            // resultBtn.classList.add("shakey");
            let liElements = document.querySelectorAll("li");
            for (let li of liElements) {
                li.classList.remove("onNameAdd");
            }
        }

        shuffleList();
        i++;
    }, 500)
}






let listbox = document.getElementById("showNames");
let resultbox = document.getElementById("showResults");

function swapDivs() {
    let i = 0;
    let interval = setInterval(() => {
        if (i === 1) {
            clearInterval(interval);

        }
        listbox.style.display = "none";
        resultbox.classList.remove("hidden");
        resultbox.classList.add("confirmClicked");
        showDeer()

        i++;
    }, 1000)
    addResults(giver, receiver);
    resultBtn.setAttribute("disabled", true)


}


function showDeer() {
    let deer = document.getElementById("reinDeer")
    let i = 0;
    let interval = setInterval(() => {
        if (i === 1) {
            clearInterval(interval);

        }
        deer.classList.add("confirmClicked")
        deer.classList.remove("hidden")

        i++;
    }, 300)




}



resultBtn.addEventListener('click', () => {
    listbox.classList.remove("shuffleAnimation");
    listbox.classList.add("clickedResult");



    swapDivs();


})


//AFFICHER RESULTATS

function addResults(giver, receiver) {


    for (let i = 0; i < receiver.length; i++) {
        let resultUl = document.getElementById("resultUl");
        let li = document.createElement("li");


        let myText = " will be the secret santa of "
        let span1 = document.createElement("span");
        span1.innerHTML = receiver[i].charAt(0).toUpperCase() + receiver[i].slice(1);
        let span2 = document.createElement("span");
        span1.classList.add("span2")

        span2.innerHTML = giver[i].charAt(0).toUpperCase() + giver[i].slice(1);

        li.appendChild(span1);
        li.appendChild(document.createTextNode(myText));
        li.appendChild(span2);
        resultUl.appendChild(li);
        console.log(i);

    }

}
});