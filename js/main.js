'use strict';

function init() {
      renderSearchWord()
      renderGallery()
      gElCanvas = document.getElementById('my-canvas');
      gCtx = gElCanvas.getContext('2d');
}

function renderSearchWord() {
      var searchWord = getSearchWord();
      var strWordsHtml = '';
      for (var key in searchWord) {
            strWordsHtml += `<li><a href="" style="font-size:${searchWord[key]}px;" class="search-item">${key}</a></li>`;
      }
      var elSearchWords = document.querySelector('.search-word');
      elSearchWords.innerHTML = strWordsHtml;
}

function renderGallery() {
      var imgs = getImgs();
      var strImgsHtml = imgs.map(img => {
            return `<img  class='img-item' src="./img-square/${img.id}.jpg" onclick='onImageClick(${img.id})' alt="">`
      });
      var elGallery = document.querySelector('.gallery');
      elGallery.innerHTML = strImgsHtml.join('');
}

function onImageClick(imgId) {
      updateGmemeImage(imgId);
      renderMeme()
      openEditor()
}

function renderMeme() {
      const currMeme = getGmeme();
      const currImage = getCurrImg(currMeme.selectedImgId);
      const img = new Image();
      img.src = currImage.imgUrl;
      img.onload = () => {
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
            currMeme.lines.forEach(line => {
                  drawText(line.posX, line.posY, line.txt, line.size, line.align, line.color, line.stroke)
            });
            if (currMeme.isLinesMark) {
                  drawRect(currMeme.lines[gMeme.selectedLineIdx].posX, currMeme.lines[gMeme.selectedLineIdx].posY)
            }
      }

}

function drawText(x, y, text, fontSize, align, color, stroke) {
      gCtx.lineWidth = 2
      gCtx.strokeStyle = stroke
      gCtx.fillStyle = color
      gCtx.font = `${fontSize}px impact`
      gCtx.textAlign = align;
      gCtx.fillText(text, x, y)
      gCtx.strokeText(text, x, y)
}

function drawRect(x, y) {
      gCtx.beginPath()
      gCtx.rect(x - 15, y - 40, 460, 50)
      var gradient = gCtx.createLinearGradient(0, 0, 170, 0);
      gCtx.lineWidth = 4;
      gradient.addColorStop("0", "magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      gCtx.strokeStyle = gradient;
      gCtx.stroke()
}

function openEditor() {
      var elGallery = document.querySelector('.gallery');
      elGallery.style.display = 'none';
      var elGallery = document.querySelector('.main-editor');
      elGallery.style.display = 'flex';
      var elSearch = document.querySelector('.main-search');
      elSearch.style.display = 'none';
}

function openGallery() {
      var elGallery = document.querySelector('.gallery');
      elGallery.style.display = 'grid';
      var elEditor = document.querySelector('.main-editor');
      elEditor.style.display = 'none';
      var elSearch = document.querySelector('.main-search');
      elSearch.style.display = 'flex';
}

function openMemes() {
      var elGallery = document.querySelector('.gallery');
      elGallery.style.display = 'none';
      var elSearch = document.querySelector('.main-search');
      elSearch.style.display = 'none';
      var elEditor = document.querySelector('.main-editor');
      elEditor.style.display = 'none';
      var elMemes = document.querySelector('.main-memes');
      elMemes.style.display = 'block';
}

function onAddTextLine() {
      var newText = document.querySelector('.text-line').value;
      addTextLine(newText);
      renderMeme()
}

function onChangeTextSize(value) {
      changeTextSize(value)
}

function onSwitchLines() {
      gMeme.isLinesMark = true;
      renderMeme()
      if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
            gMeme.selectedLineIdx = 0;
      } else {
            gMeme.selectedLineIdx++;
      }
}
