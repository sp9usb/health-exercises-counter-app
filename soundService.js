function play(file) {
    const snd = new Audio(file);
    snd.play();
}

const sounds = {
    up: () => {
        play('sounds/smb_1-up.wav');
    }, 
    pause: () => {
        play('sounds/smb_pause.wav');
    },
    gameOver: () => {
        play('sounds/smb_gameover.wav');
    }
};


export default sounds;