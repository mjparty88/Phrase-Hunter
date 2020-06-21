/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */



 class Phrase {

   /* phrase constructor 
      @params - takes a phrase object (a string) as an argument
      - converst the  phrase arguement to toLowerCase and stores it in this.phrase
   */

   constructor(phrase) {
     this.phrase = phrase.toLowerCase()
   }

   /* function addPhraseToDisplay()
      -  adds letter placeholders to the display when the game starts, one li element for each letter
      - class attributes are included so CSS for letters and the space CSS for space are applied
   */
   addPhraseToDisplay() {

     const phraseUl = document.getElementById("phrase").firstElementChild;
     const regex = /\s/
     for (let i = 0; i < this.phrase.length; i+=1) {
        let characterLi = document.createElement("li")
        if(regex.test(this.phrase[i])) {
          characterLi.className = `space`
        } else {
          characterLi.className = `hide letter ${this.phrase[i]}`
          characterLi.innerHTML = this.phrase[i]
        }
          phraseUl.appendChild(characterLi)
        }
   }

   /* function checkLetter()
    @params - accepts a letter object (representing single character string) as an argument
    - checks to see if the letter selected by the player matches a letter in the phrase.
    - returs true or false
   */
   checkLetter(letter) {

     if(this.phrase.includes(letter)){
      return true
     } else {
      return false
     }

   }

   /* showMatchedLetter(letter)
   @params - accepts a letter object (representing a single character string) as an argument
   -  reveals the letter(s) on the board that matches the player's selection bu replacing the 'hide' part of the li's class name with 'show'
   */

   showMatchedLetter(letter) {

     let matchedLettersCollection = document.getElementsByClassName(`hide letter ${letter}`);
     let matchedLetters = [...matchedLettersCollection] //converted the HTML into an array with a spread operator
     matchedLetters.forEach(matchedLetter => matchedLetter.className = matchedLetter.className.replace(/hide/,'show'));
   }
 }
