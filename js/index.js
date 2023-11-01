let bikerIdle = new Image()
bikerIdle.src = "./images/1 Biker/Biker_hurt.png"

let bikerIdleLeft = new Image()
bikerIdleLeft.src = "./images/1 Biker/Biker_idle_left.png"

let heart = new Image()
heart.src = "./images/pngwing.com (2).png"

let paper = new Image()
paper.src = "./images/paper.png"

let firstBossImg = new Image()
firstBossImg.src = "./craftpix-net-413641-free-forest-bosses-pixel-art-sprite-sheet-pack/1/Hurt.png"

let secondBossImg = new Image()



let thirdBossImg = new Image()

let load = 0
let canvas = document.querySelector("canvas")
let game = {
  ctx: document.querySelector("canvas").getContext("2d"),
  width: 867,
  height: 487
}

class Character {
  constructor(image, spriteWidth, spriteHeigth, x, y, width, height) {
    this.image = image
    this.image.onload = this.draw
    this.imgWidth = this.image.width
    this.spriteWidth = spriteWidth
    this.spriteHeigth = spriteHeigth
    this.start = 0
    this.numSprite = 1
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.hp = 10
  }

  top() {
    return this.y
  }

  bottom() {
    return this.y + this.height
  }

  left() {
    return this.x
  }

  right() {
    return this.x + this.width
  }

  crash(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    )
  }

  newPos() {
    if (square.style.display === "none" && !isBattling) {
      if (this.image === firstBossImg || this.image === secondBossImg || this.image === thirdBossImg) {
      } else {
        if (this.x + this.speedX > 350) {
          this.x = 350
        } if (this.x + this.speedX < 0) {
          this.x = 0
          player.speedX = 0
        }

      }
      if (this.y + this.speedY > 365) {
        this.y = 365
      } if (this.y + this.speedY < 230) {
        this.y = 230
      }
      else {
        this.x += this.speedX
        this.y += this.speedY
      }
    }
  }
  
  draw() {
    
    game.ctx.drawImage(this.image, this.start, this.spriteHeigth, this.spriteWidth, 58, this.x, this.y, this.width, this.height)
    
  }
}

let player = new Character(bikerIdle, 35, 0, 200, 350, 130, 120)
let firstBoss = new Character(firstBossImg, 100, 38, 5000, 320, 200, 140)
let isBattling = false
let rounds = 5
let square = document.querySelector(".square")
let blackSquare = document.querySelector("#black-square")
let text1 = document.querySelector("#text-1")
let text2 = document.querySelector("#text-2")
let interval = null
let i = 0

function checkResult() {
  console.log("oi")
  if (player.hp <= 0 ) {
    square.style.display = "none"
    setTimeout(() => {
      text1.innerHTML = "¡Tú perdiste!"
      text2.innerHTML = "Hecho por:<br>Dirceu, Eduardo, Enrico, Giovani,<br>Leonardo, Lucas antonini, Lucas Gentil e Márcio."
      
      clearInterval(interval)
    }, 2000)
    interval = setInterval(() => {
      i += 0.05
      blackSquare.style.backgroundColor = `rgba(0, 0, 0, ${i})`
      
    }, 100)
  }
  
  if ((papers.length === 0 && player.hp > 0) || (firstBoss.hp <= 0 )) {
    square.style.display = "none"
    setTimeout(() => {
      text1.innerHTML = "¡Felicidades, ganaste!"
      text2.innerHTML = "Hecho por:<br>Dirceu, Eduardo, Enrico, Giovani,<br>Leonardo, Lucas antonini e Lucas Gentil."
      clearInterval(interval)
    }, 2000)
    interval = setInterval(() => {
      i += 0.05
      blackSquare.style.backgroundColor = `rgba(0, 0, 0, ${i})`

    }, 100)
  }

  
}

function startBattle() {
  let status = player.crash(firstBoss)




  if (status) {
    console.log("start")
    prepareBatlle()
  }
}

function prepareBatlle() {
  player.x = 180
  player.y = firstBoss.y + 40
  firstBoss.x = 500
  isBattling = true
  setTimeout(() => {
    console.log("tchau")
    showTexts()
    clearInterval(interval)
    i= 0
  }, 2000)
  interval = setInterval(() => {
    i += 0.05
    blackSquare.style.backgroundColor = `rgba(0, 0, 0, ${i})`

  }, 100)

  setInterval(updateCanvas, 100)

}

