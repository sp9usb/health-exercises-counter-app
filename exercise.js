function createExercise(profileService, profileName, updateCallback, sleepNotifyCallback, done) {    
    const profile = profileService.get(profileName);
    let isRunning = false;

    let elapsedRepeats = 0;
    let elapsedTime = 0;

    function sleep(timeout, interval, progressCallback, done) {
        const startTimeInMilisecond = new Date().getTime();
        setTimeout(function repeater() {
            let totalTimeHasExpiredOrConditionIsTrue = (startTimeInMilisecond + timeout) < new Date().getTime();
            if (totalTimeHasExpiredOrConditionIsTrue) {
                done();
            } else {
                if (progressCallback && typeof(progressCallback) === 'function') {
                    progressCallback(new Date().getTime() - startTimeInMilisecond);
                }
                setTimeout(repeater, interval);
            }
        }, interval);
    }

    function runExercises(counter) {
        if(counter < profile.repeats && isRunning) {
            sleep(profile.repeatTime * 1000, 1000, 
                (time) =>{
                    if (updateCallback) {
                        updateCallback(elapsedRepeats, Math.floor(time / 1000));
                    }
                },
                () => {
                    console.log(`Pause ${profile.pauseTimeBetweenRepeats} [s]`);
                    updateCallback(elapsedRepeats, profile.repeatTime);
                    sleepNotifyCallback(true);
                    sleep(profile.pauseTimeBetweenRepeats * 1000, 100, null, () => {
                        sleepNotifyCallback(false);
                        runExercises(elapsedRepeats++);
                    });                   
                });
        } else {
            console.log("Done");
            done();
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
        'getElapsedTime': () => elapsedTime,
        'stop': () => {
            isRunning = false;
        }
    }
}

export default createExercise;