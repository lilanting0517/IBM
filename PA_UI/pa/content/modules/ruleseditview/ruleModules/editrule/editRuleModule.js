define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/editRuleView",	
	"system/module/Module",	
	"dojo/dom-construct"	
], 	
	function(declare,info,editRuleView,Module,domConstruct){	
	
		var Module = declare([Module], {	
			pfields : Module,	
			proxy : {	
				reader : {	
					isCache : true,	
					cachedData : info	
				}	
			},	
    		noCache:false,	
    		reload: true,
			preSettings : function() {	
				var me = this;	
				this.moduleViewType = editRuleView;	
			},	
			activate: function(parameter) {	
				this.inherited(arguments);	
				this.moduleView.ruleListModule = parameter.ruleListModule;
				this.moduleView.widgetsMap = parameter.info;
				this.moduleView.modelInstance = parameter.modelInstance;
				this.moduleView.initEditRule();
				this.moduleView.initGoBack();
			},	
			afterViewLoad : function() {	
				this.inherited(arguments);	
				var me = this;	
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