function showTexts() {
  console.log("oi")
  text1.innerHTML = "Preparate..."
  setTimeout(() => text1.innerHTML = "La batalla comenzará en:", 1000)
  setTimeout(() => text2.innerHTML = "3", 2000)
  setTimeout(() => text2.innerHTML = "2", 3000)
  setTimeout(() => text2.innerHTML = "1", 4000)
  setTimeout(() => {
    blackSquare.style.display = "none"
    drawQuestion()
  }, 5000)
  setTimeout(() => {
    blackSquare.style.backgroundColor = `rgba(0, 0, 0, 0)`
    text1.innerHTML = ""
    text2.innerHTML = ""
    blackSquare.style.display = "flex"
    
  }, 6000)

}

class Paper {
  constructor(image, x, y, width, height, phrase, correctAnswer, wrongAnswer) {
    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.phrase = phrase
    this.correctAnswer = correctAnswer
    this.wrongAnswer = wrongAnswer
  }
  
  top() {
    return this.y
  }
  
  bottom() {
    return this.y + this.height
  }
  
  left() {
    return this.x
  }
  
  right() {
    return this.x + this.width
  }
  
  
  
  newPos() {
    if (this.x + this.speedX < 10) {
      this.x = 10
    }
    else {
      this.x += this.speedX
    }
    this.y += this.speedY
    
  }
  
  crash(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
      )
    }
    
    draw() {
      game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    
  }
  
  
  let firstPaper = new Paper(paper, 900, 450, 32, 32, "En un adelantamineto el correcto es adelantar por el lado:", "Izquierdo", "Derecho")
  let secondPaper = new Paper(paper, 1800, 350, 32, 32, "El coche deve conducirse por el lado:", "Derecho", "Izquierdo")
  let thirdPaper = new Paper(paper, 2700, 420, 32, 32, "El nivel de alcohol en sangre no puede exceder:", "0,5 g/l", "1,0 g/l")
  let fourthPaper = new Paper(paper, 3600, 380, 32, 32, "La edad minima para viajar en el asiento delantero de un coche es:", "10 años", "12 años")
  let fifthPaper = new Paper(paper, 7000, 420, 32, 32, "Accesorio que no es de uso obligatorio y cuya función es reducir el impacto del cuerpo del conductor con el vehículo, en caso de accidente, es:", "Bolsa de aire", "Cinturón de seguridad")
  let sixthPaper = new Paper(paper, 7000, 400, 32, 32, "Si no hay freno, el procedimiento adecuado es:", "Reducir la marcha", "Tirar bruscamente del freno de mano")
  let seventhPaper = new Paper(paper, 7000, 400, 32, 32, "Es necesario señalizar el lugar del accidente lo más rápidamente posible para:", "Prevenir la aparición de nuevos accidentes", "Obligar a otros conductores a detenerse")
  let eighthPaper = new Paper(paper, 7000, 400, 32, 32, "El uso de teléfono en el tráfico:", "Es permitido, desde que sea una emergencia", "Prohibido")
  let ninethPaper = new Paper(paper, 7900, 400, 32, 32, "", "", "")
  let tenthPaper = new Paper(paper, 7500, 400, 32, 32, "", "", "")
  
  let papers = [firstPaper, secondPaper, thirdPaper, fourthPaper, fifthPaper, sixthPaper, seventhPaper, eighthPaper]
  
  function updatePapers() {
    papers.forEach(paper => {
      paper.newPos()
      if (paper.x + paper.speedX < 10) {
        backgroundImage.speed = 0
        
      }
      paper.draw()
    })
    
  }
  
  function pickPaper() {
    let status = papers.some((paper) => {
      return player.crash(paper)
    })
    
    
    
    if (status) {
      if (!paperStatus) {
        
        drawQuestion()
        
      }
    }
  }
  
  let question = document.querySelector(".question")
  let rightButton = document.querySelector("#right-button")
  let leftButton = document.querySelector("#left-button")
  let questionDiv = document.querySelector("#question-div")
  let buttonsDiv = document.querySelector("#buttons-div")
  square.style.display = "none"
  let result = document.querySelector("#result")
