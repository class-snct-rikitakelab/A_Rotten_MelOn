//
// 音符を扱うクラス:実体を持たないオブザーバ
// 小松
//

tm.define("NoteHolder", {
	superClass: "UIObserver",

	init: function (subjects, uiParam) {
		this.superInit(subjects, uiParam);
		this.subjects["stationery"].removeObserver(this);
		this.subjects["scroller"].removeObserver(this);
	},

	observe: function () {
		// 全ての音符をリフレッシュ
		this.removeChildren();
		for(i = 0; i < this.param.keyNum; i++)
			this._displayNotesInKey(this.param.keyArray[i]);
	},

	_displayNotesInKey: function (keyName) {
		var noteNumInKey = this.param.minNote * this.subjects["scroller"].getOpenedNum();
		var score = this.subjects["score"];
		for(j = 0; j < noteNumInKey; ++j) this._displayNote(score, keyName, j);
	},

	_displayNote: function (score, keyName, elementNum) {
		if(!score.isNoteHead(keyName, elementNum)) return;
		var noteX = this.param.width * elementNum;
		var noteY = this.param.height * (this.param.keyNum-1 - this.param.keyNumMap[keyName]);
		var noteInit = {x: noteX, y: noteY, keyName: keyName, elementNum: elementNum};
		Note(this.subjects, this.param, noteInit).addChildTo(this);
	},
})