'use strict';

/* Globals */
var gElCanvas;
var gCtx;
var gKeywords = { 'happy': 19, 'crazy': 40, 'sarcastic': 24, 'sad': 30, 'famous': 19, 'animal': 40 };
var gImgs = [
      { id: 1, imgUrl: './img-square/1.jpg', Keywords: ['funny', 'crazy', 'sarcastic'] },
      { id: 2, imgUrl: './img-square/2.jpg', Keywords: ['happy', 'funny', 'animal'] },
      { id: 3, imgUrl: './img-square/3.jpg', Keywords: ['happy', 'funny'] },
      { id: 4, imgUrl: './img-square/4.jpg', Keywords: ['happy', 'funny', 'animal'] },
      { id: 5, imgUrl: './img-square/5.jpg', Keywords: ['happy', 'funny', 'sarcastic'] },
      { id: 6, imgUrl: './img-square/6.jpg', Keywords: ['famous', 'crazy', 'sarcastic'] },
      { id: 7, imgUrl: './img-square/7.jpg', Keywords: ['happy', 'crazy'] },
      { id: 8, imgUrl: './img-square/8.jpg', Keywords: ['famous', 'funny'] },
      { id: 9, imgUrl: './img-square/9.jpg', Keywords: ['sarcastic', 'crazy'] },
      { id: 10, imgUrl: './img-square/10.jpg', Keywords: ['famous', 'sad'] },
      { id: 11, imgUrl: './img-square/11.jpg', Keywords: ['happy', 'funny'] },
      { id: 12, imgUrl: './img-square/12.jpg', Keywords: ['happy', 'funny'] },
      { id: 13, imgUrl: './img-square/13.jpg', Keywords: ['happy', 'funny'] },
      { id: 14, imgUrl: './img-square/14.jpg', Keywords: ['funny', 'famous'] },
      { id: 15, imgUrl: './img-square/15.jpg', Keywords: ['sad', 'funny', 'crazy'] },
      { id: 16, imgUrl: './img-square/16.jpg', Keywords: ['sarcastic', 'funny'] },
      { id: 17, imgUrl: './img-square/17.jpg', Keywords: ['happy', 'crazy'] },
      { id: 18, imgUrl: './img-square/18.jpg', Keywords: ['crazy', 'sarcastic'] },
];
var gMeme = {
      selectedImgId: 2,
      selectedLineIdx: 0,
      isLinesMark: false,
      lines: [],
      currFontSize: 40,
      lineHeigt: 40,
}
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const KEY = 'MEMES';
var gSaveMemes;




function getImgs() {
      return gImgs
}

function getGmeme() {
      return gMeme;
}

function getGsaveMemes() {
      return gSaveMemes;
}

function getSearchWord() {
      return gKeywords;
}

function getCurrImg(imgId) {
      return gImgs.find(img => {
            return img.id === imgId;
      })
}

function updateGmemeImage(imgId) {
      gMeme = {
            selectedImgId: imgId,
            selectedLineIdx: 0,
            isLineSelected: false,
            lines: [
                  {
                        txt: 'newText',
                        size: gMeme.currFontSize,
                        align: 'center',
                        color: 'white',
                        stroke: 'black',
                        font: 'impact',
                        posX: 250,
                        posY: findEmptyPosY(gMeme.lines.length),
                  }
            ],
            currFontSize: 40,
            lineHeigt: 40,
      }
}

function changeTextLine(newText) {
      gMeme.lines[gMeme.selectedLineIdx].txt = newText
}

function addTextLine(newText, size = gMeme.currFontSize, align = 'center', FillColor = 'white', stroke = 'black', font = 'impact') {
      var newLine = {
            txt: newText,
            size: size,
            align: align,
            color: FillColor,
            stroke: stroke,
            font: font,
            posX: 250,
            posY: findEmptyPosY(gMeme.lines.length),
            isLineDragging: false,
            startposX: undefined,
            startposY: undefined,
      }
      gMeme.lines.push(newLine);
}

function changeTextSize(value) {
      if ((gMeme.currFontSize < 20 && value < 0) || (gMeme.currFontSize >= 60 && value > 0)) return;
      gMeme.currFontSize += value;
      gMeme.lines[gMeme.selectedLineIdx].size += value;
}

function changeAlignment(value) {
      gMeme.lines[gMeme.selectedLineIdx].align = value;
}

function changeFillColor(color) {
      gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeStrokeColor(strokeColor) {
      gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor;
}

function changeFont(font) {
      gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function findEmptyPosY(lineNumber) {
      switch (lineNumber) {
            case 0:
                  return 65
                  break;
            case 1:
                  return (gElCanvas.height - 20);
                  break;
            default:
                  return gElCanvas.height / 2
                  break;
      }
}

function deleteSelectedLine() {
      gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function updateLineDragging(lineIndex, pos) {
      //Focus the current choose line
      gMeme.selectedLineIdx = lineIndex;
      gMeme.isLinesMark = true;
      //update isDraggin to true and set start pos
      gMeme.lines[gMeme.selectedLineIdx].isLineDragging = true;
      gMeme.lines[gMeme.selectedLineIdx].startposX = pos.x;
      gMeme.lines[gMeme.selectedLineIdx].startposY = pos.y;
      renderMeme();
}

function removeLineMark() {
      gMeme.isLinesMark = false;
}

function saveMeme() {
      const data = gElCanvas.toDataURL()
      gSaveMemes.push({ dataUrl: data })
      _saveCarsToStorage()
}


function _saveCarsToStorage() {
      saveToStorage(KEY, gSaveMemes)
}

function _loadFromStorage() {
      return loadFromStorage(KEY)
}

function updateGMemes() {
      var saveMemes = loadFromStorage(KEY)
      if (!saveMemes || !saveMemes.length) {
            saveMemes = []
      }
      gSaveMemes = saveMemes;
}