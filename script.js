// script.js
const minInitialBalls = 0;
const minInitialScore = 0;
const scoreDecrease = 0;
const costIncrease = 1;
const maxBalls = 1000;
const minBalls = 1;

var blueCount = Math.floor(Math.random() * (maxBalls - minBalls + 1)) + minBalls;
var blueTakenOut = 0;
var originalBlueCount = blueCount;
var redCount = Math.floor(Math.random() * (maxBalls - minBalls + 1)) + minBalls;
var redTakenOut = 0;
var originalRedCount = redCount;
var score = 0; 


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
                    if (blueTakenOut < blueCount && redTakenOut < redCount) {
                        if(score - scoreDecrease >= 0) {
                            const color = Math.random() < 0.5 ? 'blue' : 'red';

                            if (color === 'blue') {
                                blueTakenOut++;
                            } else {
                                redTakenOut++;
                            }

                            score += costIncrease
                        } else {
                            alert('Minimum score reached!');
                            break;
                        }
                    } else if(blueTakenOut == blueCount && redTakenOut < redCount) {
                        redTakenOut++;
                        score += costIncrease

                    } else if(redTakenOut == redCount && blueTakenOut < blueCount) {
                        blueTakenOut++;
                        score += costIncrease
                    }  
                    else {
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
    blueCount = Math.floor(Math.random() * (maxBalls - minBalls + 1)) + minBalls;
    redCount = Math.floor(Math.random() * (maxBalls - minBalls + 1)) + minBalls;
    originalBlueCount = blueCount;
    originalRedCount = redCount;
    redTakenOut = 0;
    blueTakenOut = 0;

    // Update score to a new random number on reset
    score = 0

    // Update score on the UI
    updateScoreUI(score);

    updateCounterUI();
}

function revealMissingBalls() {

    alert(`Original Red Balls: ${originalBlueCount}\nOriginal Red Balls: ${originalRedCount}`);
}

function calculateDifference() {
    event.preventDefault();
    const userInput = parseInt(document.getElementById('userInput').value);
    const expectedProportion = parseInt(document.getElementById('proportion').value);
    const difference = blueCount - redCount;

    const resultParagraph = document.getElementById('calculationResult');

    if (!isNaN(userInput)) {
        let x = blueTakenOut
        let n = redTakenOut + blueTakenOut
        let p = expectedProportion // Expected proportion
        let pHat = x / n

        p = ((pHat - p) / Math.sqrt((p * (1 - p)) / (n)))
        resultParagraph.innerText = `Z: ${p}`;

        if (userInput > difference) {
            resultParagraph.style.color = 'red';
        } else {
            resultParagraph.style.color = 'green';
        }

    } else {
        alert('Please enter a valid number.');
    }
}

function updateCounterUI() {
    const blueIcon = '<i class="fas fa-circle blue"></i>';
    const redIcon = '<i class="fas fa-circle red"></i>';

    document.querySelector('.blue').innerHTML = `${blueIcon} Blue Balls: ${blueTakenOut}`;
    document.querySelector('.red').innerHTML = `${redIcon} Red Balls: ${redTakenOut}`;
}

function updateScoreUI(currentScore) {
    document.getElementById('currentScore').innerText = currentScore;
}
