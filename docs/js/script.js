// Importing functions from different modules
import { randomKick, randomSnare, underEight, underThirteen, underFive, randomMelody } from './modules/randomize.js'
import { setupBeat, stopBeat, startBeat } from './modules/beat.js'
import { setupMelody, stopMelody, startMelody } from './modules/melody.js'
import { setupEffect } from './modules/effects.js'

// DOM elements needed globaly
const speechButton = document.getElementById('talk')
const chatBox = document.querySelector('.chat_messages')
const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const loading = document.querySelector('.loading')
const lighting = document.querySelector('.twy-image')
const blade = document.querySelector('.blade')

// These let's have to be global and 'changable' because we only want one instance to exist and not declare them again
let newMessage
let userResponse
let text

// These variable are needed for the Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = true

// A global bpm is declared which will ensure the bpm is the same for the beat and the melody. This value will be changed so that's why it's a let
let bpm = 150

// This variable keeps track of if the melody has been played already. This value will be changed so that's why it's a let
let melodyPlayed = false

// TWY sends you a welcome message
window.addEventListener('load', () => {
    const reply = 'Hey you! My name is TWY :) I love making music, and I am very curious about the music you listen to on Earth. Let`s start with a beat, what kind of beat do you want?'
    twyResponseMessage(reply)
})

speechButton.addEventListener('click', () => {
    // Start the recognition
    talk()
    lighting.classList.remove('default')
    blade.classList.remove('defaultBlade')

    // Make sure the pause button is disabled because there is no music played yet
    pauseButton.disabled = false
    pauseButton.classList.remove('inactive')
    playButton.classList.add('inactive')

    newMessage = document.createElement('li')

    newMessage.classList.add('message')
    newMessage.classList.add('you')

    userResponse = document.createElement('p')

    let userMeta = document.createElement('p')
    userMeta.classList.add('text_meta')
    userMeta.innerText = 'You'

    newMessage.appendChild(userMeta)
    chatBox.appendChild(newMessage)

    // Scrolls automatically to the last message
    chatBox.scrollTop = chatBox.scrollHeight
})

// Check if the recognition found any result
recognition.addEventListener('result', (e) => {
    text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    userResponse.innerText = text
    newMessage.appendChild(userResponse)
    if (e.results[0].isFinal) {
        userResponse = document.createElement('p')
    }
    chatBox.scrollTop = chatBox.scrollHeight
})

// If recognition ended listening
recognition.addEventListener('end', (e) => {
    const lowerText = text.toLowerCase()
    compareData(lowerText)
})

// Event listeners to handle the play and pause actions
playButton.addEventListener('click', play)
pauseButton.addEventListener('click', pause)

// This function handles the reply that TWY gives. It takes the response text for the message and then creates and appends all the DOM elements needed. It also has a delay of 1000ms for the reply to look more realistic
function twyResponseMessage(response) {
    loading.classList.add('hidden')
    setTimeout(() => {
        let twyMessage = document.createElement('li')
        let twyMeta = document.createElement('p')
        let twyResponse = document.createElement('p')
        twyMessage.classList.add('message')
        twyMessage.classList.add('twy')
        twyMeta.classList.add('text_meta')
        twyResponse.classList.add('text')
        twyMeta.innerText = 'TWY'
        twyResponse.innerText = response
        twyMessage.appendChild(twyMeta)
        twyMessage.appendChild(twyResponse)
        chatBox.appendChild(twyMessage)

        chatBox.scrollTop = chatBox.scrollHeight

        loading.classList.remove('hidden')
    }, 1000)
}

// This function handles a specific reply. It still takes the response text and then creates and appends all the DOM elements needed. It still has a delay of 1000ms for the reply to look more realistic but this time it also creates a button that will refresh the page for you to make another song
function twyResetConversation(response) {
    loading.classList.add('hidden')
    setTimeout(() => {
        let twyMessage = document.createElement('li')
        let twyMeta = document.createElement('p')
        let twyResponse = document.createElement('p')
        let twyButton = document.createElement('button')
        twyMessage.classList.add('message')
        twyMessage.classList.add('twy')
        twyMeta.classList.add('text_meta')
        twyResponse.classList.add('text')
        twyButton.classList.add('reset')
        twyMeta.innerText = 'TWY'
        twyResponse.innerText = response
        twyButton.innerText = 'Retry'

        twyMessage.appendChild(twyMeta)
        twyMessage.appendChild(twyResponse)
        twyMessage.appendChild(twyButton)
        chatBox.appendChild(twyMessage)

        chatBox.scrollTop = chatBox.scrollHeight

        loading.classList.remove('hidden')

        // Handles the button click for the reset button. It will refresh the page which will give the user another beat and melody
        const refreshButton = document.querySelector('.reset')
        refreshButton.addEventListener('click', () => {
            console.log('click')
            location.reload()
        })
    }, 1000)
}

