define([	
    "dojo/_base/declare",	
	"dojo/text!./config/info.json",	
	"./view/contentView",	
	"system/page/widget/FuncWidget",	
	"dojo/dom-construct",	
	"system/module/ModuleFrame"	
], 	
	function(declare,info,contentView,FuncWidget,domConstruct,ModuleFrame){	
	
		var ModuleFrame = declare([FuncWidget,ModuleFrame], {	
			pfields : FuncWidget,	
			proxy : {reader : {isCache : true,cachedData : info}},	
			appView : null,	
			loadType:"layer",	
			loadWord:"Loading Moulde",	
					
			preSettings : function() {	
				this.widgetViewType = contentView;	
			},	
		
			afterViewLoad : function() {	
				this.inherited(arguments);	
				this.appView = this.widgetView;	
				this.appView.conNode = this.widgetView.frameNode;
				
				//默认加载
				this._initMap();
				this._loadModule(this.moduleInfo.defaultModule);
			},
			
			_initMap: function(){
				this.moduleInfo = JSON.parse(info);
			},
			
			_loadModule: function(_id, _params){ //load module: rule list and alert list
				var targetModulePath = this.moduleInfo.modulePathMap[_id];
				if(targetModulePath){
					this.loadModule(targetModulePath, _id, _params || {});
				}
			}
		});	
    	return ModuleFrame;	
	}	
);	
