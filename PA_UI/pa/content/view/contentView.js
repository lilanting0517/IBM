define([	
    "dojo/parser",	
    "dojo/_base/declare",	
    "dojo/text!./template/template.html",	
    "dijit/layout/ContentPane",	
    "dojo/dom-style",	
    "system/view/ModelView",	
    "system/data/Model",	
    "dijit/_WidgetsInTemplateMixin"	
    ], 	
	function(parser,declare,htmlTemp,ContentPane,domStyle,ModelView,Model,_WidgetsInTemplateMixin){	
		// start of declare function	
		var ModuleFrameView = declare(	
			[ContentPane,ModelView,_WidgetsInTemplateMixin],	
			{	
				id : "module_content",	
				loadModels:function(){	
					this.addModel('content',Model.getCachedModel('pa/main/contentModule','module_content'));	
				},	
				initView:function(){	
					this.loadCachedTemplate(htmlTemp);	
					this.addStyleSheet('content','style');	
				},	
				modifyView:function(){	
						
				}	
	
			}	
		);	
		// end of declare function	
		return ModuleFrameView;	
	}	
);	
