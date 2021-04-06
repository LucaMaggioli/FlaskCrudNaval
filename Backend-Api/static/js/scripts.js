function createLobby(player){
    console.log(player);
//    fetch('/lobby/new')
//      .then(function (response) {
//          return response.json();
//      }).then(function (text) {
//          console.log('GET response:');
//          console.log(text.greeting);
//      });


//    url = "localhost:5001/lobby/page";
//    window.location.href = "http://www.w3schools.com";
//    let myFetch = fetch(url);
}

function createGrid(gridX, gridY){
const container = document.getElementById("gridContainer");

    for (x = 0; x < gridX; x++) {
    let row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
        for (y = 0; y < gridY; y++) {
            var id = "X"+x+"Y"+y;
            let cell = document.createElement("div");
            cell.setAttribute("id", id);
            cell.style.padding = "10px";
            cell.style.border = "1px solid";
            cell.addEventListener("click", function(){onCellClick(cell);});
            row.appendChild(cell);
        }
    container.appendChild(row);
    }
}

function onCellClick(cell){
    console.log(`cell ${cell.id} clicked`);
}

function placeBoat(){
    console.log("10");
}