let paperStatus = false

let correctAnswer
let wrongAnswer

let buttons = [leftButton, rightButton]

buttons.forEach(button => {
  button.addEventListener("click", () => checkAnswer(button.innerHTML))
})

function drawQuestion() {
  paperStatus = true
  
  console.log("desenhando")
  console.log(papers)
  updateButtons()
  
  
  question.innerHTML = papers[0].phrase
  square.style.display = "flex"
  questionDiv.style.display = "flex"
  buttonsDiv.style.display = "flex"
  
  
  
  
}

function checkAnswer(alternative) {
  console.log(alternative)
  
  if (papers[0].correctAnswer === alternative) {
    showResult(true)
    if (papers.length > 3) firstBoss.hp -= 0
    else { firstBoss.hp -= 4 }
  }
  else {
    showResult(false)
    if (papers.length > 3) player.hp -= 1
    else { player.hp -= 5 }
    
  }
  
  
  
  
}

function showResult(boolean) {
  
  questionDiv.style.display = "none"
  buttonsDiv.style.display = "none"
  result.style.display = "flex"
  if (boolean) {
    result.style.color = "green"
    result.innerHTML = "¡Correcto!"
  } else {
    result.style.color = "red"
    result.innerHTML = "¡Incorrecto!"
    
  }
  
  setTimeout(() => {
    
    square.style.display = "none"
    result.style.display = "none"
    
    paperStatus = false
    checkResult()
    if (papers.length < 4 && player.hp > 0) drawQuestion()
    console.log(papers)
}, 2000)
papers.shift()

}

function updateButtons() {
  correctAnswer = papers[0].correctAnswer
  wrongAnswer = papers[0].wrongAnswer
  
  let answers = [correctAnswer, wrongAnswer]
  
  let e = Math.floor(Math.random() * answers.length)
  
  leftButton.innerHTML = answers[e]
  answers.splice(answers.indexOf(answers[e]), 1)
  
  let o = Math.floor(Math.random() * answers.length)
  
  rightButton.innerHTML = answers[o]
  
}


function updateHp() {
  game.ctx.drawImage(heart, 20, 20, 40, 32)
  game.ctx.fillStyle = "black"
  game.ctx.fillRect(60, 28, 82, 2)//cima
  game.ctx.fillRect(60, 28, 2, 17)//esquerda
  game.ctx.fillRect(142, 33, 7, 10)//cima bico
  game.ctx.fillRect(147, 33, 2, 10)//esquerda bico
  game.ctx.fillRect(142, 41, 7, 2)//embaixo bico
  game.ctx.fillRect(142, 28, 2, 17)//direita
  game.ctx.fillRect(60, 45, 84, 2)//embaixo
  
  if (player.hp > 2) game.ctx.fillStyle = "orange"
  if (player.hp > 4) game.ctx.fillStyle = "yellow"
  if (player.hp > 6) game.ctx.fillStyle = "green"
  if (player.hp < 3) game.ctx.fillStyle = "red"
  game.ctx.fillRect(62, 30, 8 * player.hp, 15)//preenchimento
  game.ctx.fillStyle = "black"
  game.ctx.fillRect(70, 30, 1, 15)//1...
  game.ctx.fillRect(78, 30, 1, 15)
  game.ctx.fillRect(86, 30, 1, 15)
  game.ctx.fillRect(94, 30, 1, 15)
  game.ctx.fillRect(102, 30, 1, 15)
  game.ctx.fillRect(110, 30, 1, 15)
  game.ctx.fillRect(118, 30, 1, 15)
  game.ctx.fillRect(126, 30, 1, 15)
  game.ctx.fillRect(134, 30, 1, 15)
  
  game.ctx.fillRect(142, 30, 1, 15)//...10


  /////////////////////////////////////////////////////

  if (isBattling) {
    game.ctx.drawImage(heart, 530, 300, 40, 32)
    game.ctx.fillStyle = "black"
    game.ctx.fillRect(570, 308, 82, 2)//cima
    game.ctx.fillRect(570, 308, 2, 17)//esquerda
    game.ctx.fillRect(652, 313, 7, 10)//cima bico
    game.ctx.fillRect(657, 313, 2, 10)//esquerda bico
    game.ctx.fillRect(652, 321, 7, 2)//embaixo bico
    game.ctx.fillRect(652, 308, 2, 17)//direita
    game.ctx.fillRect(570, 325, 84, 2)//embaixo

    if (firstBoss.hp > 2) game.ctx.fillStyle = "orange"
    if (firstBoss.hp > 4) game.ctx.fillStyle = "yellow"
    if (firstBoss.hp > 6) game.ctx.fillStyle = "green"
    if (firstBoss.hp < 3) game.ctx.fillStyle = "red"
    game.ctx.fillRect(572, 310, 8 * firstBoss.hp, 15)//preenchimento
    game.ctx.fillStyle = "black"
    game.ctx.fillRect(580, 310, 1, 15)//1...
    game.ctx.fillRect(588, 310, 1, 15)
    game.ctx.fillRect(596, 310, 1, 15)
    game.ctx.fillRect(604, 310, 1, 15)
    game.ctx.fillRect(612, 310, 1, 15)
    game.ctx.fillRect(620, 310, 1, 15)
    game.ctx.fillRect(628, 310, 1, 15)
    game.ctx.fillRect(636, 310, 1, 15)
    game.ctx.fillRect(644, 310, 1, 15)

    game.ctx.fillRect(652, 310, 1, 15)
  }

}



