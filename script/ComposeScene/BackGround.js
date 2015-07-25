//
// 作曲シーンの背景
// 小松
//

tm.define("BackGround", {
	superClass: "tm.app.Object2D",

	init: function (uiParam) {
		this.superInit();

		this.image = tm.app.Sprite(uiParam.image, uiParam.width, uiParam.height).addChildTo(this);
		this.image.position.set(uiParam.x, uiParam.y);
	},
});