//
//　楽譜が見える窓（マスク）
// 小松
//

tm.define("Mask", {
	superClass: "UIObserver",

	init: function (subject, uiParam) {
		this.superInit(subject, uiParam);
		this.clipping = true;
		this.openedMaxMeasureNum = this.param.defaultMeasureNum;
	},

	observe: function () {},
});