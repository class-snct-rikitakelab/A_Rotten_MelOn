//
// 上下左右に楽譜をスクロールするボタン
//　小松
//

tm.define("ScrollButton", {
	superClass: "UIObserver",

	count: 0,

	init: function (subjects, uiParam) {
		this.superInit(subjects, uiParam);
		this.changeImage("offImage");
	},

	observe: function () {
		var leftestNum = this.subjects["scroller"].getLeftestElementNum();
		var rightEndPosition = leftestNum + this.param.displayMeasureNum * this.param.minNote;
		var playingPosition = this.subjects["musicPlayer"].getPlayingPosition();
		if(playingPosition > rightEndPosition) this.scrollPage();
	},

	scrollPage: function () {
		var playingPosition = this.subjects["musicPlayer"].getPlayingPosition();
		var pageElementNum = this.param.minNote * this.param.displayMeasureNum;
		for(var i = 0; i < pageElementNum; i++)
			this.scrollOnce();
	},

	onpointingstart: function () {
		// 押したときのイメージチェンジ
		this.scrollOnce();
	},

	scrollOnce: function () {
		var scroller = this.subjects["scroller"];
		switch(this.param.direction){
			case "up"	: scroller.scroll(0, 1);	break;
			case "down"	: scroller.scroll(0, -1);	break;
			case "right": scroller.scroll(1, 0);	break;
			case "left"	: scroller.scroll(-1, 0);	break;
			default		: console.log("scrErr");	break;
		}
	},

	onpointingmove: function () {
		this.count++;
		if(this.count == this.param.longPressTime){
			this.scrollOnce();
			this.count = 0;
		}
	},

	onpointingend: function () {
		this.count = 0;
		//　離したときのイメージチェンジ
	},
})