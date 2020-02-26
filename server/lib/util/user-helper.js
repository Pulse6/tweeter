"use strict";

const Chance      = require("chance"),
      chance      = new Chance();

const md5 = require('md5');


module.exports = {
  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.last();
    const userName  = firstName + " " + lastName;
    
    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }
   
    const avatars = {
    
      Female: ["https://i.ya-webdesign.com/images/anime-girl-sad-png-5.png", "https://www.pinclipart.com/picdir/middle/72-727796_chibi-clipart-cat-cat-anime-png-download.png", "https://clipartart.com/images/anime-eyes-clipart-blush-4.jpg", "https://c7.uihere.com/files/1008/707/809/my-hero-academia-fan-art-anime-anime.jpg"],
      Male: ["https://i.imgur.com/03gY3Bi.gif", "https://i.imgur.com/qJmFVmi.jpg", "https://pngimage.net/wp-content/uploads/2018/06/personajes-de-anime-png-5.png", "https://img.favpng.com/10/0/3/anime-icon-away-icon-face-icon-png-favpng-kQqBnHR7jN8TxGRq3TJhqzewe.jpg"]
    
    }
    
    const avatarArray = avatars[gender]
    const userAvatar = avatarArray[Math.floor(Math.random()*avatarArray.length)]
  

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar
    };
  }
};