// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const unit = 50;

// canvas.width = 1800;
// canvas.height = 800;
// const numCols = canvas.width / unit;
// const numRows = canvas.height / unit;
// let startNode = new Node(2,0,0,numRows*numCols, true, "start");
// let endNode = new Node(31,2,numRows* numCols,0, true, "end");

// let foundEndNode = false;

// function Node(col, row, gCost, hCost, walkable, role) {
//     this.x = parseInt(col * unit);
//     this.y = parseInt(row * unit);
//     this.row = parseInt(row);
//     this.col = parseInt(col);
//     this.gCost = parseInt(gCost);
//     this.hCost = parseInt(hCost);
//     this.fCost = parseInt(gCost + hCost);
//     this.walkable = walkable;
//     this.role = role;
//     this.parent = null;
//     this.setGCost = function(newGCost) {
//         this.gCost = parseInt(newGCost);
//         this.fCost = parseInt(parseInt(this.gCost) + parseInt(this.hCost));
//     }
//     this.setHCost = function(newHCost) {
//         this.hCost = parseInt(newHCost);
//         this.fCost = parseInt(parseInt(this.gCost) + parseInt(this.hCost));
//     }


// }
// function drawGrid() {
//     let tempWidth = ctx.lineWidth; //allows for expansion in case these properties are used differently before or after calling this function
//     let tempColor = ctx.strokeStyle;
//     ctx.strokeStyle = "rgba(0,0,0,0.3)";
//     ctx.lineWidth = 1;
//     let antiAliasingOffset = -0.5;
//     ctx.beginPath();
//     for(let i = 0; i <= canvas.width; i+= unit) { //main loop to draw the grid
//         antiAliasingOffset = -0.5
//         if(i === -canvas.height || i ===0)
//             antiAliasingOffset = 0.5;
//         ctx.moveTo(0, i + antiAliasingOffset); //add 0.5 to prevent anti-aliasing since the line width is 1
//         ctx.lineTo(canvas.width, i + antiAliasingOffset);
//         ctx.moveTo(i + antiAliasingOffset, 0);
//         ctx.lineTo(i + antiAliasingOffset, canvas.height);
        

//     }
//     ctx.stroke();
//     ctx.lineWidth = tempWidth;
//     ctx.strokeStyle = tempColor;
// }
// function init() {
//     canvas.style.marginLeft = (window.innerWidth - canvas.width) * 0.5 + "px";
//     drawGrid();
// }
// function initializeNodes() {
//     for(let row = 0/unit; row < canvas.height/unit; row++) {
//         for(let col = 0/unit; col < canvas.width/unit; col++) {
//             let curr = new Node(col, row, parseInt(numRows * numCols * 20), parseInt(numRows * numCols * 20), true, "default");
//             curr.setHCost(dist(curr, endNode));
//             allNodes.push(curr);
//         }
//     }
//     allNodes[convertToIndex([startNode.col, startNode.row])] = startNode;
//     drawNode(startNode);
    
//     allNodes[convertToIndex([endNode.col, endNode.row])] = endNode;
//     drawNode(endNode);
    
//     openNodes.push(startNode);
//     for(let i = 0; i < numRows - 1; i++) {
//         allNodes[convertToIndex([6,i])].walkable = false;
//         barrierNodes.push(allNodes[convertToIndex([6,i])]);
//     }
//     for(let i = numRows-1; i > 0; i--) {
//         allNodes[convertToIndex([30,i])].walkable = false;
//         barrierNodes.push(allNodes[convertToIndex([30,i])]);
//     }
//     console.log(barrierNodes);
//     for(let i = 0; i < barrierNodes.length; i++)
//             drawNode(barrierNodes[i]);
// }

// function dist(start, end) {
    
