//
// 押すとその文房具を使う状態に遷移するボタン
// 小松
//

tm.define("StationeryButton",{
	superClass: "UIObserver",

	init: function (subjects, uiParam) {
		this.superInit(subjects, uiParam);
		this.name = uiParam.name;

		this.stationery = this.subjects.stationery;
		
	},

	observe: function () {
		if( this.stationery.checkStationery(this.name) )
		{
			this.changeImage("onImage");
			return;
		};

		this.changeImage("offImage");
	},

	onpointingstart: function () {
		this.stationery.changeStationery(this.name);
		this.stationery.notify();
	},

});