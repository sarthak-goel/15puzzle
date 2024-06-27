// script.js
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    const bestTimeDisplay = document.getElementById('best-time');
    const currentTimeDisplay = document.getElementById('current-time');
    let tiles = [];
    let emptyTile;
    let timer;
    let currentTime = 0;

    function init() {
        for (let i = 1; i <= 15; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.textContent = i;
            tile.style.left = `${((i - 1) % 4) * 100}px`;
            tile.style.top = `${Math.floor((i - 1) / 4) * 100}px`;
            tile.addEventListener('click', moveTile);
            tiles.push(tile);
            container.appendChild(tile);
        }
        emptyTile = document.createElement('div');
        emptyTile.className = 'tile empty';
        emptyTile.style.left = '300px';
        emptyTile.style.top = '300px';
        container.appendChild(emptyTile);
        loadBestTime();
        startTimer();
    }

    function shuffle() {
        for (let i = 0; i < 1000; i++) {
            const movableTiles = getMovableTiles();
            const randomTile = movableTiles[Math.floor(Math.random() * movableTiles.length)];
            moveTile.call(randomTile);
        }
        startTimer();
    }

    function moveTile() {
        const emptyX = parseInt(emptyTile.style.left);
        const emptyY = parseInt(emptyTile.style.top);
        const tileX = parseInt(this.style.left);
        const tileY = parseInt(this.style.top);

        if ((Math.abs(emptyX - tileX) === 100 && emptyY === tileY) ||
            (Math.abs(emptyY - tileY) === 100 && emptyX === tileX)) {
            [this.style.left, emptyTile.style.left] = [emptyTile.style.left, this.style.left];
            [this.style.top, emptyTile.style.top] = [emptyTile.style.top, this.style.top];
            checkWin();
        }
    }

    function getMovableTiles() {
        const emptyX = parseInt(emptyTile.style.left);
        const emptyY = parseInt(emptyTile.style.top);
        return tiles.filter(tile => {
            const tileX = parseInt(tile.style.left);
            const tileY = parseInt(tile.style.top);
            return (Math.abs(emptyX - tileX) === 100 && emptyY === tileY) ||
                   (Math.abs(emptyY - tileY) === 100 && emptyX === tileX);
        });
    }

    function checkWin() {
        let won = true;
        tiles.forEach((tile, index) => {
            const x = parseInt(tile.style.left);
            const y = parseInt(tile.style.top);
            if (x !== (index % 4) * 100 || y !== Math.floor(index / 4) * 100) {
                won = false;
            }
        });

        if (won) {
            clearInterval(timer);
            const bestTime = localStorage.getItem('bestTime');
            if (!bestTime || currentTime < bestTime) {
                localStorage.setItem('bestTime', currentTime);
                bestTimeDisplay.textContent = currentTime;
            }
            alert(`You won! Time: ${currentTime} seconds`);
        }
    }

    function loadBestTime() {
        const bestTime = localStorage.getItem('bestTime');
        if (bestTime) {
            bestTimeDisplay.textContent = bestTime;
        }
    }

    function startTimer() {
        clearInterval(timer);
        currentTime = 0;
        timer = setInterval(() => {
            currentTime++;
            currentTimeDisplay.textContent = currentTime;
        }, 1000);
    }

    shuffleButton.addEventListener('click', shuffle);

    init();
});
