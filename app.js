import { default as permanentStorage } from './services/permanentStorageService.js';
import { default as createProfileService } from './services/profileService.js';
import { default as createExercise } from './exercise.js';

var profileService = createProfileService(permanentStorage);

let newProfile = profileService.create('new-profile', 10, 10, 3);
profileService.addOrUpdate(newProfile);
profileService.save();

var exercise = createExercise(profileService, "new-profile", (elapsedRepeats, elapsedTime) => console.log(elapsedRepeats, elapsedTime));

exercise.start();