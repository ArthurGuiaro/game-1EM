let bikerIdle = new Image()
bikerIdle.src = "/images/1 Biker/Biker_idle.png"

let bikerIdleLeft = new Image()
bikerIdleLeft.src = "/images/1 Biker/Biker_idle_left.png"

let heart = new Image()
heart.src = "/images/pngwing.com (2).png"

let paper = new Image()
paper.src = "/images/paper.png"

let load = 0
let game = {
  ctx: document.querySelector("canvas").getContext("2d"),
  width: 867,
  height: 487
}

class Character {
  constructor(image, numSprites, x, y, width, height) {
    this.image = image
    this.image.onload = this.draw
    this.imgWidth = this.image.width
    this.spriteWidth = null
    this.numSprites = numSprites
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
    if (this.x + this.speedX > 350) {
      this.x = 350
    } if (this.x + this.speedX < 0) {
      this.x = 0
    } if (this.y + this.speedY > 365) {
      this.y = 365
    } if (this.y + this.speedY < 230) {
      this.y = 230
    }
    else {
      this.x += this.speedX
      this.y += this.speedY
    }
  }

  draw() {
    this.spriteWidth = this.imgWidth / this.numSprites
    game.ctx.drawImage(this.image, this.spriteWidth * this.numSprite, 0, this.spriteWidth, 58, this.x, this.y, this.width, this.height)

  }
}

let player = new Character(bikerIdle, 4, 200, 350, 150, 140)

class Paper {
  constructor(image, x, y, width, height, phrase, correctPhrase, wrongPhrase) {
    this.image = image
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.phrase = phrase
    this.correctPhrase = correctPhrase
    this.wrongPhrase = wrongPhrase
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

let papers = [new Paper(paper, 900, 400, 32, 32, null, null, null)]

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

      player.hp = 0
    }
}
  // if () {



  //   // let y = 20
  //   // let maxWidth = 341
  //   // let minWidth = 40
  //   // let width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth)

  //   // let minGap = 119
  //   // let maxGap = 341
  //   // let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)

  //   // obstacles.push(new component("none", "red", 0, y, width, 30))
  //   // obstacles.push(new component("none", "red", width + gap, y, 700 - width - gap, 30))
  // }




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
  if (player.x + player.speedX > 350) {
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
  backgroundImage.draw();
  player.newPos()
  player.draw()
  updatePapers()
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

  pickPaper()


  requestAnimationFrame(updateCanvas);
}

// start calling updateCanvas once the image is loaded
backgroundImage.img.onload = updateCanvas;


document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      player.speedY = -10
      break
    case 'ArrowDown':
      player.speedY = 10
      break
    case 'ArrowLeft': // left arrow
      player.image = bikerIdleLeft
      player.speedX = -6
      break
    case 'ArrowRight': // right arrow
      player.image = bikerIdle
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

