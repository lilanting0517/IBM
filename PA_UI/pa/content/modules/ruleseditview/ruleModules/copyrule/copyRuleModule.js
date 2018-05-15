define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/copyRuleView",	
	"system/module/Module",	
	"dojo/dom-construct"	
], 	
	function(declare,info,copyRuleView,Module,domConstruct){	
	
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
				this.moduleViewType = copyRuleView;	
			},	
			activate: function(parameter) {	
				this.inherited(arguments);	
				this.moduleView.ruleListModule = parameter.ruleListModule;
				this.moduleView.widgetsMap = parameter.info;
				this.moduleView.modelInstance = parameter.modelInstance;
				this.moduleView.initCopyRule();
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
