Mastermind

-   randomise the ‘code’
-   ability to choose colour each for your guess
-   a button to confirm your guess
-   feedback table (correct colour & position, correct colour but not position, blank for not correct at all etc.)
-   win / lose (you run out of tries without winning)
-   reset the game

## stretch ideas:

-   have cute images rather than colours for the balls
-   option to choose a theme for your game?
-   insert your name to play
    -   high score table
    -   tally of wins
-   confetti when you win?
-   code can include blank spaces?
-   ability to customise the game board:
    -   you can set the number of guess rows you get
    -   you can set the number of pins in the code

## starting the js

1. render the initial state
    - create an array for the solution code
    - create an array for the guess rows
    - create an array for the feedback rows
1. randomise the solution code
    - create a function that picks four random numbers, that coresponds to colours.
    - convert the divs to that colour
    - hide the solution code
1. create an event that registers when you click one of the coloured circles in the selections area
    - first just console log the click
    - then get it to fill the next available spot in the next available row with that colour
1. check the guess code against the solution code once one guess row is complete
    - first just console log the answers
    - then get it to fill in the feedback row with the correct feedback
1. create the check win function
1. create the game ends function
1. add the calculate score functionality
1. add functionality to the two buttons