const backgroundImage = {
  img: background,
  x: 0,
  speed: -5,

  move: function () {
    this.x += this.speed;
    this.x %= game.width;
  },

  draw: function () {
    game.ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      game.ctx.drawImage(this.img, this.x + game.width, 0);
    } else {


      game.ctx.drawImage(this.img, this.x + this.img.width, 0);

    }
  },
};

function updateCanvas() {
  backgroundImage.move();
  

  game.ctx.clearRect(0, 0, game.width, game.height);
  if (player.x + player.speedX > 350 && !paperStatus) {
    backgroundImage.speed = -5
    papers.forEach(paper => {
      paper.speedX = -5
    })

  } else {
    backgroundImage.speed = 0
    papers.forEach(paper => {
      paper.speedX = 0
    })
  }
  if (paperStatus) backgroundImage.speed = 0

  if (player.speedX !== 0 && square.style.display === "none") firstBoss.speedX = player.speedX * -1
  if (player.speedX === 0) firstBoss.speedX = 0

  backgroundImage.draw();


  if (!paperStatus || !isBattling) player.newPos()

  firstBoss.newPos()
  player.draw()
  firstBoss.draw()
  updatePapers()
  updateHp()
  pickPaper()
  startBattle()




  requestAnimationFrame(updateCanvas);
}



// start calling updateCanvas once the image is loaded
let start= document.querySelector("#start")
start.onclick = ()=>{
  start.style.display = "none"
  blackSquare.style.backgroundColor = `rgba(0, 0, 0, 0)`
  updateCanvas()
};


document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      player.speedY = -10
      break
    case 'ArrowDown':
      player.speedY = 10
      break
    case 'ArrowLeft': // left arrow
      if (square.style.display === "none" && !isBattling) player.image = bikerIdleLeft
      player.speedX = -6
      break
    case 'ArrowRight': // right arrow
      if (square.style.display === "none" && !isBattling) player.image = bikerIdle
      player.speedX = 6
      break
    case 'Control': // control
      if (!game.running) game.startGame()
      else game.pause()
      break
  }
})

document.addEventListener('keyup', (e) => {
  player.speedX = 0
  player.speedY = 0
})

canvas.onclick = dispara

function dispara(pCordenadas) {
  let lValorX = pCordenadas.pageX - canvas.offsetLeft;
  let lValorY = pCordenadas.pageY - canvas.offsetTop;

  console.log(lValorX)
  console.log(lValorY)
  console.log(pCordenadas)
  //const lDiferencaY = lValorY > 202 ? lValorY - 202 : lValorY; 
  //const lDiferencaX = lValorX > 302 ? lValorX - 302 : lValorX;

  if ((lValorY >= 190 && lValorY <= 210) && (lValorX >= 290 && lValorX <= 310)) {
    alert("Acertou!")
  }
}


