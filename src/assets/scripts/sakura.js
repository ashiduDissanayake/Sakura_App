document.addEventListener('DOMContentLoaded', function() {
    // Create sakura container
    const sakuraContainer = document.createElement('div');
    sakuraContainer.className = 'sakura-container';
    document.body.appendChild(sakuraContainer);
    
    // Create music controller
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    document.body.appendChild(musicControl);
    
    // Create audio element
    const backgroundMusic = document.createElement('audio');
    backgroundMusic.src = 'sakura/audio/sakura-music.mp3'; // You'll need to add this file
    backgroundMusic.loop = true;
    document.body.appendChild(backgroundMusic);
    
    // Toggle music on click
    musicControl.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControl.classList.add('playing');
        } else {
            backgroundMusic.pause();
            musicControl.classList.remove('playing');
        }
    });
    
    // Create petals
    const petalCount = 30;
    const petalTypes = ['petal-1', 'petal-2', 'petal-3'];
    
    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal ' + petalTypes[Math.floor(Math.random() * petalTypes.length)];
        
        // Randomize petal properties
        const size = Math.random() * 20 + 10; // 10-30px
        const left = Math.random() * 100; // 0-100%
        const animationDelay = Math.random() * 10; // 0-10s
        const animationDuration = Math.random() * 5 + 8; // 8-13s
        
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = left + '%';
        petal.style.animationDelay = animationDelay + 's';
        petal.style.animationDuration = animationDuration + 's';
        
        sakuraContainer.appendChild(petal);
        
        // Remove and recreate petal after animation completes
        setTimeout(() => {
            petal.remove();
            createPetal();
        }, animationDuration * 1000);
    }
});