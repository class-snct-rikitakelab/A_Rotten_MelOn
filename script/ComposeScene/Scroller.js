//
// 譜面スクロール状態を持つサブジェクト
// 小松
//

tm.define("Scroller", {
	superClass: "Subject",
	openedMaxMeasureNum: 0,
	leftestElementNum: 0,
	lowestKeyNum: 0,

	init: function (param) {
		this.superInit(param);
		this.openedMaxMeasureNum = this.param.defaultOpenedMaxMeasureNum;
		this.leftestElementNum = this.param.defaultLeftestElementNum;
		this.lowestKeyNum = this.param.defaultLowestKeyNum;
	},

	isInMask: function (x, y) {
		var p = this.param;
		return x >= p.maskX && y >= p.maskY &&
				x <= p.maskX + p.maskWidth &&
				y <= p.maskY + p.maskHeight;
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

	getLeftestElementNum: function () {
		return this.leftestElementNum;
	},

	getScrollPosition: function () {
		return {x: this.scrollX, y:this.scrollY};
	},

	setScrollPosition: function (x, y) {
		this.scrollX = x;
		this.scrollY = y;
	},

	scroll: function (elementNum, keyNum) {
		this.scrollHorizonally(elementNum);
		this.scrollVertically(keyNum);
		this.notify();
	},

	scrollHorizonally: function (elementNum) {
		var newNum = this.leftestElementNum + elementNum;
		var endNum =(this.openedMaxMeasureNum - this.param.displayMeasureNum) 
					* this.param.minNote
		if(newNum < 0 || newNum > endNum) return;
		this.leftestElementNum = newNum;
		this.scrollX -= this.param.elementWidth * elementNum;
	},

	scrollVertically: function (keyNum) {
		var newNum = this.lowestKeyNum + keyNum;
		if(newNum < 0 || newNum >= this.param.keyNum - this.param.displayKeyNum) return;
		this.lowestKeyNum += keyNum;
		this.scrollY += this.param.elementHeight * keyNum;
	},

	moveOrigin: function () {
		while(this.scrollX < 0) this.scroll(-1,0);
	},
});