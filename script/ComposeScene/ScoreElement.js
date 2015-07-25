//
// 音符へのタッチに対応する透明なレイヤー
// 小松
//

tm.define("ScoreElement",{
	superClass: "UIObserver",

	init: function (subjects, uiParam, initData) {
		this.superInit(subjects, uiParam);
		this.keyName = initData.keyName;
		this.elementNum = initData.elementNum;
		
		var x = this.width * this.elementNum;
		var y = this.height * (this.param.keyNum-1 - this.param.keyNumMap[this.keyName]);
		this.setPosition(x, y);

		this.subjects["stationery"].removeObserver(this);
		this.subjects["scroller"].removeObserver(this);
	},

	observe: function () {},

	onpointingstart: function (e) {
		if(!this.subjects["scroller"].isInMask(e.app.pointing.x, e.app.pointing.y))return;
		var score = this.subjects["score"];
		var stationery = this.subjects["stationery"];

		if(stationery.isWritable()){
			SOUND["piano"][this.keyName].play();
			this._writeNote(score);
		}

		if(stationery.isEraseable())
			score.eraseNote(this.keyName, this.elementNum);
	},

	_writeNote: function (score) {
		if (score.isWritable(this.keyName, this.elementNum)) {
				score.writeNote(this.keyName, this.elementNum);
				return;
			}
		score.startMovingNote(this.keyName, this.elementNum);
	},

	onpointingover: function (e) {
		if(!this.subjects["scroller"].isInMask(e.app.pointing.x, e.app.pointing.y))return;
		var score = this.subjects["score"];
		var stationery = this.subjects["stationery"];
		if(stationery.isWritable()){
			this._strechNote(score);
			this._moveNote(score);
		}
		if(stationery.isEraseable() && e.pointing.press)
			score.eraseNote(this.keyName, this.elementNum);
	},

	_strechNote: function (score) {
		if (!score.isStretching())return;
		score.lengthenNote(this.elementNum);
		score.shortenNote(this.elementNum);
	},

	_moveNote: function (score) {
		// TODO：解放されている楽譜に入っているように！
		if (!score.isMoving())return;
		score.moveNote(this.keyName, this.elementNum);
	},

	onpointingend: function() {
		SOUND["piano"][this.keyName].fadeStart(this.param.fadeTime);
		this.subjects["score"].refleshMode();
	},
});