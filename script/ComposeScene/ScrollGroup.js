//
// 譜面スクロール関係
//　小松
//

tm.define("ScrollGroup", {
	superClass: "UIObserver",

	init: function (subjects, uiParam) {
		this.superInit(subjects, uiParam);
		this.subjects["scroller"].setScrollPosition(this.x, this.y);
		this.scrollTime = uiParam.scrollTime;
	},

	observe: function () {
		var x = this.subjects["scroller"].getScrollPosition().x;
		var y = this.subjects["scroller"].getScrollPosition().y;
		this.move(x, y);
	},

	move: function (x, y) {
		this.tweener
			.clear()
			.move(x, y, this.scrollTime);
	},
})