// Function that checks if the speech matches certain words
function compareData(speechToText) {
    let synonyms

    // Fetches the synonyms from the json file
    fetch('./json/data.json')
        .then(res => res.json())
        // Puts the data into the synonyms variable
        .then(data => synonyms = data)
        // Puts the data into the function so it can check what the user said
        .then(() => findSynonyms(synonyms))

    // Handles the specific answers to the voice commands
    function findSynonyms(synonymArray) {
        // Converts the arrays into string so it can be searched by the first if statement
        let stringedSynonyms = JSON.stringify(synonymArray)
        if (speechToText.search(stringedSynonyms)) {
            // Check if the question contains any synonym of the word 'beat'
            synonymArray[0].beat.filter((item) => {
                if (speechToText.includes(item)) {
                    // The specific reply that will be 'sent' if you trigger the beat 
                    const reply = 'What do you think of this sick beat? Do you think the tempo should be adjusted? Otherwise we will continue with a melody.'
                    twyResponseMessage(reply)

                    // Sets a delay and then it will play the beat
                    setTimeout(() => {
                        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                    }, 1500)
                }
            })
            // Checks if the question contains any synonym of the word 'slower'
            synonymArray[0].slower.filter((item) => {
                if (speechToText.includes(item)) {
                    const reply = 'Okay so you want it slower. Consider it done!'
                    twyResponseMessage(reply)

                    setTimeout(() => {
                        bpm = bpm - 30
                        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                        // Checks if the melody has been played already, if so it will also play the melody when the user says slower
                        if (melodyPlayed == true) {
                            setupMelody(randomMelody, bpm)
                        }
                    }, 1500)
                }
            })
            // Checks if the question contains any synonym of the word 'faster'
            synonymArray[0].faster.filter((item) => {
                if (speechToText.includes(item)) {
                    const reply = 'Okay so you want it faster. Consider it done!'
                    twyResponseMessage(reply)

                    setTimeout(() => {
                        bpm = bpm + 30
                        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                        // Checks if the melody has been played already, if so it will also play the melody when the user says faster
                        if (melodyPlayed == true) {
                            setupMelody(randomMelody, bpm)
                        }
                    }, 1500)
                }
            })
            // Checks if the question contains any synonym of the word 'melody'
            synonymArray[0].melody.filter((item) => {
                if (speechToText.includes(item)) {
                    const reply = 'Nice, let`s spice it up with more melody! How does this sound? Do you want to add an effect over it too?'
                    twyResponseMessage(reply)

                    setTimeout(() => {
                        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                        setupMelody(randomMelody, bpm)
                        melodyPlayed = true
                    }, 1500)
                }
            })
            // Checks if the question contains any synonym of the word 'effect'
            synonymArray[0].effect.filter((item) => {
                if (speechToText.includes(item)) {
                    const reply = 'Now it really gets sick! The music may start to sound weird for now.'
                    twyResponseMessage(reply)

                    setTimeout(() => {
                        setupBeat(underEight, underThirteen, underFive, randomKick, randomSnare, bpm)
                        // Checks if the melody has been played already, if so it will play the melody with the effect over it
                        if (melodyPlayed == true) {
                            setupMelody(randomMelody, bpm)
                            setupEffect()
                        }
                    }, 1500)

                    setTimeout(() => {
                        const endmessage = 'I did everything to make a cool tune for you. If you want to make another one, press the button.'
                        twyResetConversation(endmessage)
                    }, 2500)
                }
            })
        } else if (synonymArray[0].indexOf(speechToText) >= -1) { // If the question doesn't contain a synonym, show an 'error'
            const reply = 'I don`t understand what you mean :(. Maybe say something else.'
            twyResponseMessage(reply)
        }
    }
}

// When you click the microphone, to say something
function talk() {
    // Stop the beat and melody
    stopBeat()
    stopMelody()
    // Recognition starts and listens to what you're saying
    recognition.start()
}

// When you click the pause button
function pause() {
    lighting.classList.remove('default')
    blade.classList.remove('defaultBlade')
    // Stop the beat and melody
    stopBeat()
    stopMelody()
    // Switch the pause button to start
    playButton.classList.remove('inactive')
    pauseButton.classList.add('inactive')
}

// When you click the start button
function play() {
    lighting.classList.add('default')
    blade.classList.add('defaultBlade')
    // Start the beat and melody
    startBeat()
    startMelody()
    // Switch the start button to pause
    pauseButton.classList.remove('inactive')
    playButton.classList.add('inactive')
}