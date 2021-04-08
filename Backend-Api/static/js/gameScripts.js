var dBoats = [];
var BoatToPlace;




function createGrid(gridX, gridY){
const container = document.getElementById("gridContainer");
    for (x = 0; x < gridX; x++) {
    idX = gridX - x;
    let row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexDirection = "row";
        for (y = 1; y <= gridY; y++) {
//            var id = "X"+idX+"Y"+y;
            var id = idX + "-" + y;
            let cell = document.createElement("div");
            cell.setAttribute("id", id);
            cell.style.padding = "10px";
            cell.style.border = "1px solid";
            cell.addEventListener("click", function(){placeBoat(cell);});
            cell.addEventListener("mouseout", function(){onCellOut(cell);});
            row.appendChild(cell);
        }
    container.appendChild(row);
    }
}

function onCellClick(cell){
    cell.style.backgroundColor = "green";
    console.log(`cell ${cell.id} clicked`);
}
function onCellOver(cell){
}
function onCellOut(cell){
    cell.style.backgroundColor = "white";
}


function placeBoat(cell){
    var url = 'http://localhost:5001/game/placeboats';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("data is: ");
            console.log(data);
        })
        .catch(console.error);
}
function placeBoats(cell){
    cellId = cell.id;
    console.log(cellId);
    var X = parseInt(cellId.substr(0, cellId.indexOf('-')));
    var Y = parseInt(cellId.substr(cellId.indexOf('-')+1, cellId.lenght));

    var len = 0;
    dBoats.forEach(boat=>{
    len < boat["lenght"] ? len = boat["lenght"] : len = len;
    });

    for (i = 0; i <= len; i++){
        var x = X+i, y = Y;
        var cell = document.getElementById(x+"-"+y);
        cell != null ? cell.style.backgroundColor = "gray" : console.log("cell is null");

        var x = X-i, y = Y;
        var cell = document.getElementById(x+"-"+y);
        cell != null ? cell.style.backgroundColor = "gray" : cell = null;

        var x = X, y = Y+i;
        var cell = document.getElementById(x+"-"+y);
        cell != null ? cell.style.backgroundColor = "gray" : cell = null;

        var x = X, y = Y-i;
        var cell = document.getElementById(x+"-"+y);
        cell != null ? cell.style.backgroundColor = "gray" : cell = null;
    }
}
function showBoatsToPlace(boats){
    dBoats = boats;
    boats.forEach(boat =>{
     console.log(boat);
    });

    let boatsContainer = document.getElementById("boatToPlaceContainer");
    boatsContainer.style.marginLeft = "20px";
    boatsContainer.style.display = "flex";
    boatsContainer.style.flexDirection = "row";

    boats.forEach(boat =>{
        let boatContainer = document.createElement("div");
        boatContainer.style.display = "flex";
        boatContainer.style.flexDirection = "column";
        boatContainer.style.justifyContent = "space-between";
        boatContainer.style.border = "1px solid";
        boatContainer.style.padding = "10px";

        let boatH = document.createElement("div");
        boatH.style.display = "flex";
        boatH.style.flexDirection = "row";
        boatH.style.margin = "10px";
        let boatV = document.createElement("div");
        boatV.style.display = "flex";
        boatV.style.flexDirection = "column";
        boatV.style.margin = "10px";
        boatV.style.alignItems = "start";

        for (c = 1; c <= boat["lenght"]; c++) {
                let cell = document.createElement("div");
                cell.style.padding = "10px";
                cell.style.border = "1px solid";
                const cell2 = cell.cloneNode(true);
                console.log(cell);
                console.log(cell2);
                boatV.appendChild(cell);
                boatH.appendChild(cell2);
                boatV.addEventListener("click", function(){selectBoatToPlace(boat, boatV);})
        }
        let nBoats = document.createElement("p");
        nBoats.textContent = "x" + boat["quantity"];
        boatContainer.appendChild(boatV);
        boatContainer.appendChild(boatH);
        boatContainer.appendChild(nBoats);

        boatsContainer.appendChild(boatContainer);
    });

}

function selectBoatToPlace(boat, self){
    boatToPlace = boat;
    changeColorToChilds(self, "green")
}
function changeColorToChilds(item, color){
    var nodes = item.childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
             nodes[i].style.background = color;
         }
    }
}

function giveBoats(){
    console.log(dBoats);
}