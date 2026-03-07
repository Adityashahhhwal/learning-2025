// Same notes as before: C4, E4, G4 (C major chord)
alert("click on the buttons to play music")
const notes = {
    'js-gaming': 'C4',
    'js-tech':   'E4',
    'js-music':  'G4',
};

// Tone.js synth — 'sine' matches the smooth tone from before
const synth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: {
        attack: 0.01,   // how fast note starts
        decay: 0.2,     // how fast it drops
        sustain: 0.3,   // volume level held
        release: 0.8,   // how long it fades after release
    }
}).toDestination();

function response(event) {
    document.querySelector('.js-gaming').classList.remove('clicked');
    document.querySelector('.js-tech').classList.remove('clicked');
    document.querySelector('.js-music').classList.remove('clicked');
    event.target.classList.add('clicked'); // add 'clicked' class to the clicked button

    const btn = event.target;
    for (const cls in notes) {
        if (btn.classList.contains(cls)) {
            Tone.start(); // required by browsers before playing audio
            synth.triggerAttackRelease(notes[cls], '8n'); // play for an 8th note duration
            break;
        }
    }
}