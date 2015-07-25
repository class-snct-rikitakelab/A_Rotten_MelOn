//
// MelOn Logo　Class
// 小松
//

tm.define("MelOnLogo", {
	superClass: "UIObserver",

	init: function (subjects, uiParam) {
		var param = {
			x: 800, y: 100, 
			width: 300, height: 150,
			shape: "rect",
			images: {logo: "MelOnLogo"},
		};
		this.superInit(subjects, param);
		this.changeImage("logo");
		SOUND["SE"]["MelOn!"].play();
	},

	onpointingstart: function () {
		SOUND["SE"]["MelOn!"].play();
	},
})