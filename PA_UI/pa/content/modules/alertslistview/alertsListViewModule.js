define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/alertsListViewView",	
	"system/module/Module",	
	"dojo/dom-construct"	
], 	
	function(declare,info,alertsListViewView,Module,domConstruct){	
	
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
				this.moduleViewType = alertsListViewView;	
			},	
			activate: function(parameter) {	
				this.inherited(arguments);	
				var menu = dojo.query('.pa_container_title_btn');
                menu.removeClass('hidden');
                if(parameter.reload){
                	this.reload = !parameter.reload;
                }
				if(!this.reload){
					this.moduleView._initAlertsList();
					this.reload = true;
				}else{
					this.moduleView.setAlertList();
				}
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
