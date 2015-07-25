//
// 音楽を再生するクラス:実体を持たないオブザーバ
// 小松
//

// playingElementNum: 先頭を0として、8分音符何個分のところを再生しているか

tm.define("MusicPlayer", {
	superClass: "Subject",

	bpm: 100,
	_isPlaying: false,
	useMetronome: true,
	frame: 0,
	elementFrame: 0,
	playingElementNum: 0,
	openedMaxMeasureNum: 0,
	musicEndNum: 0,

	init: function (param) {
		this.superInit(param);
		this.bpm = this.param.defaultBpm;
		this.openedMaxMeasureNum = this.param.defaultOpenedMaxMeasureNum;
		this.beatNum = this.param.minNote / 4;
	},

	extendScore: function () {
		this.openedMaxMeasureNum++;
	},

	reduceScore: function () {
		this.openedMaxMeasureNum--;
	},

	getOpenedNum: function () {
		return this.openedMaxMeasureNum;
	},

	stop: function() {
		this._isPlaying = false;
		this.frame = 0;
		this.playingElementNum = 0;
		this.allSoundStop();
		this.notify();
	},

	start: function(scoreSubject) {
		this.musicEndNum = this.searchMusicEnd(scoreSubject);
		if(this.musicEndNum == -1) return;
		this._isPlaying = true;
		this.elementFrame = this.calcElementFrame();
		this.notify();
	},

	calcElementFrame: function () {
		var beatTime = 60 / this.bpm;	// 1拍の時間
		var elementTime = beatTime / (this.param.minNote / 4);	// element1つを再生する時間
		var elementFrame = app.fps * elementTime;	// element1つを再生するフレーム数
		return elementFrame;	// 小数が返ることもあるので注意！
	},

	searchMusicEnd: function (scoreSubject) {
		var openedNum = this.openedMaxMeasureNum * this.param.minNote;
		var endNum = -1;
		for(var keyName in this.param.keyNumMap){
			for(var i =0; i < openedNum; i++){
				if(i > endNum && !scoreSubject.isWritable(keyName, i))
					endNum = i;
			}
		}
		return endNum;
	},

	isPlaying: function () {
		return this._isPlaying;
	},

	getPlayingPosition: function () {
		return this.playingElementNum;
	},

	playMusic: function(scoreSubject) {
		this.score = scoreSubject;
		this.advance();
		this.frame++;
	},

	advance: function() {
		if(this.frame >= this.elementFrame * this.playingElementNum){
			this.playMetronome();
			this.playElement();
			this.playingElementNum++;
			this.notify();
			this.checkStop();
		}
	},

	playMetronome: function () {
		if(!this.useMetronome) return;
		if(this.playingElementNum % this.beatNum == 0)
			SOUND["SE"]["Metronome"].play();
	},

	checkStop: function () {
		if(this.playingElementNum > this.musicEndNum)
			this.stop();
	},

	playElement: function() {
		for(i = 0; i < this.param.keyNum; ++i) {
			this.playWithCheck(KEY_ARRAY[i]);
			this.stopWithCheck(KEY_ARRAY[i]);
		}
	},

	playWithCheck: function(keyName) {
		if(this.score.isNoteHead(keyName, this.playingElementNum))
			SOUND["piano"][keyName].play();
	},

	stopWithCheck: function(keyName) {
		if(this.score.isNoteTail(keyName, this.playingElementNum))
			SOUND["piano"][keyName].fadeStart(this.elementFrame*2);
	},

	allSoundStop: function () {
		for(i = 0; i < this.param.keyNum; ++i) {
			var keyName = this.param.keyArray[i];
			SOUND["piano"][keyName].fadeStart(this.elementFrame*2);
		}
	},
});