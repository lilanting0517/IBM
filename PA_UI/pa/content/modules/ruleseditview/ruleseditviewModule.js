define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/ruleseditviewView",	
	"system/module/Module",	
	"pa/widgets/marklayer/marklayer",
	"dojo/dom-construct"	
], 	
	function(declare,info,ruleseditviewView,Module,marklayer,domConstruct){	
	
		var Module = declare([Module], {	
			pfields : Module,	
			proxy : {	
				reader : {	
					isCache : true,	
					cachedData : info	
				}	
			},	
    		noCache:false,	
    		
    		//reloadFlag: false,
		
			preSettings : function() {	
				var me = this;	
				this.moduleViewType = ruleseditviewView;	
			},	
			activate: function(parameter) {
				marklayer.show();
				this.inherited(arguments);
				this._initMap();
				this.moduleView._loadModule(this.moduleInfo.defaultModule,{});
			},	
			afterViewLoad : function() {	
				this.inherited(arguments);	
			},	
			_initMap: function(){
				this.moduleInfo = JSON.parse(info);
			},
			buildGroup: function(rule){
				this.moduleView.buildGroup(rule);
			},
			onReloadModule : function() {
			},	
			onUnloadModule : function() {
			},	
			onDestroy:function(){	
						
			}	
		}); 	
	
    	return Module;	
	}	
);	
