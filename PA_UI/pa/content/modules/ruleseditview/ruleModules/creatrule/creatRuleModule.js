define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/creatRuleView",	
	"system/module/Module",	
	"dojo/dom-construct"	
], 	
	function(declare,info,creatRuleView,Module,domConstruct){	
	
		var Module = declare([Module], {	
			pfields : Module,	
			proxy : {	
				reader : {	
					isCache : true,	
					cachedData : info	
				}	
			},	
    		noCache:false,	
		
			preSettings : function() {	
				var me = this;	
				this.moduleViewType = creatRuleView;	
			},	
			activate: function(parameter) {	
				this.inherited(arguments);	
				this.moduleView.widgetsMap = parameter.info;
				this.moduleView.ruleListModule = parameter.ruleListModule;
				this.moduleView.buildSelect();
				this.moduleView.initGoBack();
			},	
			afterViewLoad : function() {	
				this.inherited(arguments);	
//				var me = this;	
//				me.showDlg("Loading Module", false).then(function() {	
//					me.hideDlg();	
//				});	
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
