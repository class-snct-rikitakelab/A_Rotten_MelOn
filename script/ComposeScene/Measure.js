//
// 1つの小節のObserver
//　小松
//

tm.define("Measure", {
	superClass: "UIObserver",

	init: function (subjects, uiParam, initData) {
		this.superInit(subjects, uiParam);
		this.keyName = initData.keyName;
		this.measureNum = initData.measureNum
	
		var x = this.width * this.measureNum;
		var y = this.height * (this.param.keyNum-1 - this.param.keyNumMap[this.keyName]);
		this.setPosition(x, y);
		this.setInteractive(false);
		this.changeImage(this.keyName);
	},

	observe: function () {},
});