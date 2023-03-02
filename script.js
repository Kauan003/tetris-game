let Board =[]

let A_rotate = [
    [
        [1,1,0],
        [1,0,0],
        [1,0,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,0,1]
    ],
    [
        [0,0,1],
        [0,0,1],
        [0,1,1]
    ]

]
let B_rotate = [
    [
        [1,0,0],
        [1,0,0],
        [1,1,0],
    ],
    [
        [0,0,0],
        [1,1,1],
        [1,0,0],
    ],
    [
        [0,1,1],
        [0,0,1],
        [0,0,1],
    ]
]
let C_rotate = [
   [
    [1,0,0],
    [1,1,0],
    [0,1,0]
]
]
let D_rotate = [
   [
    [0,1,0],
    [1,1,0],
    [1,0,0]
]
]
let E_rotate  = [
    [
        [0,1,0],
        [0,1,1],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    [
        [0,1,0],
        [1,1,0],
        [0,1,0]
    ]
]
let F_rotate = [
 [ 
    [0,0,0],
    [1,1,0],
    [1,1,0]
]
]
let G_rotate  = [
    [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
]
]

let A = [
    [0,0,0],
    [1,0,0],
    [1,1,1]
]
let B = [
    [0,0,0],
    [0,0,1],
    [1,1,1],
]
let C = [
    [0,0,0],
    [1,1,0],
    [0,1,1]
]
let D = [
    [0,0,0],
    [0,1,1],
    [1,1,0]
]
let E = [
    [0,0,0],
    [0,1,0],
    [1,1,1]
]
let F = [
    [0,0,0],
    [1,1,0],
    [1,1,0]
]
let G = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1]
]

let defaultColor = '#111111'
let BorderColor = "red"
let square = 30
let row;
let column;
let randomIndex;
let color;

let Tetraminos = [A, B, C, D, E, F, G]
let colors = ["blue","yellow","red", "green","pink","orange", "purple"]
let rotations = [A_rotate, B_rotate,C_rotate,D_rotate,E_rotate,F_rotate,G_rotate]

function gameLoop(){
    drawBoard()
    setInterval(drop, 1000)
}

let canvas = document.querySelector('#myCanvas')
let ctx = canvas.getContext("2d")

for(let rw=0; rw < 20; rw++){
    Board[rw] = []
    for(let col=0;col < 10 ; col++){
       Board[rw][col] = defaultColor
    } 
}

function drawBoard(){
    for(let rw=0; rw < 10; rw++){
        for(let col=0;col< 20 ; col++){
        const currentSquareColor =  Board[rw][col]
        drawSquare(rw,col, currentSquareColor)
        } 
    }
}

function drawSquare(x,y,color){
    ctx.fillStyle = color   
    ctx.fillRect(x * square, y* square, square, square)
    if(color == defaultColor){
        ctx.strokeStyle = BorderColor
    }
    ctx.strokeRect(x * square, y* square, square, square)
}


class Piece {
    constructor(piece,color, rotate){
        this.piece = piece
        this.color = color
        this.rotate = rotate
        this.x = 3
        this.y = -2
    }
}

function makeRandomPieces(){
    randomIndex = Math.floor(Math.random() * Tetraminos.length)
    return new Piece(Tetraminos[randomIndex], colors[randomIndex], rotations[randomIndex])
}

const piece = makeRandomPieces()

let rotatePiece = piece.rotate
let currentPiece = piece.piece
let currentColor = piece.color
let posy = piece.y
let posx = piece.x

console.log(piece.rotate)

function fill(color){
    for(row=0; row < currentPiece.length; row++){
        for(column=0;column<currentPiece[row].length; column++){
           if(currentPiece[row][column]){
            drawSquare(posx + column, posy+row, color)
            }
        }
    }
}

 function draw(){
    fill(currentColor)
}

function clear(){
  fill(defaultColor)
}

function drop(){
    clear()
    console.log(posy)
    posy++
    draw()
}


function moveLeft(){
    clear()
    posx--
    draw()
}

function moveRight(){
    clear()
    posx++
    draw()
}
function moveDown(){
    clear()
    posy++
    draw()
}



let i = -1
function rotate(){
    clear()

    i+=1
    if(rotatePiece.length === 3) {
        if(i <= -1 + rotatePiece.length){
           currentPiece = rotatePiece[i]
        }
        if(i >2){
            currentPiece = Tetraminos[randomIndex]
            i =-1
        }
    }
    if( rotatePiece.length === 1 ){
        if(i <= -1 + rotatePiece.length){
            currentPiece = rotatePiece[i]
        }
        if(i >0){
            currentPiece = Tetraminos[randomIndex]
            i =-1
        }
    }
    draw()
}
console.log(Board)
function collision(){
    if(posy == 10){
        Board[posy].push(currentPiece)
        console.log(Board)
    }
   
}
collision()
window.addEventListener('keydown', (event)=>{
    if(event.key === "ArrowUp"){
        rotate()
    }
    if(event.key === "ArrowLeft"){
       moveLeft()
    }
    if(event.key === "ArrowRight"){
        moveRight()
    }
    if(event.key === "ArrowDown"){
        moveDown()
    }
    if(event.key === " "){

    }
})


gameLoop()