//     let deltaX = parseInt(Math.abs(start.col - end.col));
//     let deltaY = parseInt(Math.abs(start.row - end.row));
//     if(deltaX > deltaY) 
//         return parseInt(14 * deltaY + 10 * (deltaX - deltaY));
//     else
//         return parseInt(14 * deltaX + 10 * (deltaY - deltaX)); 
// }
// function convertToIndex(point) {
//     return parseInt(point[0] + (point[1] * numCols));
// }


// window.onresize = function() {
//     canvas.style.marginLeft = (window.innerWidth - canvas.width) * 0.5 + "px";
// }
// function drawNode(node) {
//     ctx.beginPath();
//     if(node.role === "start" || node.role === "end")
//         ctx.fillStyle = "#ffff00";
//     else if(node.role === "path") 
//         ctx.fillStyle = "#f81894";
//     else if(!node.walkable)
//         ctx.fillStyle = "rgb(100,100,100)";
//     else
//         ctx.fillStyle = "#00ffff";
    
//     ctx.rect(node.x, node.y, unit, unit);
//     ctx.fill();
//     ctx.beginPath();
//     ctx.strokeStyle = "rgb(0,0,0)";
//     ctx.lineWidth = 4 * (unit/50);
//     ctx.rect(node.x + ctx.lineWidth/2, node.y + ctx.lineWidth/2, unit - ctx.lineWidth, unit - ctx.lineWidth);
//     ctx.stroke();

// }
// function searchNearNodes(node) {
//     for(let i = 0; i < Math.PI * 2.0; i+= Math.PI/4.0) {
//         let cF = 2.0/Math.SQRT2; //to cancel out the actual value
        
//         if(Math.abs(Math.cos(i)) === 0) 
//             cF = 1;
//         xOffset = Math.round(Math.cos(i) * cF);
//         cF = 2.0/Math.SQRT2;
//         if(Math.abs(Math.sin(i)) === 0) 
//             cF = 1;
//         yOffset = Math.round(Math.sin(i) * cF);
//         index = convertToIndex([node.col + xOffset, node.row + yOffset]);; 
//         curr = allNodes[index];
//         if(index < 0 || index > allNodes.length-1 || node.col + xOffset > numCols-1 || node.col + xOffset < 0)
//             continue;
//         if(!curr.walkable || closedNodes.includes(curr))  {
//             if(!curr.walkable)
//                 barrierNodes.push(curr);
//             continue;
//         }
//         drawNode(curr);
//         if(curr.gCost > dist(curr,node) + node.gCost) {
//             curr.parent = node;
//             curr.gCost = node.gCost + dist(curr,node);
//             if(!openNodes.includes(curr)) {
//                 openNodes.push(curr);
//             }
//         }
        

//     }
// }
// init();

// let allNodes = new Array();
// let openNodes = new Array();
// let closedNodes = new Array();
// let barrierNodes = new Array();



// //drawNode(allNodes[150]);
// initializeNodes();




// let testing1111 = 0;
// let path = new Array();
// let ayo = setInterval(solving, 0.1);
// function solving() {
//     let curr = openNodes[0];
//     for(node in openNodes) {
//         if(node.fCost < curr.fCost || (node.fCost === curr.fCost && node.hCost < curr.hCost)) {
//             curr = node;
//         }
//     }
//     openNodes.splice(openNodes.indexOf(curr),1);
//     closedNodes.push(curr);
//     if(curr === endNode) {
//         foundEndNode = true;
//         clearInterval(ayo);
//     }
//     searchNearNodes(curr);
//     if(foundEndNode) {
//         path.push(endNode);
//        while(!path.includes(startNode) && foundEndNode) {
//         path.push(path[path.length-1].parent);
//         if(path[path.length-1].role === "default") 
//             path[path.length-1].role = "path";
//         }
//         path.reverse();
//         for(let i = 0; i < path.length; i++) {
//             drawPath(i);
//         }
        
//     }
//     if(foundEndNode) {
//         console.log("we clearly make it here.");
//     }
// }

// function drawPath(i) {
//     setTimeout(function() {
//         drawNode(path[i]);
//     }, 20 * i);
// }






