/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor() {
    this.missed = 0 //doesn't need to be passed to the constructor. It's automatically zero on creation.
    this.phrases = ['golden arches', 'cat in the hat', 'look at the time', 'horses for courses', 'the cake is a lie']
    this.activePhrase = null
   }

  startGame() {
    /*
    hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase.
    It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object
    */
    document.getElementById("overlay").style.display = "none"
    this.activePhrase = new Phrase(this.getRandomPhrase(phrases))
     //It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object
     this.activePhrase.addPhraseToDisplay()

  }
  getRandomPhrase() {
    /*
    this method randomly retrieves one of the phrases stored in the phrases array and returns it
    */
    const randomIndex = Math.floor(this.phrases.length*Math.random())
    return phrases[randomIndex]
  }
  handleInteraction(button) {
    /*
    this method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase,
    and then directs the game based on a correct or incorrect guess. This method should
    - Disable the selected letter’s onscreen keyboard button
    - If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method
    - If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method.
    If the player has won the game, also call the gameOver() method
    */

      button.disabled = true;
      if(this.activePhrase.checkLetter(button.innerHTML)){
          //true
        button.className = "chosen"
        this.activePhrase.showMatchedLetter(button.innerHTML)
      } else {
        button.className = "wrong"
        this.removeLife()//false
      }
      if(this.checkForWin()) {
        this.gameOver(this.checkForWin())
      }
  }
  removeLife() {
    /*
    this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image
    (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives),
    then end the game by calling the gameOver() method
    */
    const tries = document.querySelectorAll(".tries")
    tries[this.missed].firstElementChild.setAttribute("src","images/lostHeart.png")
    this.missed += 1
    if(this.missed == 5) {
      this.gameOver(this.checkForWin())
    }
  }
  checkForWin() {
    /*
    this method checks to see if the player has revealed all of the letters in the active phrase
    */
    let gameWon = false
    const phrase = document.getElementById("phrase")
    const phraseCollection = phrase.firstElementChild.children
    const phraseArray = [...phraseCollection]
    let remainingToGuess = 0
    const regex = /hide letter/
    phraseArray.forEach((phraseItem) => {
        if(regex.test(phraseItem.className)) {
          remainingToGuess += 1
      }
    })
    if(remainingToGuess > 0 ) {
      gameWon = false
    } else {
      gameWon = true
    }
    return gameWon
  }

  clearKeys(){
    const keyRows = document.querySelectorAll(".keyrow")
    const keysArray1 = [...keyRows[0].children]
    const keysArray2 = [...keyRows[1].children]
    const keysArray3 = [...keyRows[2].children]
    const keys = [...keysArray1, ...keysArray2, ...keysArray3]
    keys.forEach(key => {
      key.className = "key";
      key.disabled = false;
    })
  }

  resetGame() {
    const phraseUl = document.getElementById("phrase").firstElementChild;
    this.missed = 0
    this.activePhrase = null
      phraseUl.innerHTML = '';
   for(let i = 0; i < document.querySelectorAll(".tries").length ; i+=1 ) {
     document.querySelectorAll(".tries")[i].firstElementChild.setAttribute("src","images/liveHeart.png")
   }
   this.clearKeys()
  }

  gameOver(gameWon) {
    /*
    this method displays the original start screen overlay, and depending on the outcome of the game,
    updates the overlay h1 element with a friendly win or loss message,
    and replaces the overlay’s start CSS class with either the win or lose CSS class
    */
    document.getElementById("overlay").style.display = ""
    if(gameWon) {
      document.getElementById("game-over-message").innerHTML = "Congratulations, you won!"
      document.getElementById("overlay").className = "win"
    }
    else {
      document.getElementById("game-over-message").innerHTML = "Better luck next time!"
      document.getElementById("overlay").className = "lose"
    }
    this.resetGame()
  }
 }
