//
// 音符クラス
//　小松
//

tm.define("Note", {
	superClass: "UIObserver",

	init: function (subjects, uiParam, initData) {
		this.superInit(subjects, uiParam);
		this.originalWidth = uiParam.width;
		this.setPosition(initData.x, initData.y);
		this.subjects["stationery"].removeObserver(this);
		this.lengthen(initData.keyName, initData.elementNum)
		this.changeImage("normal");
	},

	observe: function () {},

	lengthen: function (keyName, elementNum) {
		var score = this.subjects["score"];
		for(var i = elementNum+1; score.isLengthened(keyName, i); i++) {}
		this.width = this.width * (i - elementNum);
	},
})