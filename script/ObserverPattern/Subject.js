//
// ObserverパターンにおけるSubjectのスーパークラス
//　小松
//

tm.define("Subject", {
    init: function (param) {
        this.param = param;
        this.observerArray = [];
    },

    addObserver: function(observer) {
    	this.observerArray.push(observer);
    },

    removeObserver: function (observer) {
        var index = this.indexOf(observer);
        if(index == -1) return -1; // 削除失敗、存在しない
        this.observerArray.splice(index, 1);
        return 1;　// 削除成功
    },

    indexOf: function (observer) {
        var arrayLength = this.observerArray.length;
        for(var i = 0; (this.observerArray[i] !== observer) && i <= arrayLength; i++)
        if(i == arrayLength) return -1;
        return i;
    },

    notify: function () {
    	var arrayLength = this.observerArray.length;
    	for (var i = 0; i < arrayLength; i++) {
    		this.observerArray[i].observe();
    	};
    },

});