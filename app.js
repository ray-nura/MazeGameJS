const body =  document.querySelector('body');
const board = document.querySelector("#board");
const square = document.querySelectorAll(".square");
const scores = document.querySelector('#scores');

const colors = ["red", "#8d0303", "#cf3d3d", "#f06d09", "#f0cd09"];

function maze(matrix) {
  const visited = [];
  let found = false;
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < matrix[0].length; j++) {
      row.push(0);
    }
    visited.push(row);
  }
  
  function move(row, col) {
    visited[row][col] = 1;
    if (row === matrix.length - 1 && col === matrix[row].length - 1) {
      console.log(row, col);
      let y = matrix[0].length * row + col;
      document.querySelectorAll(".square")[y].style.backgroundColor = "red";
      found = true;
      return;
    }
    if (found) return;
    if (col < matrix[row].length - 1 && matrix[row][col + 1] === 1 && !visited[row][col + 1])
     { move(row, col + 1); setColor(row, col+1);}
    if (row < matrix.length - 1 && matrix[row + 1][col] === 1 && !visited[row + 1][col])
      {move(row + 1, col);setColor(row + 1, col);}
    if (col > 0 && matrix[row][col - 1] === 1 && !visited[row][col - 1])
      {move(row, col - 1);setColor(row, col - 1);}
    if (row > 0 && matrix[row - 1][col] === 1 && !visited[row - 1][col])
      {move(row - 1, col); setColor(row - 1, col);}

    if (found) {
      console.log(row, col);
      const myTimeout = setTimeout(() => {
        let y = matrix[0].length * row + col;
        document.querySelectorAll(".square")[y].style.backgroundColor = "red";
      }, 500);
    }
  }

  print(matrix);
  move(0, 0);
  if (found) {
    scores.innerText='Maze solved'
    body.style.backgroundColor = "orange";
    console.log("Maze solved.");
    } else {
      scores.innerText='Maze NOT solved'
      console.log("Maze not solved.");
  }
  function setColor(row ,col ) {
    setTimeout(() => {
      let y = matrix[0].length * row + col;
      document.querySelectorAll(".square")[y].style.backgroundColor = "green";
    }, 200);
  }
}

function print(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i]);
  }
}

function createMatrix(dimension) {
  const result = [];
  for (let i = 0; i < dimension; i++) {
    const row = [];
    for (let j = 0; j < dimension; j++) {
      const number = Math.round(Math.random() + 0.1);
      row.push(number);
      var square = document.createElement("div");
      if (number === 1) square.classList = `square setColor`;
      if (number === 0) square.classList = `square`;
      board.append(square);
    }
    result.push(row);
  }
  return result;
}

const start = () => {
  board.innerText = "";
  scores.innerText='New';
  body.style.backgroundColor = "#dfe599";
  const dimension = Math.floor(Math.random() * 6 + 5);
  board.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
  const matrix = createMatrix(dimension);
  maze(matrix);
};
document.querySelector("#btn").addEventListener("click", start);
