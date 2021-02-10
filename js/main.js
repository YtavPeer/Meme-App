'use strict';


var gElCanvas;
var gCtx;

function init() {

      gElCanvas = document.getElementById('my-canvas');
      gCtx = gElCanvas.getContext('2d');
      renderMeme()
}


function renderMeme() {
      const currMeme = getGmeme();
      const currImage = getCurrImg(currMeme.selectedImgId);
      const img = new Image();
      img.src = currImage.imgUrl;
      img.onload = () => {
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
            currMeme.lines.forEach(line => {
                  drawText(200, 70, line.txt, line.size, line.align, line.color)
            });
      }
}

function drawText(x, y, text, fontSize, align, color) {
      gCtx.lineWidth = 2
      gCtx.strokeStyle = color
      gCtx.fillStyle = 'white'
      gCtx.font = `${fontSize}px Arial`
      gCtx.textAlign = align;
      gCtx.fillText(text, x, y)
      gCtx.strokeText(text, x, y)
}

function onAddTextLine() {
      var newText = document.querySelector('.text-line').value;
      addTextLine(newText);
      renderMeme()
}
