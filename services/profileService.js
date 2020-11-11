function createProfileService(storageService) {
    const configuration = storageService.get();    
    const profiles = configuration.profiles || [];
    
    return {
        'create': (name, repeats, repeatTime, pauseTimeBetweenRepeats) => {
            return {name, repeats, repeatTime, pauseTimeBetweenRepeats};
        },
        'addOrUpdate': (profile) => { 
            const predicate = x => x.name === profile.name
            if (!profiles.some(predicate)) 
                profiles.push(profile);
            else {
                const index = profiles.findIndex(predicate);
                profiles[index] = profile;
            }
        },
        'get': (name) => profiles.find(x=>x.name === name),
        'clean': () => profiles = [],
        'save': () => storageService.set(Object.assign(storageService.get(), { profiles }))
    }
}

export default createProfileService;