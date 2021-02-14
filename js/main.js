'use strict';

function init() {
      renderSearchWord()
      renderGallery()
      renderSavedMemes()
      gElCanvas = document.getElementById('my-canvas');
      gCtx = gElCanvas.getContext('2d');
      addListeners()
      resizeCanvas()
      renderMeme()
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
            return `<img  class='img-item' src="${img.imgUrl}" onclick='onImageClick(${img.id})' alt="">`
      });
      var elGallery = document.querySelector('.gallery');
      elGallery.innerHTML = strImgsHtml.join('');
}

function renderSavedMemes() {
      updateGMemes()
      var imgsMemes = getGsaveMemes();
      var strImgsHtml = imgsMemes.map((img) => {
            const imgContent = img.dataUrl;
            return `
            <a href="#"  onclick="onSaveMemesClick(this,${img.id})" download="">
            <img  class='memes-items' src="${imgContent}"  alt="">
            </a>`

      });
      var elMemes = document.querySelector('.main-memes');
      elMemes.innerHTML = strImgsHtml.join('');
}

function onImageClick(imgId) {
      updateGmemeImage(imgId);
      openEditor()
      resizeCanvas()
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
                  drawText(line.posX, line.posY, line.txt, line.size, line.align, line.color, line.stroke, line.font)
            });
            if (currMeme.isLinesMark) {
                  drawRect(currMeme.lines[gMeme.selectedLineIdx].posX, currMeme.lines[gMeme.selectedLineIdx].posY)
            }
            currMeme.emojis.forEach(emoji => {
                  drawEmoji(emoji);
            })
            if (currMeme.isEmojiMark) {
                  drawEmojiRect(currMeme.emojis[gMeme.selectedEmojiIdx].posX, currMeme.emojis[gMeme.selectedEmojiIdx].posY, currMeme.emojis[gMeme.selectedEmojiIdx].imgWidth)
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

function drawEmoji(emoji) {

      const img = new Image()
      img.src = emoji.emojiUrl;

      img.onload = () => {
            gCtx.drawImage(img, emoji.posX, emoji.posY, emoji.imgWidth, emoji.imgWidth)
      }
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

function drawEmojiRect(x, y, emojiSize) {
      gCtx.beginPath()
      gCtx.rect(x, y, emojiSize, emojiSize)
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
      toggleMenu()
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
      toggleMenu()
}

function openAbout() {
      toggleMenu()
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

function onAddEmoji(emojiId) {
      addEmoji(emojiId)
      // onSwitchLines()
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

function onSaveMemesClick(ellink, savedMemesId) {
      var savedMemes = getGsaveMemes()
      var currSavedMemes = savedMemes.find((memes) => {
            return memes.id === savedMemesId;
      })
      ellink.href = currSavedMemes.dataUrl
      ellink.download = 'my-saved-canvas';
}

function onSearchImage() {
      var searchKeyword = document.querySelector('.serach-bar').value
      renderGallery(searchKeyword);
}

function changeTheme() {
      var themeChoose = document.querySelector('.theme').value
      console.log(themeChoose);
      document.body.classList.remove('kids')
      document.body.classList.remove('celeb')
      document.body.classList.remove('regular')
      switch (themeChoose) {
            case 'kids':
                  document.body.classList.add('kids')
                  break;
            case 'regular':
                  document.body.classList.add('regular')
                  break;
            case 'celeb':
                  document.body.classList.add('celeb')
                  break;
            default:
                  break;
      }

}

//handle drag and frop func
function addListeners() {
      addMouseListeners()
      addTouchListeners()
      window.addEventListener('resize', () => {
            resizeCanvas()
            renderMeme()
      })
      addKeyboardListener()
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

function addKeyboardListener() {
      document.addEventListener('keyup', (ev) => {
            changeInputEditor(ev.key);
      })
}

function changeInputEditor(keyCode) {
      var elEditorInput = document.querySelector('.text-line');
      if (gMeme.isLinesMark) {
            if (keyCode === 'Backspace') {
                  var inputValue = elEditorInput.value;
                  var newInputValue = inputValue.substring(0, inputValue.length - 1);
                  elEditorInput.value = newInputValue;
                  onChangeTextLine()
            } else {
                  elEditorInput.value += keyCode;
                  onChangeTextLine()
            }
      }
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
            removeLineMark()
            renderMeme();
      }
      var emojiIndex = isEmojiClick(pos);
      if (emojiIndex >= 0) {
            updateEmojiDragging(emojiIndex, pos);
            document.body.style.cursor = 'grabbing'
      } else {
            removeEmojiMark()
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

      var currEmoji = gMeme.emojis[gMeme.selectedEmojiIdx];
      if (currEmoji) {
            if (currEmoji.isEmojiDrag) {
                  const pos = getEvPos(ev)
                  const dx = pos.x - currEmoji.startPosX
                  const dy = pos.y - currEmoji.startPosY
                  gMeme.emojis[gMeme.selectedEmojiIdx].posX += dx;
                  gMeme.emojis[gMeme.selectedEmojiIdx].posY += dy;
                  gMeme.emojis[gMeme.selectedEmojiIdx].startPosX = pos.x
                  gMeme.emojis[gMeme.selectedEmojiIdx].startPosY = pos.y
                  renderMeme();
            }
      }
}

function onUp() {
      gMeme.lines[gMeme.selectedLineIdx].isLineDragging = false;
      var currEmoji = gMeme.emojis[gMeme.selectedEmojiIdx]
      if (currEmoji) {
            currEmoji.isEmojiDrag = false;
            document.body.style.cursor = 'grab'
      }
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
                  lineIdx = idx;
            }
      })
      return lineIdx;
}

function isEmojiClick(clickPos) {
      var meme = getGmeme();
      var emojiIdx;
      meme.emojis.forEach((emoji, idx) => {
            if (clickPos.x >= (emoji.posX) && clickPos.x <= emoji.posX + emoji.imgWidth
                  && (clickPos.y > emoji.posY) && (clickPos.y < emoji.posY + emoji.imgWidth)) {
                  emojiIdx = idx;
            }
      })
      return emojiIdx;
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
            addImageToList()
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
      renderSavedMemes()
}

//handle the resize of canvas
function resizeCanvas() {
      const elContainer = document.querySelector('.canvas');
      //viewport more then 550px =>  cw = 500px , ch = 500px 
      //the width of canvas will be conatant
      gElCanvas.width = elContainer.offsetWidth
      //here need to change the canvas heigth according to the selected image
      var { selectedImgWidth, selectedImgHeight } = getGmeme()
      var canvasNewHeight = (selectedImgHeight * elContainer.offsetWidth / selectedImgWidth)
      gElCanvas.height = canvasNewHeight;
      elContainer.style.height = gElCanvas.height + 5 + 'px';
}

