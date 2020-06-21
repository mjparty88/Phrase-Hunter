/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const phrases = ['golden arches', 'cat in the hat', 'look at the time', 'horses for course', 'the cake is a lie'];

let game

document.getElementById('btn__reset').addEventListener('click', () => {
  game = new Game()
  game.startGame()
})

const keyCollection = document.getElementsByClassName("key")
const keyArray = [...keyCollection]
keyArray.forEach(key => key.addEventListener('click', (e) => {
  game.handleInteraction(e.target)
}));

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
