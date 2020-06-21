/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game

/* reset addEventListener()
- creates a new game
- starts the game
*/

document.getElementById('btn__reset').addEventListener('click', () => {
  game = new Game()
  game.startGame()
})

/* keyCollection addEventListener()
- adds an event listener on each individual key
- on click of the key, calls the game.handleInteraction() function (passing to it the button object clicked)
*/

const keyCollection = document.getElementsByClassName("key")
const keyArray = [...keyCollection]
keyArray.forEach(key => key.addEventListener('click', (e) => {
  game.handleInteraction(e.target)
}));

/* keydown addEventListener()
- adds an event listener on the document for keyboard strikes
- calls the game.handleInteraction() function, passing to it the equivalent button that is represented by the keydown character
*/

document.addEventListener("keydown", (e) => {
  const keyRows = document.querySelectorAll(".keyrow")
  const keysArray1 = [...keyRows[0].children]
  const keysArray2 = [...keyRows[1].children]
  const keysArray3 = [...keyRows[2].children]
  const keys = [...keysArray1, ...keysArray2, ...keysArray3]
  let regex = /[a-zA-Z]/
  if(regex.test(e.key)) {
    keys.forEach(key => {
      if(key.innerHTML == e.key) {
        game.handleInteraction(key)
      }
    })
  }
})
