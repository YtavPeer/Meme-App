'use strict';


var gElCanvas;
var gCtx;

function init() {
      renderSearchWord()
      renderGallery()
      gElCanvas = document.getElementById('my-canvas');
      gCtx = gElCanvas.getContext('2d');
      renderMeme()
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

function onImageClick(imgId) {
      updateGmeme(imgId);
      renderMeme()
      openMemes()
}

function openMemes() {
      var elGallery = document.querySelector('.gallery');
      elGallery.style.display = 'none';
      var elGallery = document.querySelector('.main-content');
      elGallery.style.display = 'flex';
      var elSearch = document.querySelector('.main-search');
      elSearch.style.display = 'none';
}

function openGallery() {
      var elGallery = document.querySelector('.gallery');
      elGallery.style.display = 'grid';
      var elGallery = document.querySelector('.main-content');
      elGallery.style.display = 'none';
      var elSearch = document.querySelector('.main-search');
      elSearch.style.display = 'flex';
}

