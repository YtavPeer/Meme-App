'use strict';

/* Globals */
var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gImgs = [{ id: 1, imgUrl: './img-square/1.jpg', Keywords: ['happy', 'funny'] }];
var gMeme = {
      selectedImgId: 1,
      selectedLineIdx: 0,
      lines: [
            {
                  txt: 'I never eat Falafel',
                  size: 20,
                  align: 'left',
                  color: 'blue'
            }
      ]
}


function getGmeme() {
      return gMeme;
}


function getCurrImg(imgId) {
      return gImgs.find(img => {
            return img.id === imgId;
      })
}


function addTextLine(newText) {
      var newLine = {
            txt: newText,
            size: 20,
            align: 'left',
            color: 'red'
      }
      gMeme.lines.push(newLine);
}


