define([    
    "dojo/parser",    
    "dojo/_base/declare",    
    "dojo/_base/lang",    
    "dojo/text!./template/template.html",    
    "dijit/layout/ContentPane",    
    "system/view/ModelView",    
    "system/data/Model",    
    "pa/bmodels/userModel",
    "pa/widgets/marklayer/marklayer",
    "pa/Services/RuleCheck",
    "dojo/on",
    "pa/widgets/gobackbutton/gobackbutton",
    "dojo/dom-class",
    "dijit/_WidgetsInTemplateMixin"    
    ],     
    function(parser,declare,lang,htmlTemp,ContentPane,ModelView,Model,user,marklayer,RuleCheck,on,gobackbutton,domClass,_WidgetsInTemplateMixin){    
        // start of declare function    
        var View = declare(    
            [ContentPane,ModelView,_WidgetsInTemplateMixin],    
            {    
                id : "module_copyRule",    
                loadModels:function(){    
                    this.addModel('copyrule',Model.getCachedModel('pa/content/modules/ruleseditview/ruleModules/copyRuleModule','module_copyRule'));    
                },    
                initView:function(){    
                    this.loadCachedTemplate(htmlTemp);    
                    this.addStyleSheet('copyrule','style');    
                },
                copyRuleName: function(num){
                	var me = this;
                	var newName = '';
                	var ruleNameCopy = '';
                	var rulesListModels = user.get('rulesList');
                    var ruleName = this.modelInstance.ruleName;
                    var flag = true;
                    
                    if(num == null ){
                    	ruleNameCopy = ruleName + ' (copy)';
                    	num = 1;
                    }else{
                    	num++
                    	ruleNameCopy = ruleName + ' (copy' + num + ')';
                    }
                    rulesListModels.getValueList().forEach(function(model){
                    	if(model.ruleName.indexOf(ruleNameCopy) != -1){
                    		newName = me.copyRuleName(num);
                    		flag = false;
                    	}
                    });
                    if(flag){
                    	if(num == 1){
                    		return ruleName + ' (copy)';
                    	}else{
                    		return ruleName + ' (copy' + num + ')';
                    	}
                    }else{
                    	return newName;
                    }
                    
                },
                initCopyRule:function(){
                    var me =this;
                    domClass.add(me.errorMessage, 'hidden');
                    this.ruleCopy = this.copyRuleContent(this.modelInstance);
                    var ruleNameCopy = this.copyRuleName();
                    me.modelInstance.set('ruleName', ruleNameCopy);
                    me.ruleName.innerHTML = this.modelInstance.get('ruleName');
                    me.modelInstance.set('ruleName', "");
                    var ruleType = this.modelInstance.get('template');
                    var widgetPath = this.widgetsMap[ruleType];
                    var coWidgetPath = this.widgetsMap["Common"];
                    me._loadRuleWidget(coWidgetPath, me.ruleNameCon, function(_typeWidget){
                        _typeWidget.modelInstance = me.modelInstance;
                    }, true);
                    me._loadRuleWidget(widgetPath, me.ruleTypeConFirst, function(_typeWidget){
                        _typeWidget.modelInstance = me.modelInstance;
                        _typeWidget.scrollViewRules = me.ruleListModule.scrollViewRules;
                    }, true);
                    me._loadRuleWidget(coWidgetPath, me.ruleTypeConSecond, function(_typeWidget){
                        _typeWidget.modelInstance = me.modelInstance;
                    }, true);
                    me.ruleListModule.scrollViewRules._refresh();
                    marklayer.hide();
                },
                initEventsMapping:function(){    
                    var me = this;
                    on(me.saveCopyRule, 'click', function(evt){
                        marklayer.show();
                        var checkResult = RuleCheck.call(me.modelInstance);
                        if(!checkResult){
                            domClass.remove(me.errorMessage, 'hidden');
                            marklayer.hide();
                        }else{
                            domClass.add(me.errorMessage, 'hidden');
                            if(me.modelInstance.ruleName == ""){
                                me.modelInstance.ruleName = me.ruleName.innerHTML;
                             }
                            me.modelInstance.id = "0";
                            me.modelInstance.save(user).then(function(data){
                                me.ruleListModule._loadModule('module_rulesList',{});
                                marklayer.hide();
                            });
                        }
                        me.ruleListModule.scrollViewRules._refresh();
                    });
                    on(me.resetCopyRule, 'click', function(evt){
                        me.ruleListModule._loadModule('module_rulesList',{});
                    });
                },    
                _loadRuleWidget: function(_ruleType, _con, _hander, _clear){                    
                    var _super = this;
                    if(_clear) this.emptyWidget(_con);
                    if(_ruleType){
                        require([_ruleType], function(customWidget){
                            var widget = new customWidget();
                            _hander && _hander(widget);
                            widget.startup();
                            if(_con.className == "rule_name_widgetContainer"){
                                _con.insertBefore(widget.domNode.querySelector(".oneblock"),_con.childNodes[0]);
                            }
                            if(_con.className == "rule_type_widgetContainer_first"){
                                _con.insertBefore(widget.domNode,_con.childNodes[0]);
                            }
                            if(_con.className == "rule_type_widgetContainer_second"){
                                _con.insertBefore(widget.domNode.querySelector(".channels_block"),_con.childNodes[0]);
                            }
                        });
                    }
                },
                emptyWidget: function(_con){
                  _con.children.length && _con.removeChild(_con.children[0]);
                },
                initGoBack:function(){    
                    var me = this;
                    gobackbutton.goBackButton = function(){
                        me.ruleListModule._loadModule('module_editRule',{modelInstance: me.ruleCopy});
                    }
                },
                copyRuleContent: function(rule){
                    var ruleCopy = user.createRule(rule.template);
                    var rule = ruleCopy.extend(ruleCopy, rule);
                    return rule;
                },
                modifyView:function(){    
                }    
            }    
        );    
        // end of declare function    
        return View;    
    }    
);    
