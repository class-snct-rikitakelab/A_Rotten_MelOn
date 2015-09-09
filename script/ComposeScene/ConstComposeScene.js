//
// 作曲シーンに関する定数
// 小松
//

//　新しい楽器を作るときは、これらの音程のファイルを過不足なく作ること。
var KEY_ARRAY = [
	"C2","D2","E2","F2","G2","A2","B2",
	"C3","D3","E3","F3","G3","A3","B3",
	"C4","D4","E4","F4","G4","A4","B4","C5",
];

var KEY_NUM_MAP = {};
for (var i = 0; i < KEY_ARRAY.length; i++)
	KEY_NUM_MAP[KEY_ARRAY[i]] = i;

var INSTRUMENT_ARRAY = [
	"piano",
];

var SCORE_PARAM = {
	minNote: 8, //分音符
	maxMeasureNum: 3,
	keyArray: KEY_ARRAY,
	keyNumMap: KEY_NUM_MAP,
	keyNum: KEY_ARRAY.length,
	moveFadeTime: 20,
	beforeFadeTime: 5,
};

var SCORE_ELEMENT_UI = {
	originX: 0.0,
	originY: 0.0,
	width: 50,
	height: 55,
	shape: "rect",
	fadeTime: 5,
	images: {},
};
$.extend(SCORE_ELEMENT_UI, SCORE_PARAM);

var NOTE_UI = {
	x: 0,
	y: 0,
};
$.extend(NOTE_UI, SCORE_ELEMENT_UI);
NOTE_UI["images"] = {
	"normal": "note",
};

var MEASURE_UI = $.extend({}, SCORE_ELEMENT_UI);
MEASURE_UI["width"] = MEASURE_UI.width * SCORE_PARAM.minNote;
MEASURE_UI["images"] = {
	"C2": "scoreLow",
	"D2": "scoreLow",
	"E2": "scoreLow",
	"F2": "scoreLow",
	"G2": "scoreLow",
	"A2": "scoreLow",
	"B2": "scoreLow",
	"C3": "scoreMiddle",
	"D3": "scoreMiddle",
	"E3": "scoreMiddle",
	"F3": "scoreMiddle",
	"G3": "scoreMiddle",
	"A3": "scoreMiddle",
	"B3": "scoreMiddle",
	"C4": "scoreHigh",
	"D4": "scoreHigh",
	"E4": "scoreHigh",
	"F4": "scoreHigh",
	"G4": "scoreHigh",
	"A4": "scoreHigh",
	"B4": "scoreHigh",
	"C5": "scoreHigh",
};

var MASK_UI = {
	displayMeasureNum: 2,
	displayKeyNum: 8,
	width: MEASURE_UI.width * 2,
	height: MEASURE_UI.height * 8,
	x: 200,
	y: 200,
	originX: 0.0,
	originY: 0.0,
	shape: "rect",
};

var SCROLLER_PARAM = {
	maskX: MASK_UI["x"],
	maskY: MASK_UI["y"],
	maskWidth: MASK_UI["width"],
	maskHeight: MASK_UI["height"],
	elementWidth: SCORE_ELEMENT_UI["width"],
	elementHeight: SCORE_ELEMENT_UI["height"],
	scrollX: 0,
	scrollY: 0,
	minNote: SCORE_PARAM["minNote"],
	keyNum: SCORE_PARAM["keyNum"],
	displayKeyNum: MASK_UI["displayKeyNum"],
	displayMeasureNum: MASK_UI["displayMeasureNum"],
	defaultLowestKeyNum: KEY_NUM_MAP["C3"],
	defaultLeftestElementNum: 0,
	defaultOpenedMaxMeasureNum: 3,
	// openedMaxMeasureNum は、ScrollerとMusicPlayer両方を操作すること
};

var SCROLL_GROUP_UI = {
	x: 0,
	y: -SCROLLER_PARAM["defaultLowestKeyNum"] * MEASURE_UI["height"],
	originX: 0.0,
	originY: 0.0,
	scrollTime: 200,	// [ms]
};

var SCROLL_BUTTON_RIGHT_UI = {
	x: 960,
	y: 700,
	width: 80,
	height: 80,
	longPressTime: 4,
	displayMeasureNum: MASK_UI["displayMeasureNum"],
	minNote: SCORE_PARAM["minNote"],
	direction: "right",
	shape: "rect",
	images: {
		offImage: "scrollButtonRightOff",
	},
}

