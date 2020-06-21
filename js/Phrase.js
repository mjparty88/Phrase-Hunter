/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
   constructor(phrase) {
     this.phrase = phrase.toLowerCase()
   }
   addPhraseToDisplay() {
     /*
        this adds letter placeholders to the display when the game starts.
        Each letter is presented by an empty box, one li element for each letter.
        See the example_phrase_html.txt file for an example of what the rendered HTML for a phrase should look like when the game starts
        including any id or class attributes needed. When the player correctly guesses a letter,
        the empty box is replaced with the matched letter (see the showMatchedLetter() method below).
        Make sure the phrase displayed on the screen uses the letter CSS class for letters and the space CSS class for space
     */
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
   checkLetter(letter) {
     /*
      checks to see if the letter selected by the player matches a letter in the phrase.
     */
     if(this.phrase.includes(letter)){
      return true
     } else {
      return false
     }

   }
   showMatchedLetter(letter) {
     /*
      reveals the letter(s) on the board that matches the player's selection.
      To reveal the matching letter(s), select all of the letter DOM elements that have a CSS class name
      that matches the selected letter and replace each selected element's hide CSS class with the show CSS class
     */
     let matchedLettersCollection = document.getElementsByClassName(`hide letter ${letter}`);
     let matchedLetters = [...matchedLettersCollection] //converted the HTML into an array with a spread operator
     matchedLetters.forEach(matchedLetter => matchedLetter.className = matchedLetter.className.replace(/hide/,'show'));
     console.log(matchedLetters)
   }
 }
