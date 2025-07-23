$(document).ready(function(){

    $('.theme-toggle-btn').on('click', function() {
        const currentTheme = $('body').attr('data-bs-theme');

              // Check the current theme
      if (currentTheme === 'dark') {
        $('body').attr('data-bs-theme', 'light');
      } else {
        $('body').attr('data-bs-theme', 'dark');
      }
    //   I cannot seem to get the icons to switch no matter what I try. Even the brand/logos switch out. For now, I'm just going to leave it
        const whichTheme = $('body').attr('data-bs-theme');
      if (whichTheme === 'dark') {
        $('#navbar__theme-switcher img').attr('src', '/assets/images/icon-sun.svg');
        $('.navbar__img').attr('src', '/assets/images/logo-dark-theme.svg');
        $('#navbar__theme-switcher img').attr('alt', 'Switch to Light Theme');
      } else {
        $('#navbar__theme-switcher img').attr('src', '/assets/images/icon-moon.svg');
        $('.navbar__img').attr('src', '/assets/images/logo-light-theme.svg');
        $('#navbar__theme-switcher img').attr('alt', 'Switch to Dark Theme');
      }

    });



    function updateStats(){
        const text = $("#userInput").val().toLowerCase();
        const excludeSpaces = $("#excludeSpaces").is(':checked');

        const totalCharacters = excludeSpaces ? text.replace(/\s/g, '').length : text.length;
        const totalWords = text.trim().split(/\s+/).filter(Boolean).length;
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
        const totalSentences = sentences.length;

        $("#scores__char-count h5").text(totalCharacters);
        $("#scores__word-count h5").text(totalWords);
        $("#scores__sent-count h5").text(totalSentences);

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

        const letterCountsMap = letterCounts(text, excludeSpaces);

        // make sure out output doesn't include 0 and start iterating 
        let totalLetters = 0;
        for(let count of letterCountsMap.values())   {
            totalLetters += count;
        }

        const progressBarContainer = $("#progress-bar-container");
        // very important line so that the progress bars are constantly repeated
        // suggested by AI
        progressBarContainer.empty();


        if(totalLetters === 0){
            $(".letter-density__content").text = "No Characters found. Start typing to see letter density";
        }
        else {
             $(".letter-density__content").text('');
            for (const [char, count] of letterCountsMap.entries()) {
            const percentage = (count / totalLetters) * 100;

            const progBar = $("<div></div>").addClass("mb-2 d-flex align-items-center");
            progBar.append(`
                <span class="pe-2">${char.toUpperCase()}</span>
                <div class="progress flex-grow-1 role="progressbar">
                        <div class="progress-bar bg-Purple rounded" style="width: ${percentage.toFixed(2)}%;" aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${totalCharacters}"></div>
                    </div>

                    <span class="ps-2">${percentage.toFixed(2)}%</span>
                `);
                progressBarContainer.append(progBar);
            }
        }

    }
    // call updates stats "on" change of the textarea (userinput)
    $("#userInput, #excludeSpaces").on("input change", updateStats);
// end document ready()
});