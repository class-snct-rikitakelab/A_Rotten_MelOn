//
// 押すと音楽の再生、停止ができるボタン（再生位置から）
// 小松
//

tm.define("PlayButton",{
	superClass: "UIObserver",

	init: function (subjects, uiParam) {
		this.superInit(subjects, uiParam);
		this.subjects["scroller"].removeObserver(this);
	},

	observe: function () {
		if(this.subjects["musicPlayer"].isPlaying()){
			this.changeImage("onImage");
			return;
		};
		this.changeImage("offImage");
	},

	onpointingstart: function () {
		var mp = this.subjects["musicPlayer"];
		if(!mp.isPlaying()){
			this.subjects["scroller"].moveOrigin();
			mp.start(this.subjects["score"]);
			return;
		}
		mp.stop();
	},

	update: function () {
		var mp = this.subjects["musicPlayer"];
		if(!mp.isPlaying()) return;
		mp.playMusic(this.subjects["score"]);
	},

});