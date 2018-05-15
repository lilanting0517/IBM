define([    
    "dojo/parser",    
    "dojo/_base/declare",    
    "dojo/_base/lang",    
    "dojo/text!./template/template.html",    
    "dijit/layout/ContentPane",    
    "system/view/ModelView",    
    "system/data/Model",    
    "dijit/_WidgetsInTemplateMixin",
    "dojo/on",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojo/dom-class",
    "pa/widgets/marklayer/marklayer",


    //Model
    "pa/bmodels/userModel",
    "pa/bmodels/systemModel",

    "pa/widgets/CustomSelector/CustomSelector",
    "dojo/dom-style",
    "dojo/query",
    "pa/widgets/helpTip",
    "comlib/ui/IScrollView",
    "system/module/ModuleFrame",
    "dojo/text!../config/info.json"
    ],     
    function(parser,declare,lang,htmlTemp,ContentPane,ModelView,Model,_WidgetsInTemplateMixin, on, array, domConstruct, domClass, marklayer, user, system,CustomSelector,domStyle,query,helpTip, IScrollView, ModuleFrame,info){    
        // start of declare function    
        var View = declare(    
            [ContentPane,ModelView,_WidgetsInTemplateMixin,ModuleFrame],    
            {    
                id : "module_ruleseditview", 
                loadType: 'mask',
                postCreate: function(){
        			this.inherited(arguments);
        			this.widgetView = this.appView;
        			this.appView.conNode = this.conNode;
        		},
                loadModels:function(){    
                    this.addModel('ruleseditview',Model.getCachedModel('pa/content/modules/ruleseditviewModule','module_ruleseditview'));    
                },    
                initView:function(){    
                    this.loadCachedTemplate(htmlTemp);    
                    this.addStyleSheet('ruleseditview','style');
                },    
                initEventsMapping:function(){
                },    
                modifyView:function(){    
                },
                _loadModule: function(_id, _params){  //load module:create, edit, copy and rule list
                	var moduleInfo = JSON.parse(info);
    				var targetModulePath = moduleInfo.ruleModulePathMap[_id];
    				_params.ruleListModule = this;
    				_params.info = this.parentModel.moduleInfo.widgetsMap;
    				if(targetModulePath){
    					this.loadModule(targetModulePath, _id, _params || {});
    				}
    			}
            }    
        );    
        // end of declare function    
        return View;    
    }    
);
