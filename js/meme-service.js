'use strict';

/* Globals */
var gKeywords = { 'happy': 12, 'funny puk': 1 };

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
      lines: [
            {
                  txt: 'I never eat Falafel',
                  size: 20,
                  align: 'left',
                  color: 'blue'
            }
      ]
}

function getImgs() {
      return gImgs
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

function updateGmeme(imgId) {
      gMeme = {
            selectedImgId: imgId,
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
}