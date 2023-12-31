# [🔒 CODE CRACKER 🔓](https://meg-coningsby.github.io/mastermind-game-project1/)

This is Project 1 for my General Assembly Course - Software Engineering Immsersive.

**Table of Contents:**

-   [Game Overview](#item-one)
-   [Technologies Used in Game](#item-two)
-   [Getting Started](#item-three)
-   [Game Screenshots](#item-four)
-   [Next Steps](#item-five)

<a id="item-one"></a>

## 📖 Game Overview

My take on the classic childhood game - Mastermind.

A hidden code has been set and it is your job to try and figure it out. Get feedback after each guess to help you get closer to the solution. You only have a limited amount of guesses - so make them count!

<a id="item-two"></a>

## 💻 Technologies Used in Game

This game is coded using:

-   JavaScript
-   HTML
-   CSS

<a id="item-three"></a>

## 🏁 Getting Started

Want to give the game a go? Head over to [CODE CRACKER](https://meg-coningsby.github.io/mastermind-game-project1/) to play.

There are instructions listed over on the webpage - but in case you want a sneak peek:

-   When you head to the page, a new code solution is generated for you to try and guess. This solution is hidden, so you won't be able to see it until you either win, or it is game over!
-   Start the game by choosing your first pin guess. Your guess will be added to the first available guess row, and the pins will be populated left to right.
-   Once you have selected four pins for your guess - you will see 'feedback' given in the area next to your guess.
    -   A black pin means one of your guess pins is the right colour **and** in the right location.
    -   A white pin means one of your guess pins is the right colour but not in the right location.
    -   Note: the location these pins appear in the feedback grid is not related to the same location guess pin (i.e. if you get a black pin in the first feedback pin location, this doesn't mean your first guess pin is the right colour and location, it just means one of your guess pins is the right colour and location - you'll need to figure out which one that is).
-   The game is won when your guess pins match the solution pins, in both colour and location.
-   If you reach the end of all the guess rows and you haven't guessed correctly, it will be **game over**! The solution will be uncovered so you can see what you were trying to guess.

<a id="item-four"></a>

## 📸 Game Screenshots

Game header:
![](./resources/header-screenshot.png)

Game instructions:
![](./resources/instructions-screenshot.png)

Empty game board:
![](./resources/empty-game-board-screenshot.png)

Game board - won:
![](./resources/won-game-screenshot.png)

Game board - game over:
![](./resources/game-over-screenshot.png)

Game board & buttons:
![](./resources/game-board-and-buttons.png)

<a id="item-five"></a>

## ⏭️ Next steps

Planned future enhancements for the game:

-   The ability to input a name so you can add your name to your score on the scoreboard
-   The ability to customise the game, for example:
    -   Choose the length of the solution code
    -   Choose how many guesses you have
    -   Allow or disallow duplicates in the solution code
    -   Allow or disallow blanks in the solution code
-   Choose a 'theme' for the game area, for example swap from pins to images etc.
