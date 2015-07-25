//
// 楽譜を操作する文房具のSubject
//　小松
//

tm.define("Stationery",{
	superClass: "Subject",

	init: function (param) {
		this.superInit();
		this.stationeryList = param;
		this.stationery = this.stationeryList.defaultStationery;
	},

	changeStationery:function (stationery) {
		this.stationery = stationery;
	},

	checkStationery: function (stationery) {
		return this.stationery == stationery;
	},

	isWritable: function () {
		return this.checkStationery( this.stationeryList.wrightStationery );
	},

	isEraseable: function () {
		return this.checkStationery( this.stationeryList.eraseStationery );
	},

});