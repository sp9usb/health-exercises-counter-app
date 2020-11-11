import { default as permanentStorage } from './services/permanentStorageService.js';
import { default as createProfileService } from './services/profileService.js';
import { default as createExercise } from './exercise.js';
import { default as sounds } from './soundService.js';

const profileService = createProfileService(permanentStorage);

let newProfile = profileService.create('new-profile', 10, 10, 3);
profileService.addOrUpdate(newProfile);
profileService.save();

const numberOfRepeats = document.getElementById('number-of-repeats');
const elapsedTime = document.getElementById('elapsed-time');
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const pauseLabel = document.getElementById("pause");
const doneLabel = document.getElementById("done");

let exercise = createExercise(profileService, "new-profile", (repeats, time) => {
    console.log(repeats, time);
    numberOfRepeats.textContent = `Repeat: ${repeats + 1}`;
    elapsedTime.textContent = `Elapsed time: ${time} [s]`;
},
    (isSleep) => {        
        if (isSleep) {
            pauseLabel.style.display = 'block';
            sounds.pause();
        }
        else {
            pauseLabel.style.display = 'none';
            sounds.up();
        }
    },
    () => {
        doneLabel.style.display = 'block';
        sounds.gameOver();
    }
);

startButton.onclick = () => {
    doneLabel.style.display = 'none';
    sounds.up();
    exercise.start();
};

stopButton.onclick = () => {
    exercise.stop();
};