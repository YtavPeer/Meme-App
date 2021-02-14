'use strict';

/* Globals */
var gElCanvas;
var gCtx;
var gEmoji = [
      { id: 1, emojiUrl: './img-items/1.jpg', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 2, emojiUrl: './img-items/2.jpg', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 3, emojiUrl: './img-items/3.png', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 4, emojiUrl: './img-items/4.png', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 5, emojiUrl: './img-items/5.png', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 6, emojiUrl: './img-items/6.jpg', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 7, emojiUrl: './img-items/7.jpg', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 },
      { id: 8, emojiUrl: './img-items/8.png', isEmojiDrag: false, posX: 80, posY: 100, startPosX: undefined, startPosY: undefined, imgWidth: 60 }
]
var gKeywords = { 'all': 16, 'happy': 16, 'crazy': 28, 'sarcastic': 14, 'sad': 22, 'famous': 16, 'animal': 28 };
var gImgs = [
      { id: 1, imgUrl: './img-varius/1.jpg', Keywords: ['funny', 'crazy', 'sarcastic', 'all'] },
      { id: 2, imgUrl: './img-varius/2.jpg', Keywords: ['happy', 'funny', 'animal', 'all'] },
      { id: 3, imgUrl: './img-varius/3.jpg', Keywords: ['happy', 'funny', 'all'] },
      { id: 4, imgUrl: './img-varius/4.jpg', Keywords: ['happy', 'funny', 'animal', 'all'] },
      { id: 5, imgUrl: './img-varius/5.jpg', Keywords: ['happy', 'funny', 'sarcastic', 'all'] },
      { id: 6, imgUrl: './img-varius/6.jpg', Keywords: ['famous', 'crazy', 'sarcastic', 'all'] },
      { id: 7, imgUrl: './img-varius/7.jpg', Keywords: ['happy', 'crazy', 'all'] },
      { id: 8, imgUrl: './img-varius/8.jpg', Keywords: ['famous', 'funny', 'all'] },
      { id: 9, imgUrl: './img-varius/9.jpg', Keywords: ['sarcastic', 'crazy', 'all'] },
      { id: 10, imgUrl: './img-varius/10.jpg', Keywords: ['famous', 'sad', 'all'] },
      { id: 11, imgUrl: './img-varius/11.jpg', Keywords: ['happy', 'funny', 'all'] },
      { id: 12, imgUrl: './img-varius/12.jpg', Keywords: ['happy', 'funny', 'all'] },
      { id: 13, imgUrl: './img-varius/13.jpg', Keywords: ['happy', 'funny', 'all'] },
      { id: 14, imgUrl: './img-varius/14.jpg', Keywords: ['funny', 'famous', 'all'] },
      { id: 15, imgUrl: './img-varius/15.jpg', Keywords: ['sad', 'funny', 'crazy', 'all'] },
      { id: 16, imgUrl: './img-varius/16.jpg', Keywords: ['sarcastic', 'funny', 'all'] },
      { id: 17, imgUrl: './img-varius/17.jpg', Keywords: ['happy', 'crazy', 'all'] },
      { id: 18, imgUrl: './img-varius/18.jpg', Keywords: ['crazy', 'sarcastic', 'all'] },
      { id: 19, imgUrl: './img-varius/19.jpg', Keywords: ['crazy', 'sarcastic', 'all'] },
      { id: 20, imgUrl: './img-varius/20.jpg', Keywords: ['crazy', 'sarcastic', 'all'] },
      { id: 21, imgUrl: './img-varius/21.jpg', Keywords: ['crazy', 'sarcastic', 'all'] },
      { id: 22, imgUrl: './img-varius/22.jpg', Keywords: ['crazy', 'sarcastic', 'all'] },
      { id: 23, imgUrl: './img-varius/23.jpg', Keywords: ['crazy', 'sarcastic', 'all'] },
      { id: 24, imgUrl: './img-varius/24.jpg', Keywords: ['crazy', 'sarcastic', 'all'] }
];
var gMeme = {
      selectedImgId: 2,
      selectedImgWidth: undefined,
      selectedImgHeight: undefined,
      selectedLineIdx: 0,
      isLinesMark: false,
      selectedEmojiIdx: 0,
      isEmojiMark: false,
      lines: [],
      emojis: [],
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

function getEmojis() {
      return gEmoji;
}

function updateGmemeImage(imgId) {

      gMeme = {
            selectedImgId: imgId,
            selectedImgWidth: getImageWidth(imgId),
            selectedImgHeight: getImgeHeight(imgId),
            selectedLineIdx: 0,
            isLineSelected: false,
            selectedEmojiIdx: 0,
            isEmojiMark: false,
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
            emojis: [],
            currFontSize: 40,
            lineHeigt: 40,
      }
}

function changeTextLine(newText) {
      gMeme.lines[gMeme.selectedLineIdx].txt = newText;
      gMeme.isLinesMark = true;
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

function addEmoji(emojiId) {
      var currEmoji = gEmoji.find((emoji) => emoji.id === emojiId)
      gMeme.emojis.push(currEmoji);
      gMeme.isEmojiMark = true;
      gMeme.isLinesMark = false;
}

function changeTextSize(value) {
      if (gMeme.isLinesMark) {
            if ((gMeme.currFontSize < 20 && value < 0) || (gMeme.currFontSize >= 60 && value > 0)) return;
            gMeme.currFontSize += value;
            gMeme.lines[gMeme.selectedLineIdx].size += value;
      }

      if (gMeme.isEmojiMark) {
            if ((gMeme.emojis[gMeme.selectedEmojiIdx].imgWidth < 20 && value < 0) || (gMeme.emojis[gMeme.selectedEmojiIdx].imgWidth >= 150 && value > 0)) return;
            gMeme.emojis[gMeme.selectedEmojiIdx].imgWidth += value * 4;
      }
}

function changeAlignment(value) {
      if (gMeme.isLinesMark) {
            gMeme.lines[gMeme.selectedLineIdx].align = value;
      }
}

function changeFillColor(color) {
      if (gMeme.isLinesMark) {
            gMeme.lines[gMeme.selectedLineIdx].color = color;
      }
}

function changeStrokeColor(strokeColor) {
      if (gMeme.isLinesMark) {
            gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor;
      }
}

function changeFont(font) {
      if (gMeme.isLinesMark) {
            gMeme.lines[gMeme.selectedLineIdx].font = font;
      }
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
      if (gMeme.isLinesMark) {
            gMeme.lines.splice(gMeme.selectedLineIdx, 1);
            gMeme.isLinesMark = false;
      }

      if (gMeme.isEmojiMark) {
            gMeme.emojis.splice(gMeme.selectedEmojiIdx, 1);
            gMeme.isEmojiMark = false;
      }
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

function updateEmojiDragging(emojiIndex, pos) {
      gMeme.selectedEmojiIdx = emojiIndex;
      gMeme.isEmojiMark = true;
      //update isDraggin to true and set start pos
      gMeme.emojis[gMeme.selectedEmojiIdx].isEmojiDrag = true;
      gMeme.emojis[gMeme.selectedEmojiIdx].startPosX = pos.x;
      gMeme.emojis[gMeme.selectedEmojiIdx].startPosY = pos.y;
      renderMeme();
}

function removeLineMark() {
      gMeme.isLinesMark = false;
}

function removeEmojiMark() {
      gMeme.isEmojiMark = false;
}

function saveMeme() {
      const data = gElCanvas.toDataURL()
      gSaveMemes.push({ dataUrl: data, id: gSaveMemes.length + 1 })
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

function addImageToList() {
      var newImage = { id: gImgs.length + 1, imgUrl: gImg.src, Keywords: ['crazy', 'sarcastic', 'all'] }
      gImgs.push(newImage);
      renderGallery()
}

function getImageWidth(imgId) {
      var imgSelected = gImgs.find((img) => {
            return img.id === imgId
      });
      var currImg = new Image()
      currImg.src = imgSelected.imgUrl;
      return currImg.width;
}

function getImgeHeight(imgId) {
      var imgSelected = gImgs.find((img) => {
            return img.id === imgId
      });
      var currImg = new Image()
      currImg.src = imgSelected.imgUrl;
      return currImg.height;
}

