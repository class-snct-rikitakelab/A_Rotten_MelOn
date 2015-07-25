//
// 楽譜を扱うSubject
// 小松
//

tm.define("Score", {
	superClass: "Subject",
	music: {},
	_isStretching: false,
	_isMoving: false,
	selectedNote: {keyName: undefined, headNum: undefined, 
					length: undefined, point: undefined},

	init: function (param) {
		this.superInit(param);
		this.param = param;
		this.initMusic();
	},

	initMusic:　function () {
		this.music = {};
		for( key in this.param.keyArray ) this._initKey(this.param.keyArray[key]);
	},

	_initKey: function (keyName) {
		var lastElementNum = this.param.minNote * this.param.maxMeasureNum;
		this.music[keyName] = [];
		for(var i = 0; i < lastElementNum; i++) this.music[keyName][i] = 0;
	},

	isNoteHead: function (keyName, elementNum) {
		return this.music[keyName][elementNum] == 1;
	},

	isLengthened: function (keyName, elementNum) {
		return this.music[keyName][elementNum] == -1;
	},

	isWritable: function (keyName, elementNum) {
		return this.music[keyName][elementNum] == 0;
	},

	isNoteTail:  function (keyName, elementNum) {
		return ( !this.isWritable(keyName, elementNum) &&
				 !this.isLengthened(keyName, elementNum+1) );
	},

	writeNote: function (keyName, elementNum) {
		if(!this.isWritable(keyName,elementNum)) return;
		this.music[keyName][elementNum] = 1;
		this.startStretchingNote(keyName, elementNum);
		this.notify();
	},

	startMovingNote: function (keyName, elementNum) {
		this._isMoving = true;
		this.selectNote(keyName, elementNum);
	},

	startStretchingNote: function (keyName, elementNum) {
		this._isStretching = true;
		this.selectNote(keyName, elementNum);
	},

	selectNote: function (keyName, elementNum) {
		var length = 1;
		for(var p = elementNum; !this.isNoteHead(keyName, p); p--){}
		for(var q = p+1; this.isLengthened(keyName, q); q++)length++;
		this.selectedNote["keyName"] = keyName;
		this.selectedNote["headNum"] = p;
		this.selectedNote["point"] = elementNum - p;
		this.selectedNote["length"] = length;
	},

	lengthenNote: function (elementNum) {
		var selKey = this.selectedNote["keyName"];
		var selHead = this.selectedNote["headNum"];
		for(var i=selHead+1; i <= elementNum && !this.isNoteHead(selKey, i); i++)
			this.music[selKey][i] = -1;
		this.notify();
	},

	shortenNote: function (elementNum) {
		var selKey = this.selectedNote["keyName"];
		var selHead = this.selectedNote["headNum"];
		for(var i = selHead+1; i <= elementNum; i++)
			if( this.isNoteHead(selKey, i) ) return;
		for((elementNum < selHead)? i=selHead+1:i=elementNum+1; 
				this.isLengthened(selKey, i); i++)
			this.music[selKey][i] = 0;
		this.notify();
	},

	eraseNote: function (keyName, elementNum) {
		if(this.isWritable(keyName, elementNum)) return;
		this.selectNote(keyName, elementNum);
		var headNum = this.selectedNote["headNum"];
		this.music[keyName][headNum] = 0;
		this.shortenNote(headNum);
		this.notify();
	},

	moveNote: function (keyName, elementNum) {
		var n = this.selectedNote;
		if(elementNum - n.point < 0) return;
		var newHead = elementNum - n.point;
		if(this.isCollision(keyName, elementNum)) return;
		this.moveSound(keyName, this.selectedNote["keyName"]);
		this.eraseNote(n.keyName, n.headNum);
		this.music[keyName][newHead] = 1;
		for(var i = 1; i < n.length; i++) this.music[keyName][newHead+i] = -1;
		this.selectNote(keyName, elementNum);
		this.notify();
	},

	moveSound: function (newKeyName, oldKeyName) {
		if(newKeyName != oldKeyName){
			SOUND["piano"][oldKeyName].fadeStart(this.param.beforeFadeTime);
			SOUND["piano"][newKeyName].play();
			SOUND["piano"][newKeyName].fadeStart(this.param.moveFadeTime);
		}
	},

	isCollision: function (keyName, elementNum) {
		var n = this.selectedNote;
		var newHead = elementNum - n.point;
		var newTail = newHead + n.length;
		for (var i = newHead; i < newTail; i++)
			if (!this.isWritable(keyName, i) && 
				!this.isSelectedNote(keyName, i)) return true;
		return false;
	},

	isSelectedNote: function (keyName, elementNum) {
		var n = this.selectedNote;
		if (keyName != n.keyName)return false;
		if (elementNum < n.headNum || 
			elementNum >= n.headNum + n.length)return false;
		return true;
	},

	isStretching: function () {
		return this._isStretching;
	},

	isMoving: function () {
		return this._isMoving;
	},

	refleshMode:function () {
		this._isStretching = false;
		this._isMoving = false;
		for( member in this.selectedNote) this.selectedNote[member] = undefined;
	},
})