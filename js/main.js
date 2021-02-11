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
                  drawText(line.posX, line.posY, line.txt, line.size, line.align, line.color, line.stroke, line.font)
            });
            if (currMeme.isLinesMark) {
                  drawRect(currMeme.lines[gMeme.selectedLineIdx].posX, currMeme.lines[gMeme.selectedLineIdx].posY)
            }
      }

}

function drawText(x, y, text, fontSize, align, color, stroke, font) {
      gCtx.lineWidth = 2
      gCtx.strokeStyle = stroke
      gCtx.fillStyle = color
      gCtx.font = `${fontSize}px ${font}`
      gCtx.textAlign = align;
      gCtx.fillText(text, x, y)
      gCtx.strokeText(text, x, y)
}

function drawRect(x, y) {
      gCtx.beginPath()
      gCtx.rect(x - 240, y - 60, 475, 70)
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

function onChangeTextLine() {
      var newText = document.querySelector('.text-line').value;
      changeTextLine(newText)
      renderMeme()
}

function onAddTextLine() {
      var newText = document.querySelector('.text-line').value;
      addTextLine(newText);
      onSwitchLines()
      renderMeme()
}

function onChangeTextSize(value) {
      changeTextSize(value)
      renderMeme();
}

function onChangeAlignment(value) {
      changeAlignment(value)
      renderMeme();
}

function onClickFillColorPallete() {
      var elColorPicker = document.querySelector('.color-fill-picker');
      elColorPicker.style.display = 'block'
      elColorPicker.focus();
      elColorPicker.value = "#FFCCff";
      elColorPicker.click();
}

function onChangeFillColor(elPicker) {
      changeFillColor(elPicker.value);
      renderMeme();
}

function onClickStrokeColorPallete() {
      var elColorPicker = document.querySelector('.color-stroke-picker');
      elColorPicker.style.display = 'block'
      elColorPicker.focus();
      elColorPicker.value = "#FFCCff";
      elColorPicker.click();
}

function onChangeStrokeColor(elStrokePicker) {
      changeStrokeColor(elStrokePicker.value);
      renderMeme();
}

function onChangeFont(elSelected) {
      changeFont(elSelected.value);
      renderMeme();
}

function onSwitchLines() {
      gMeme.isLinesMark = true;
      if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
            gMeme.selectedLineIdx = 0;
      } else {
            gMeme.selectedLineIdx++;
      }
      renderMeme()
}

function onDeleteLine() {
      deleteSelectedLine();
      renderMeme()
}

function downloadCanvas(elLink) {
      const data = gElCanvas.toDataURL()
      elLink.href = data
      elLink.download = 'my-canvas';
}



// The next 3 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
      loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
      document.querySelector('.share-container').innerHTML = ''
      var reader = new FileReader()

      reader.onload = function (event) {
            var img = new Image()
            img.onload = onImageReady.bind(null, img)
            img.src = event.target.result
            gImg = img
      }
      reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