var SCROLL_BUTTON_LEFT_UI = {
	x: 230,
	y: SCROLL_BUTTON_RIGHT_UI["y"],
	width: SCROLL_BUTTON_RIGHT_UI["width"],
	height: SCROLL_BUTTON_RIGHT_UI["height"],
	longPressTime: SCROLL_BUTTON_RIGHT_UI["longPressTime"],
	displayMeasureNum: MASK_UI["displayMeasureNum"],
	minNote: SCORE_PARAM["minNote"],
	direction: "left",
	shape: "rect",
	images: {
		offImage: "scrollButtonLeftOff",
	},
}

var SCROLL_BUTTON_UP_UI = {
	x: 120,
	y: 240,
	width: SCROLL_BUTTON_RIGHT_UI["width"],
	height: SCROLL_BUTTON_RIGHT_UI["height"],
	longPressTime: SCROLL_BUTTON_RIGHT_UI["longPressTime"],
	displayMeasureNum: MASK_UI["displayMeasureNum"],
	minNote: SCORE_PARAM["minNote"],
	direction: "up",
	shape: "rect",
	images: {
		offImage: "scrollButtonUpOff",
	},
}

var SCROLL_BUTTON_DOWN_UI = {
	x: SCROLL_BUTTON_UP_UI["x"],
	y: 600,
	width: SCROLL_BUTTON_RIGHT_UI["width"],
	height: SCROLL_BUTTON_RIGHT_UI["height"],
	longPressTime: SCROLL_BUTTON_RIGHT_UI["longPressTime"],
	displayMeasureNum: MASK_UI["displayMeasureNum"],
	minNote: SCORE_PARAM["minNote"],
	direction: "down",
	shape: "rect",
	images: {
		offImage: "scrollButtonDownOff",
	},
}

var STATIONERY_PARAM = {
	wrightStationery: "pencil",
	eraseStationery: "eraser",
	defaultStationery: "pencil",
};

var PENCIL_BUTTON_UI = {
	name: STATIONERY_PARAM.wrightStationery,
	width: 100,
	height: 80,
	x: 300,
	y: 100,
	shape: "rect",
	images: {
		onImage: "pencilOn",
		offImage: "pencilOff",
	},
};

var ERASER_BUTTON_UI = {
	name: STATIONERY_PARAM.eraseStationery,
	width: 100,
	height: 80,
	x: 420,
	y: 100,
	shape: "rect",
	images: {
		onImage: "eraserOn",
		offImage: "eraserOff",
	},
};

var MUSIC_PLAYER_PARAM = {
	defaultBpm: 120,
	defaultOpenedMaxMeasureNum: SCROLLER_PARAM["defaultOpenedMaxMeasureNum"],
	// openedMaxMeasureNum は、ScrollerとMusicPlayer両方を操作すること
};
$.extend(MUSIC_PLAYER_PARAM, SCORE_PARAM);


var PLAY_BUTTON_UI = {
	width: 90,
	height: 90,
	x: 540,
	y: 100,
	shape:"circle",
	images:{
		onImage:"playButtonOn",
		offImage:"playButtonOff",
	},
};

var BACK_GROUND_UI = {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
	x: SCREEN_WIDTH/2,
	y: SCREEN_HEIGHT/2,
	image: "backGround",
};

var MASK_FRAME_UI = {
	width: 0,
	height: 0,
	originX: 0,
	originY: 0,
	x: 0,
	y: 0,
	image: "frame",
};

Object.freeze(SCORE_PARAM);
Object.freeze(SCORE_ELEMENT_UI);
Object.freeze(NOTE_UI);
Object.freeze(MEASURE_UI);
Object.freeze(MASK_UI);
Object.freeze(SCROLL_GROUP_UI);
Object.freeze(SCROLLER_PARAM);
Object.freeze(SCROLL_BUTTON_RIGHT_UI);
Object.freeze(SCROLL_BUTTON_LEFT_UI);
Object.freeze(SCROLL_BUTTON_UP_UI);
Object.freeze(SCROLL_BUTTON_DOWN_UI);
Object.freeze(STATIONERY_PARAM);
Object.freeze(PENCIL_BUTTON_UI);
Object.freeze(ERASER_BUTTON_UI);
Object.freeze(MUSIC_PLAYER_PARAM);
Object.freeze(PLAY_BUTTON_UI);
Object.freeze(BACK_GROUND_UI);
Object.freeze(MASK_FRAME_UI)