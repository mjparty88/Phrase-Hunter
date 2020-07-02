/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {

   /* game constructor
      - initialised misses as 0
      - initialises with a hardcoded array of 5 phrase objects
      - initialises with no activePhrase (which is set on startGame())
   */

   constructor() {
    this.missed = 0 //doesn't need to be passed to the constructor. It's automatically zero on creation.
    this.phrases = [{phrase: 'golden arches'}, {phrase: 'cat in the hat'} , {phrase: 'look at the time'}, {phrase: 'horses for courses'}, {phrase: 'the cake is a lie'} ];
    this.activePhrase = null
   }

   /* function startGame()
   - hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase.
   - It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object
   */
  startGame() {

    document.getElementById("overlay").style.display = "none"
    this.activePhrase = new Phrase(this.getRandomPhrase(this.phrases))
    this.activePhrase.addPhraseToDisplay()
  }

  /* function getRandomPhrase()
  - this method randomly retrieves one of the objects stored in the phrases array
  - returns a string containing the phrase contained in the randomly selected object
  */

  getRandomPhrase() {

    const randomIndex = Math.floor(this.phrases.length*Math.random())
    return this.phrases[randomIndex].phrase
  }

  /* function handleInteraction()
  @ param - (accepts an button object as an object)
  his method controls most of the game logic. It checks to see if the button clicked by the player matches a letter in the phrase,
  and then directs the game based on a correct or incorrect guess. This method should
  - Disable the selected letter’s onscreen keyboard button
  - If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method
  - If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method.
  If the player has won the game, also call the gameOver() method
  */

  handleInteraction(button) {

      button.disabled = true;
      if(this.activePhrase.checkLetter(button.innerHTML)){
          //if the letter is in the activePhrase
        button.className = "chosen"
        this.activePhrase.showMatchedLetter(button.innerHTML)
        if(this.checkForWin()) {
          this.gameOver(this.checkForWin())
        }
      } else { //else if the letter is is not the activePhrase
        button.className = "wrong"
        this.removeLife()
      }

  }

  /* function removeLife()
  - this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image
  - increments the missed property.
  - If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method
  */

  removeLife() {

    const tries = document.querySelectorAll(".tries")
    tries[this.missed].firstElementChild.setAttribute("src","images/lostHeart.png")
    this.missed += 1
    this.changeBackgroundRed()
    if(this.missed == 5) {
      this.gameOver(this.checkForWin())
    }
  }

  /* checkForWin()
  - this method checks to see if the player has revealed all of the letters in the active phrase
  - returns true or false
  */

  checkForWin() {

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

  /* clearKeys()
  - resets all the defaults for the onscreen keyboard
  - helps to reset the game
  */

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

  /* resetGame()
  - resets missed to 0
  - resets activePhrase to null
  - removes the previous phrase from the DOM (to be reappended when a new game starts)
  - restors all life hearts
  - calls for keys to be cleared
  */

  resetGame() {
    const phraseUl = document.getElementById("phrase").firstElementChild;
    this.missed = 0
    this.activePhrase = null
      phraseUl.innerHTML = '';
   for(let i = 0; i < document.querySelectorAll(".tries").length ; i+=1 ) {
     document.querySelectorAll(".tries")[i].firstElementChild.setAttribute("src","images/liveHeart.png")
   }
   this.clearKeys()
   document.querySelector(".main-container").style.backgroundColor = '';
  }

  /* gameOver()
  @params - receives a gameWon object (representing a boolean value of true or false) as an argument
  - if the game was one, it returns the overlay green with a Congratulations message
  - otherwise, it returns a red overlay with a commiserations message
  */

  gameOver(gameWon) {

    if (gameWon) {
      document.getElementById("game-over-message").innerHTML = "Congratulations, you won!"
      document.getElementById("overlay").className = "win"
      document.getElementById("overlay").style.display = ""
    }
    else {
      document.getElementById("game-over-message").innerHTML = "Better luck next time!"
      document.getElementById("overlay").className = "lose"
      document.getElementById("overlay").style.display = ""
    }
    this.resetGame()
  }

  /* changeBackgroundRed()
  - changes the backgroundColor of the main-container div to a deeper shade of red, as missed increases
  */
  changeBackgroundRed(){
      let alpha = this.missed*0.20
      document.querySelector(".main-container").style.backgroundColor = `rgba(245,120,95,${alpha})`;
  }
 }
