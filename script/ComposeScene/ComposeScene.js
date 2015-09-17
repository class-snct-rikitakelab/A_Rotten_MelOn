//
// 作曲シーン
// 小松
// 

tm.define("ComposeScene", {
	superClass: "tm.app.Scene",

	init: function() {
		this.superInit()
		this._addSound(SOUND, INSTRUMENT_ARRAY);

		BackGround(BACK_GROUND_UI).addChildTo(this);
		this.mask = Mask({}, MASK_UI).addChildTo(this);
		
		MelOnLogo({}, {}).addChildTo(this)

		// Subject
		this.score = Score(SCORE_PARAM);
		this.scroller = Scroller(SCROLLER_PARAM);
		this.stationery = Stationery(STATIONERY_PARAM);
		this.musicPlayer = MusicPlayer(MUSIC_PLAYER_PARAM);

		// Stationery
		StationeryButton({stationery: this.stationery,}, PENCIL_BUTTON_UI).addChildTo(this);
		StationeryButton({stationery: this.stationery,}, ERASER_BUTTON_UI).addChildTo(this);
		this.stationery.notify();

		// Scroller
		var scrollNButtonSubjects = {scroller: this.scroller, musicPlayer: this.musicPlayer}
		ScrollButton(scrollNButtonSubjects, SCROLL_BUTTON_RIGHT_UI).addChildTo(this);
		ScrollButton(scrollNButtonSubjects, SCROLL_BUTTON_LEFT_UI).addChildTo(this);
		ScrollButton(scrollNButtonSubjects, SCROLL_BUTTON_UP_UI).addChildTo(this);
		ScrollButton(scrollNButtonSubjects, SCROLL_BUTTON_DOWN_UI).addChildTo(this);
		this.scrollGroup = ScrollGroup({scroller: this.scroller}, SCROLL_GROUP_UI).addChildTo(this.mask);

		// Score
		for(var i = 0; i < SCORE_PARAM.maxMeasureNum; i++) this._createMeasure(SCORE_PARAM, i);
		var noteHolderSubjects = {score: this.score, stationery: this.stationery, scroller: this.scroller};
		NoteHolder(noteHolderSubjects, NOTE_UI).addChildTo(this.scrollGroup);

		// Music Player
		var musicPlaySubjects = {	score: this.score, 
									musicPlayer: this.musicPlayer, 
									scroller: this.scroller};
		PlayButton(musicPlaySubjects, PLAY_BUTTON_UI).addChildTo(this);
		this.musicPlayer.notify();
	},

	_addSound:function (sounds) {
		for(var instrumentName in sounds)
			for(var soundName in sounds[instrumentName])
				sounds[instrumentName][soundName].addChildTo(this);
	},

	_createMeasure: function(param, measureNum) {
		for(var i = 0; i < param.keyNum; i++) {
			var keyName = param.keyArray[i];
			Measure({}, MEASURE_UI, {keyName: keyName, measureNum: measureNum}).addChildTo(this.scrollGroup);
			this._createScoreElementsInKeyMeasure(param, keyName, measureNum);
		}
	},

	_createScoreElementsInKeyMeasure: function(param, keyName, measureNum) {
		var scoreElementSubjects = {score: this.score, stationery: this.stationery, scroller: this.scroller};
		for( var i = 0; i < param.minNote; i++) {
			var scoreElementInitData = {keyName: keyName, elementNum: i + measureNum * param.minNote};
			ScoreElement(scoreElementSubjects, SCORE_ELEMENT_UI, scoreElementInitData).addChildTo(this.scrollGroup);
		}
	},
});