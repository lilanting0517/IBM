define([    
    "dojo/parser",    
    "dojo/_base/declare",    
    "dojo/_base/lang",    
    "dojo/text!./template/template.html",    
    "dijit/layout/ContentPane",    
    "system/view/ModelView",    
    "system/data/Model",    
    "dijit/_WidgetsInTemplateMixin",
    "pa/widgets/marklayer/marklayer",
    "pa/bmodels/userModel",
    "dojo/on",
    './widgets/RuleListWidget/RuleListWidget',
    "pa/widgets/gobackbutton/gobackbutton",
    "dojo/dom-class"
    ],     
    function(parser,declare,lang,htmlTemp,ContentPane,ModelView,Model,_WidgetsInTemplateMixin,marklayer,user,on,RuleListWidget,gobackbutton,domClass,IScrollView){    
        // start of declare function    
        var View = declare(    
            [ContentPane,ModelView,_WidgetsInTemplateMixin],    
            {    
                id : "module_rulesList",
                loadModels:function(){    
                    this.addModel('ruleslist',Model.getCachedModel('pa/content/modules/ruleseditview/ruleModules/rulesListModule','module_rulesList'));    
                },    
                initView:function(){    
                    this.loadCachedTemplate(htmlTemp);    
                    this.addStyleSheet('ruleslist','style');    
                },    
                initEventsMapping:function(){    
                    var me = this;    
                    on(me.newRuleTitle, 'click', function(evt){
                        var contentModel = Model.getCachedModel('pa/content/modules/ruleseditview/ruleseditviewModule','module_ruleseditview');
                        contentModel.moduleView._loadModule('module_creatRule',{});
                   });
                },
                initRuleList: function(){
                    var _super = this;
                    marklayer.show();
                    user.getRuleList().then(function(rulesList){
                        _super.deleteAllNodes(_super.listCon);
                        var rulesListModels = user.get('rulesList');
                        rulesListModels.getValueList().forEach(function(model){
                            _super.buildGroup(model);
                        });
                        _super.ruleListModule.scrollViewRules._refresh();
                        marklayer.hide();
                    });
                },
                deleteAllNodes: function(nodes){
                    var childs=nodes.childNodes;    
                    for(var i=childs.length-1;i>=0;i--){    
                        nodes.removeChild(childs.item(i));    
                    }
                },
                buildGroup: function(_model){
                    var con = this.listCon;
                    var ruleWidget = new RuleListWidget();
                    ruleWidget.modelInstance = _model;
                    ruleWidget.widgetsMap = this.widgetsMap;
                    ruleWidget.ruleListModule = this.ruleListModule;
                    ruleWidget.startup();
                    con.insertBefore(ruleWidget.domNode,con.childNodes[0]);
                },
                initGoBack:function(){    
                    gobackbutton.goBackButton = function(){
                        domClass.add(this.icon_return, 'hidden');
                        var PAModule = Model.getCachedModel('pa/PAModule','module_pa');
                        PAModule.moduleView.changeModule2AlertsList(true);
                        
                    }
                }    
            }    
        );    
        // end of declare function    
        return View;    
    }    
);
