//
// このアプリケーションそのものに関する定数
//

var SCREEN_WIDTH = 1024;
var SCREEN_HEIGHT = 768;
var FPS = 30;	// 30以上にはならない模様？
var DEFAULT_LANGUAGE = "JAPAN"; // 言語はいずれ変更できるようにする。

// ロード時の背景色をランダムに変える
function rndc () {return Math.round( (Math.random() * 255) );};
var LOADING_RGB = "rgb(" + rndc() + "," + rndc() + "," + rndc() + ")";