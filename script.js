const button = document.getElementById("button");
const audioEl = document.getElementById("audio");

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {

    const jokeString = joke.trim().replace(/ /g, "%20")

    VoiceRSS.speech({
        key: '9e3c2765148e43ca9cef6ec1bd941e8c',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = "";

    const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke
        }

        tellMe(joke);

        toggleButton();
    } catch (error) {
        // catch error here
    }
}

button.addEventListener("click", getJokes);
audioEl.addEventListener("ended", toggleButton);
