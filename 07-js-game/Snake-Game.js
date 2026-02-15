const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d'); 
const gridSize = 20;
const cellSize = canvas.width/gridSize;

for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i*cellSize,0);
    ctx.lineTo(i*cellSize,canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,i*cellSize);
    ctx.lineTo(canvas.width,i*cellSize);
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

