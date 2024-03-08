const buttonfetchJoke = document.getElementById('fetchJoke');
const listaChistes = document.getElementById("jokeList")

function getJoke(){
    buttonfetchJoke.addEventListener('click', () => {
        fetch('https://api.chucknorris.io/jokes/random')
        .then((response) => {
            if(!response.ok){
                throw new Error ('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then((data) => {
            const jokeLi = document.createElement('li');
            const removeJoke = document.createElement('button');
            removeJoke.innerHTML = '<p>Eliminar</p>';
            removeJoke.addEventListener('click', () => removeOne(jokeLi));
            jokeLi.innerHTML = data.value;
            jokeLi.appendChild(removeJoke);
            listaChistes.appendChild(jokeLi);
            saveJokeList(data.value);
        })
    });
}
getJoke()

function saveJokeList(joke){
    let jokes = JSON.parse(localStorage.getItem('Jokes'));
    if(jokes === null){
        jokes = [];
    };
    jokes.push(joke);
    localStorage.setItem('Jokes', JSON.stringify(jokes));
    console.log(jokes)
}

function loadJokeList(){
    let jokes = JSON.parse(localStorage.getItem('Jokes'));
    if(jokes === null){
        jokes = [];
    };
    jokes.forEach(element => {
        const jokeLi = document.createElement('li');
        const removeJoke = document.createElement('button');
        removeJoke.innerHTML = 'Eliminar';
        removeJoke.addEventListener('click', () => removeOne(jokeLi));
        jokeLi.innerHTML = element;
        jokeLi.appendChild(removeJoke);
        listaChistes.appendChild(jokeLi);
    })
};

function removeOne(jokeLi){
    listaChistes.removeChild(jokeLi);
    let jokes = JSON.parse(localStorage.getItem('Jokes'));
    if(jokes === null){
        jokes = [];
    };
    text = jokeLi.childNodes[0].nodevalue;
    jokes = jokes.filter(element => element !== text);
    localStorage.setItem('Jokes', JSON.stringify(jokes));
};

function remove(){
    localStorage.removeItem("Jokes");
    location.reload();
};

const removeAll = document.getElementById("removeAll")
removeAll.addEventListener("click",()=> remove())

loadJokeList();