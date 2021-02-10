'use strict';

/* Globals */
var gKeywords = { 'happy': 19, 'funny puk': 40, 'animal': 24, 'famous': 30 };

var gImgs = [
      { id: 1, imgUrl: './img-square/1.jpg', Keywords: ['happy', 'funny'] },
      { id: 2, imgUrl: './img-square/2.jpg', Keywords: ['happy', 'funny'] },
      { id: 3, imgUrl: './img-square/3.jpg', Keywords: ['happy', 'funny'] },
      { id: 4, imgUrl: './img-square/4.jpg', Keywords: ['happy', 'funny'] },
      { id: 5, imgUrl: './img-square/5.jpg', Keywords: ['happy', 'funny'] },
      { id: 6, imgUrl: './img-square/6.jpg', Keywords: ['happy', 'funny'] },
      { id: 7, imgUrl: './img-square/7.jpg', Keywords: ['happy', 'funny'] },
      { id: 8, imgUrl: './img-square/8.jpg', Keywords: ['happy', 'funny'] },
      { id: 9, imgUrl: './img-square/9.jpg', Keywords: ['happy', 'funny'] },
      { id: 10, imgUrl: './img-square/10.jpg', Keywords: ['happy', 'funny'] },
      { id: 11, imgUrl: './img-square/11.jpg', Keywords: ['happy', 'funny'] },
      { id: 12, imgUrl: './img-square/12.jpg', Keywords: ['happy', 'funny'] },
      { id: 13, imgUrl: './img-square/13.jpg', Keywords: ['happy', 'funny'] },
      { id: 14, imgUrl: './img-square/14.jpg', Keywords: ['happy', 'funny'] },
      { id: 15, imgUrl: './img-square/15.jpg', Keywords: ['happy', 'funny'] },
      { id: 16, imgUrl: './img-square/16.jpg', Keywords: ['happy', 'funny'] },
      { id: 17, imgUrl: './img-square/17.jpg', Keywords: ['happy', 'funny'] },
      { id: 18, imgUrl: './img-square/18.jpg', Keywords: ['happy', 'funny'] },
];

var gMeme = {
      selectedImgId: 2,
      selectedLineIdx: 0,
      isLineSelected: false,
      lines: [

      ],
      currFontSize: 20,
      lineHeigt: 40,
}

function getImgs() {
      return gImgs
}

function getGmeme() {
      return gMeme;
}

function getSearchWord() {
      return gKeywords;
}

function getCurrImg(imgId) {
      return gImgs.find(img => {
            return img.id === imgId;
      })
}

function addTextLine(newText, size = gMeme.currFontSize, align = 'left') {
      var newLine = {
            txt: newText,
            size: size,
            align: 'left',
            color: 'red',
            posX: findEmptyPosX(gMeme.lines.length),
            posY: findEmptyPosY(gMeme.lines.length),
      }
      gMeme.lines.push(newLine);
}

function updateGmeme(imgId) {
      gMeme = {
            selectedImgId: imgId,
            selectedLineIdx: 0,
            isLineSelected: false,
            lines: [
            ],
            currFontSize: 20,
            lineHeigt: 40,
      }
}

function changeTextSize(value) {
      if ((gMeme.currFontSize < 2 && value < 0) || (gMeme.currFontSize >= 60 && value > 0)) return;
      gMeme.currFontSize += value;
}

function findEmptyPosX(lineNumber) {
      return 15;

}

function findEmptyPosY(lineNumber) {
      switch (lineNumber) {
            case 0:
                  return 30
                  break;
            case 1:
                  var y = (gElCanvas.height - gMeme.lineHeigt - 30);
                  return y;
                  break;
            case 2:
                  return gElCanvas.height / 2
                  break;
            default:
                  break;
      }
}

