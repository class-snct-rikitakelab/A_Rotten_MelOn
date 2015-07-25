//
// 楽譜を水平にスクロールさせるバー
// 小松
//

tm.define("ScrollBar",{
	superClass: "UIObserver",

	init: function (subjects, uiParam) {
		this.superInit(subjects, uiParam);
	},

	observe: function () {
		/*全体との比を維持して移動*/
	},

	onpointingstart: function () {
	},

});