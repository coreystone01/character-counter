// check if dom is loaded then run function
document.addEventListener("DOMContentLoaded", function () {

    // Get Values/Input from DOM
    const textAreaInput = document.getElementById('userInput');
    const progressBarContainer = document.getElementById('progress-bar-container');

    // Set values
    //Card values
    const charCountCard = document.querySelector('.scores__char-count h5');
    const wordCountCard = document.querySelector('.scores__word-count h5');
    const sentenceCountCard = document.querySelector('.scores__sent-count h5');
    const densityMessage = document.querySelector('.letter-density__content');


    function updateStats() {
        const text = textAreaInput.value.toLowerCase();
        const excludeSpaces = document.getElementById('excludeSpaces').checked;
        // const totalCharacters = text.length;
        const totalCharacters = excludeSpaces ? text.replace(/\s/g, '').length : text.length;
        const totalWords = text.trim().split(/\s+/).length;
        // recommended by multiple sources on the Internet, though I can't speak to filter
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const totalSentences = sentences.length;

        // const letterCounts = {};
        // for (const char of text){
        //     if(/[a-z]/.test(char)) {
        // // Here we're saying if the character is between a-z, add it to the letterCounts object and increase its count by 1 OR set it to a default of 0 since 0 does matter here
        //         letterCounts[char] = (letterCounts[char] || 0 + 1);
        // }

        const letterCounts = (text, excludeSpaces) => {
            const map = new Map();
                for (const char of text) {
                    // suggested by AI
                if (excludeSpaces && char === ' ') continue;
                if (/[a-z]/.test(char)) {
                    map.set(char, (map.get(char) || 0) + 1);
                }
            }
            return map;

        };

        const letterCountsMap = letterCounts(text);

        // .textContent ensures that ALL values are sent to the DOM and allows us to update the DOM dynamically or with better performance
        charCountCard.textContent = totalCharacters;
        wordCountCard.textContent = totalWords;
        sentenceCountCard.textContent = totalSentences;

            // Clear progress bars
        progressBarContainer.innerHTML = '';


        let totalLetters = 0;
        for(let count of letterCountsMap.values())   {
            totalLetters += count;
        }

        // progressBarContainer.innerHTML = ''; // Clear existing bars

        // Check if we even have any input
        if(totalLetters === 0) {
            densityMessage.textContent = "No Characters found. Start typing to see letter density";
        }
        else {
            
            for (const [char, count] of letterCountsMap.entries()) {
                const percentage = (count / totalLetters) * 100;

                    const progBar = document.createElement('div');
                    progBar.className = 'mb-2 d-flex align-items-center';
                    progBar.innerHTML = `
                    <span class="pe-2">${char.toUpperCase()}</span>
                        <div class="progress bg-Neutral800 flex-grow-1 role="progressbar"">
                            <div class="progress-bar bg-Purple rounded" style="width: ${percentage.toFixed(2)}%;" aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${totalCharacters}">
                            </div>
                        </div> 
                    `;

                    progressBarContainer.appendChild(progBar);
            }
        }
    }

// Event listener
    textAreaInput.addEventListener('input', updateStats);
});