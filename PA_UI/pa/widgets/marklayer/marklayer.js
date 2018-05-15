/*
 * this is mark layer. after sending url to back-end, this mark layer will be show until response data is back
 */
define([
  "dojo/_base/declare",
  "system/util/MarkLayer"
], function(declare, MarkLayer){
	var _class = declare('PA_MarkLayer', [], {
		setCon: function(targetPos){
 			this.markLayer = new MarkLayer({
 				pos : targetPos
 			});
		},
		show: function(){
			if(!this.markLayer) return;
			
			this.markLayer.show();
		},
		hide: function(){
			if(!this.markLayer) return;
			
			this.markLayer.hide();
		}
	});
	
	var markInstance = new _class;
	return markInstance;
});