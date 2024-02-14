// script.js
const maxBlueBalls = 100 + Math.floor(Math.random() * 100); // Maximum limit for blue balls
const maxRedBalls = 100 + Math.floor(Math.random() * 100);  // Maximum limit for red balls

let blueCount = 0;
let redCount = 0;
let score = 1000; // Math.floor(Math.random() * 1000); // Initialize score with a random number

resetCounters();

function drawBalls(event) {
    event.preventDefault();

    const inputNumbers = document.getElementById('inputNumbers').value;

    if (inputNumbers.trim() !== '') {
        const numbersArray = inputNumbers.split(',');

        numbersArray.forEach(number => {
            const ballCount = parseInt(number);

            if (!isNaN(ballCount) && ballCount > 0) {
                for (let i = 0; i < ballCount; i++) {
                    
                    if (blueCount < maxBlueBalls && redCount < maxRedBalls) {
                        const color = Math.random() < 0.5 ? 'blue' : 'red';

                        if (color === 'blue') {
                            blueCount++;
                        } else {
                            redCount++;
                        }
                        // Decrement score by 10
                        score -= 10;
                    } else {
                        alert('Maximum limit for blue and red balls reached!');
                        break;
                    }
                }
            }
        });

        

        // Update score on the UI
        updateScoreUI(score);

        document.getElementById('inputNumbers').value = '';
        updateCounterUI();
    }
}

function resetCounters() {
    blueCount = 0;
    redCount = 0;

    // Update score to a new random number on reset
    score = 1000;

    // Update score on the UI
    updateScoreUI(score);

    updateCounterUI();
}

function revealMissingBalls() {
    const remainingBlueBalls = maxBlueBalls - blueCount;
    const remainingRedBalls = maxRedBalls - redCount;

    alert(`Remaining Blue Balls: ${remainingBlueBalls}\nRemaining Red Balls: ${remainingRedBalls}`);
}

function updateCounterUI() {
    const blueIcon = '<i class="fas fa-circle blue"></i>';
    const redIcon = '<i class="fas fa-circle red"></i>';

    document.querySelector('.blue').innerHTML = `${blueIcon} Blue Balls: ${blueCount}`;
    document.querySelector('.red').innerHTML = `${redIcon} Red Balls: ${redCount}`;
}

function updateScoreUI(currentScore) {
    document.getElementById('currentScore').innerText = currentScore;
}
