function createExercise(profileService, profileName, updateCallback) {    
    const profile = profileService.get(profileName);
    let isRunning = false;

    let elapsedRepeats = 0;
    let elapsedTime = 0;

    function runExercises(counter) {
        if(counter < profile.repeats && isRunning) {
            wait(profile.repeatTime, () => {
                elapsedTime++;
                if (updateCallback) {
                    updateCallback(elapsedRepeats, elapsedTime);
                }
                runExercises(elapsedRepeats);
            });
            // setTimeout(() => {
            //     elapsedTime++;
            //     elapsedRepeats++;
            //     if (updateCallback) {
            //         updateCallback(elapsedRepeats, elapsedTime);
            //     }
            //     runExercises(elapsedRepeats);
            // }, 1000);
        } else {
            console.log("Done");
        }
    }

    function wait(startTime, time, updateCallback, doneCallback) {        
        if (Date.now() - startTime < time) {
            setTimeout(() => {
                if (updateCallback) {
                    updateCallback(elapsedRepeats, elapsedTime);
                }
                wait(time, doneCallback);
            }, 1);
        } else {
            
            doneCallback();
        }
    }
    
    return {
        'start': () => {
            isRunning = true;
            elapsedTime = 0;
            elapsedRepeats = 0;
            runExercises(elapsedRepeats);
        },
        'getElapsedRepeats': () => elapsedRepeats,
        'getElapsedTime': () => elapsedTime
    }
}

export default createExercise;