//
// 音声ファイルの読み込み
// 小松
//

//　音声ファイルの場所:階層構造をここで決める。
var SOUND_LOCATION = "sound/";
var SOUND_LOCATION_PIANO = SOUND_LOCATION + "piano/";
var SOUND_LOCATION_SE = SOUND_LOCATION + "se/"

// 音声ファイルの場所にそのブロックの名前を付ける。SOUND_MAPのブロック名と一致させること。
var SOUND_LOCATION_MAP = {
	piano: SOUND_LOCATION_PIANO,
	SE: SOUND_LOCATION_SE,
};

//　追加するファイルをブロックに分けられる。SOUND_LOCATION_MAPのブロック名と一致させること。
var SOUND_MAP = {	
	SE:
	{
		"MelOn!": "MelOn!.mp3",
	},
	
	BGM:
	{

	},

	piano:
	{
		"C2": "pianoC2.mp3",
		"D2": "pianoD2.mp3",
		"E2": "pianoE2.mp3",
		"F2": "pianoF2.mp3",
		"G2": "pianoG2.mp3",
		"A2": "pianoA2.mp3",
		"B2": "pianoB2.mp3",
		"C3": "pianoC3.mp3",
		"D3": "pianoD3.mp3",
		"E3": "pianoE3.mp3",
		"F3": "pianoF3.mp3",
		"G3": "pianoG3.mp3",
		"A3": "pianoA3.mp3",
		"B3": "pianoB3.mp3",
		"C4": "pianoC4.mp3",
		"D4": "pianoD4.mp3",
		"E4": "pianoE4.mp3",
		"F4": "pianoF4.mp3",
		"G4": "pianoG4.mp3",
		"A4": "pianoA4.mp3",
		"B4": "pianoB4.mp3",
		"C5": "pianoC5.mp3",
	},
};



//
// ココから下は気にしない
//

// フェードアウトできるようにSoundをラップ
// シーンにaddChildしないと動かないので注意
tm.define("fadableSound",{
	superClass: "tm.display.CanvasElement",

	fadeAmount: 1.0,
	isFading: false,

	init: function (sound) {
		this.superInit();
		this.sound = sound;
	},

	update: function () {
		if(this.isFading) this._fade();
	},

	play: function () {
		this.stop();
		this.sound.play();
	},

	stop: function () {
		this.sound.stop();
		this.isFading = false;
        this.sound.volume = 1.0;
	},

    fadeStart: function (fadeTime, fadeRate) {
    	this.isFading = true;
        this.fadeAmount = 1.0 / fadeTime;
    },

    _fade: function () {
    	var volume = this.sound.volume - this.fadeAmount;
        if (volume <= this.fadeAmount) {
            this.stop();
            return;
        }
        this.sound.volume = volume;
    },
})

var SOUND = {};
for (var block_name in SOUND_MAP)
{
	SOUND[block_name] = {};
	for (var sound_name in SOUND_MAP[block_name])
	{
		var filename = SOUND_MAP[block_name][sound_name];
		var src = SOUND_LOCATION_MAP[block_name] + filename;
		SOUND[block_name][sound_name] = fadableSound( tm.sound.Sound(src) );
	};
};
