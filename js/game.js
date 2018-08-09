document.addEventListener('DOMContentLoaded', () => {
    prepareNextLevel(1);
});

const getButtonValue = (index) => {
    return parseInt(buttons[index].innerHTML);
}

const getLastButtonValue = () => {
    return getButtonValue(buttons.length - 1);
}

const generateGoal = (level) => {
    return level * 3;
}

const checkSequenceCompletion = (goal) => {
    let counter = 0;

    // function that checks each user button click
    const checkUserInput = (number) => {
        counter += number;
        
        if (counter < goal) return;
        if (counter == goal) return true;
        if (counter > goal) return false;
    }

    return checkUserInput;
}


const prepareNextLevel = (level) => {
    displayLevel(level);
    showLoadingScreen();

    const goal = generateGoal(level);
    const checkUserInput = checkSequenceCompletion(goal);

    const trackGameState = (number) => {
        const result = checkUserInput(number);
        if (result === undefined) {
            // nothing
            return;
        } else if (result === true) {
            setTimeout(() => {
                // the player won
                animateWin();
    
                setTimeout(() => {
                    prepareNextLevel(level + 1);
                }, LONGEST_PAUSE_TIME)
            }, MEDIUM_PAUSE_TIME);
        } else if (result === false) {
            setTimeout(() => {
                // the player lost
                animateLose();
    
                setTimeout(() => {
                    prepareNextLevel(1);
                }, LONGEST_PAUSE_TIME)
            }, MEDIUM_PAUSE_TIME);
        }
    }

    hideLoadingScreen();
    
    const exampleSequence = generateExampleSequence(goal);
    showSequence(exampleSequence);

    setUpListeners(trackGameState);
}

const setUpListeners = (trackingFunction) => {
    const buttonOnClick = (event) => {
        const buttonText = event.target.innerHTML;
        const buttonNumber = parseInt(buttonText);
        trackingFunction(buttonNumber);
    }

    // iterate through [buttons]
    Array.from(buttons).forEach(button => {
        // button = buttons[i]
        button.onclick = buttonOnClick;
    })
}

const generateExampleSequence = (goal) => {
    const sequence = [];
    let remainingGoal = goal;

    while (remainingGoal !== 0) {
        const randomButtonIndex = random(
            0,
            // because if remainingGoal is small like 1
            // we can choose only button 1
            Math.min(getLastButtonValue(), remainingGoal) - 1
        );
        
        sequence.push(randomButtonIndex);
        // subtract button number from the remaining goal 
        remainingGoal -= getButtonValue(randomButtonIndex);
    };

    return sequence;
}
