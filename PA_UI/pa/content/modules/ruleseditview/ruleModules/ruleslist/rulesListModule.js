define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/rulesListView",	
	"system/module/Module",	
	"dojo/dom-construct"	
], 	
	function(declare,info,rulesListView,Module,domConstruct){	
	
		var Module = declare([Module], {	
			pfields : Module,	
			proxy : {	
				reader : {	
					isCache : true,	
					cachedData : info	
				}	
			},	
    		noCache:false,	
    		reload: false,
    		
			preSettings : function() {	
				var me = this;	
				this.moduleViewType = rulesListView;	
			},	
			activate: function(parameter) {	
				this.inherited(arguments);	
				this.moduleView.widgetsMap = parameter.info;
				this.moduleView.ruleListModule = parameter.ruleListModule;
				this.moduleView.initRuleList();
				this.moduleView.initGoBack();
			},	
			afterViewLoad : function() {	
				this.inherited(arguments);	
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
