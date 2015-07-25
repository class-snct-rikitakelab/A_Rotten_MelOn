//
// ObserverとなるUIのスーパークラス
// 小松
//

tm.define("UIObserver",{
	superClass: "tm.display.CanvasElement",

	imageArray: {},

	init: function (subjects, uiParam) {
		this.superInit();
		this.setSize(uiParam.width, uiParam.height);
		this._setUIOrigin(uiParam.originX, uiParam.originY);
		this.setPosition(uiParam.x, uiParam.y);
        this.setBoundingType(uiParam.shape);
        this.setInteractive(true);
        this.createImages(uiParam.images);
        this.subjects = subjects;
        this.param = uiParam;
		this.activateAllNotify();
	},

	createImages: function (images) {
		this.imageArray = {};
		for(image in images)
		{
			this.imageArray[image] = tm.app.Sprite(images[image], this.width, this.height);
			this.imageArray[image].setOrigin(this.originX, this.originY);
		};
	},

	_setUIOrigin: function (x, y) {
		if(x == undefined || y == undefined)
		{
			return this.setOrigin(0.5, 0.5);
		};
		return this.setOrigin(x, y);
	},

	changeImage: function (image) {
		this.removeChildren();
		this.imageArray[image].setSize(this.width, this.height);
		this.imageArray[image].setOrigin(this.originX, this.originY);
		this.imageArray[image].addChildTo(this);
	},

	activateAllNotify: function () {
		for(subject in this.subjects) {
	        this.subjects[subject].addObserver(this);
	    };
	},

	observe: function () {
		// override!
	},

})