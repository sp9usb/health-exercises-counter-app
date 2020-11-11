function createPermanentStorageService(){
    const settingsKeyInLocalStorage = 'health-exercises-counter-settings';

    const serializedSettings = window.localStorage.getItem(settingsKeyInLocalStorage);
    let settings = {};
    if (serializedSettings){
        try {
            settings = JSON.parse(serializedSettings);
        }
        catch(ex) {
            console.error(`The settings is not proper json: [${serializedSettings}]`);
        }
    }

    return {
        'get': () => settings,
        'set': (obj) => window.localStorage.setItem(settingsKeyInLocalStorage, JSON.stringify(obj))
    }
}

export default createPermanentStorageService();