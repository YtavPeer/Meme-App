'use strict';

function init() {
      renderSearchWord()
      renderGallery()
      renderMemes()
      gElCanvas = document.getElementById('my-canvas');
      gCtx = gElCanvas.getContext('2d');
      addListeners()
}

function renderSearchWord() {
      var searchWord = getSearchWord();
      var strWordsHtml = '';
      for (var key in searchWord) {
            strWordsHtml += `<li><a onclick="searchByKeyword(event,'${key}')" href="" style="font-size:${searchWord[key]}px;" class="search-item">${key}</a></li>`;
      }
      var elSearchWords = document.querySelector('.search-word');
      elSearchWords.innerHTML = strWordsHtml;
}

function renderGallery(searchKeyword) {
      var imgs = getImgs();
      if (searchKeyword) {
            var filterImgs = imgs.filter(({ Keywords }) => {
                  return Keywords.includes(searchKeyword);
            })
            imgs = filterImgs;
      }

      var strImgsHtml = imgs.map(img => {
            return `<img  class='img-item' src="./img-square/${img.id}.jpg" onclick='onImageClick(${img.id})' alt="">`
      });
      var elGallery = document.querySelector('.gallery');
      elGallery.innerHTML = strImgsHtml.join('');
}

function renderMemes() {
      updateGMemes()
      var imgsMemes = getGsaveMemes();
      var strImgsHtml = imgsMemes.map((img) => {
            const imgContent = img.dataUrl;
            return `<img  class='memes-items' src="${imgContent}" alt="">`
      });
      var elMemes = document.querySelector('.main-memes');
      elMemes.innerHTML = strImgsHtml.join('');
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
      var elMemes = document.querySelector('.main-memes');
      elMemes.style.display = 'none';
}

function openGallery() {
      var elGallery = document.querySelector('.gallery');
      elGallery.style.display = 'grid';
      var elEditor = document.querySelector('.main-editor');
      elEditor.style.display = 'none';
      var elSearch = document.querySelector('.main-search');
      elSearch.style.display = 'flex';
      var elMemes = document.querySelector('.main-memes');
      elMemes.style.display = 'none';
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

function onSearchImage() {
      var searchKeyword = document.querySelector('.serach-bar').value
      renderGallery(searchKeyword);
}

//handle drag and frop func
function addListeners() {
      addMouseListeners()
      addTouchListeners()
}

function addMouseListeners() {
      gElCanvas.addEventListener('mousemove', onMove)

      gElCanvas.addEventListener('mousedown', onDown)

      gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
      gElCanvas.addEventListener('touchmove', onMove)

      gElCanvas.addEventListener('touchstart', onDown)

      gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
      const pos = getEvPos(ev)
      var lineIndex = isLineClick(pos);
      if (lineIndex >= 0) {
            updateLineDragging(lineIndex, pos);
            document.body.style.cursor = 'grabbing'
            //update input text
            var currLine = gMeme.lines[gMeme.selectedLineIdx]
            document.querySelector('.text-line').value = currLine.txt;
      } else {
            console.log('clear focus');
            removeLineMark()
            renderMeme();
      }
}

function onMove(ev) {
      var currLine = gMeme.lines[gMeme.selectedLineIdx]

      if (currLine.isLineDragging) {
            const pos = getEvPos(ev)
            const dx = pos.x - currLine.startposX
            const dy = pos.y - currLine.startposY
            gMeme.lines[gMeme.selectedLineIdx].posX += dx;
            gMeme.lines[gMeme.selectedLineIdx].posY += dy;
            gMeme.lines[gMeme.selectedLineIdx].startposX = pos.x
            gMeme.lines[gMeme.selectedLineIdx].startposY = pos.y
            renderMeme();
      }
}

function onUp() {
      gMeme.lines[gMeme.selectedLineIdx].isLineDragging = false;
      document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
      var pos = {
            x: ev.offsetX,
            y: ev.offsetY
      }
      if (gTouchEvs.includes(ev.type)) {
            ev.preventDefault()
            ev = ev.changedTouches[0]
            pos = {
                  x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                  y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
            }
      }
      return pos
}

function isLineClick(clickPos) {
      var meme = getGmeme();
      var lineIdx;
      meme.lines.forEach((line, idx) => {
            if (clickPos.x >= (line.posX - 240) && clickPos.x <= line.posX + 235
                  && (clickPos.y > line.posY - 60) && (clickPos.y < line.posY + 10)) {
                  console.log(idx);
                  lineIdx = idx;
            }
      })
      return lineIdx;
}

function searchByKeyword(ev, keyword) {
      ev.preventDefault();
      renderGallery(keyword);
      if (gKeywords[keyword] <= 28) {
            gKeywords[keyword] += 2
            renderSearchWord()
      }
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

function toggleMenu() {
      var menuOpen = document.body.classList.toggle('menu-open')
      if (menuOpen) {
            document.querySelector('.menu-btn').innerText = 'X';
      } else {
            document.querySelector('.menu-btn').innerText = '☰';
      }
}

//handle storage
function onSaveMeme(elSave) {
      saveMeme(elSave);
      renderMemes()
}
