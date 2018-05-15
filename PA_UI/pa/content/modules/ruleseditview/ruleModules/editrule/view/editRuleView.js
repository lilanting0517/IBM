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
    "dojo/dom-class",
    "pa/widgets/gobackbutton/gobackbutton",
    "dojo/dom-construct",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/dom"
    ],     
    function(parser,declare,lang,htmlTemp,ContentPane,ModelView,Model,user,marklayer,RuleCheck,on,domClass,gobackbutton,domConstruct,_WidgetsInTemplateMixin,dom){    
        // start of declare function    
        var View = declare(    
            [ContentPane,ModelView,_WidgetsInTemplateMixin],    
            {    
                id : "module_editRule",    
                loadModels:function(){    
                    this.addModel('editrule',Model.getCachedModel('pa/content/modules/ruleseditview/ruleModules/editRuleModule','module_editRule'));    
                },    
                initView:function(){    
                    this.loadCachedTemplate(htmlTemp);    
                    this.addStyleSheet('editrule','style');    
                },
                initEditRule: function(){
                    var me = this;
                    domClass.add(me.errorMessage, 'hidden');
                    var stateful = this.modelInstance;
                    this.ruleCopy = this.copyRuleContent(this.modelInstance);
                    me.showActive(stateful.get('isActive'));
                    stateful.watch("isActive", function(){
                        me.showActive(stateful.get('isActive'));
                    });
                    me.ruleName.innerHTML = stateful.get('ruleName');
                    var ruleName = stateful.get('ruleName');
                    stateful.watch("ruleName", function(){
                        me.ruleName.innerHTML = ruleName
                    });// watch ruleName,if ruleName changed, reset ruleName.innerHTML
                    stateful.set('ruleName', "");
                    var ruleType = this.modelInstance.get('template');
                    var widgetPath = this.widgetsMap[ruleType];
                    var coWidgetPath = this.widgetsMap["Common"];
                    if(ruleType == "NEW_OPPTY_LESS_THAN_500K" || ruleType == "OPEN_OPPTY_REVENUE_IN_PRIOR_MONTH" 
                    	|| ruleType == "WON_OPPTY_REVENUE_IN_PRIOR_MONTH"|| ruleType == "NEW_OPPTY_NOT_LIO_OR_OO" || ruleType == "WON_OPPTY_FUTURE_DECISION_DATE"
                    	|| ruleType == "OPEN_OPPTY_WITH_PRIOR_DECISION_DATE" ||  ruleType == "MISSING_LINE_ITEM_STEPS_TO_CLOSURE" 
                    		|| ruleType == "ROADMAP_STATUS_UPDATE_REQUIRED" || ruleType == "MISSING_INVALID_EMAIL_ADDRESS" || ruleType == "POTE_DUPL_OF_LOST_OPPTY" || ruleType == "REMOVED_FROM_SALES_TEAM"){
                    	//this rule just has common part
                    	domClass.add(me.icon_editdelete, 'hidden');
                    	domClass.add(me.icon_copy, 'hidden');
                    	domClass.add(me.ruleNameCon, 'hidden');
                    	domClass.add(me.ruleTypeConFirst, 'hidden');
                    	me._loadRuleWidget(coWidgetPath, me.ruleTypeConSecond, function(_typeWidget){
	                        _typeWidget.modelInstance = me.modelInstance;
	                    }, true);
                    }else if(stateful.template == "WARM_TRANSFER_5_DAYS"|| stateful.template == "WARM_TRANSFER_14_DAYS"){
                    	//this rule just has itself part
                    	domClass.add(me.icon_editdelete, 'hidden');
                    	domClass.add(me.icon_copy, 'hidden');
                    	domClass.add(me.ruleNameCon, 'hidden');
                    	domClass.add(me.ruleTypeConFirst, 'hidden');
                    	me._loadRuleWidget(coWidgetPath, me.ruleTypeConSecond, function(_typeWidget){
	                        _typeWidget.modelInstance = me.modelInstance;
	                    }, true);
                    }else if(stateful.template == "TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL"){
                    	//this rule has name part, common part and itself part, and this rule can not copy and delete
                    	domClass.add(me.icon_editdelete, 'hidden');
                    	domClass.add(me.icon_copy, 'hidden');
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
                    }else{
                    	//this rule has name part, common part and itself part, and this rule copy and delete
                    	domClass.remove(me.icon_editdelete, 'hidden')
                    	domClass.remove(me.icon_copy, 'hidden');
                    	domClass.remove(me.ruleNameCon, 'hidden');
                    	domClass.remove(me.ruleTypeConFirst, 'hidden');
                    	domClass.remove(me.ruleTypeConSecond, 'hidden');
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
	                    
                    }
                
                    if(stateful.createdMode == 'PRESET'){
                    	domClass.add(me.icon_editdelete, 'hidden');
                    	domClass.add(me.icon_copy, 'hidden');
                    	}
                    this.ruleListModule.scrollViewRules._refresh();
                    marklayer.hide();
                    
                },
                
                initEventsMapping:function(){
                    var me = this; 

                    on(this.icon_editdelete, "mouseover", function(evt){
                        var clientX = evt.clientX - 100;
                        var clientY = evt.clientY;
                        clientX += "px";
                        clientY += "px";
                        domConstruct.create("div", { innerHTML: "&nbsp;Delete this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "89px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                        
                    });
                    on(this.icon_editdelete, "mouseout", function(evt){
                        var mc = dom.byId("module_content");
                        mc.removeChild(mc.lastChild);
                    });
                    on(this.icon_editdelete, 'click', function(evt){
//                    	if(me.modelInstance.createdMode == 'PRESET'){}else{
                        var PAModule = Model.getCachedModel('pa/PAModule','module_pa');
                        var mc = dom.byId("module_content");
                        if(mc.innerHTML == "Delete this rule"){
                            mc.removeChild(mc.lastChild);
                        }
                        PAModule.deleteDialog(function(){
                            marklayer.show();
                            var ruleId = me.modelInstance.id;
                            user.deleteRule(ruleId).then(function() {
                                me.ruleListModule._loadModule('module_rulesList',{});
                                marklayer.hide();
                            });
                        });
//                    	}
                    });

                    on(this.icon_copy, 'click', function(evt){
                    	marklayer.show();
                    	if(dom.byId("copyRuleButtonTip")){
	                        var mc = dom.byId("module_content");
	                        mc.removeChild(mc.lastChild);
                    	}
                        me.ruleListModule._loadModule('module_copyRule',{modelInstance: me.ruleCopy});
                    });
                    on(me.saveEditRule, 'click', function(evt){
                        marklayer.show();
                        var checkResult = RuleCheck.call(me.modelInstance);
                        if(!checkResult){
                            domClass.remove(me.errorMessage, 'hidden');
                            marklayer.hide();
                        }else{
                            domClass.add(me.errorMessage, 'hidden');
                            if(me.modelInstance.ruleName == ""){
                                 me.modelInstance.ruleName = me.ruleName.innerHTML
                              }
                            me.modelInstance.save(user).then(function(data){
                                me.ruleListModule._loadModule('module_rulesList',{});
                                marklayer.hide();
                            });
                        }
                        me.ruleListModule.scrollViewRules._refresh();
                    });
                    on(me.resetEditRule, 'click', function(evt){
                        me.ruleListModule._loadModule('module_rulesList',{});
                    });
                    on(this.icon_resume, 'click', function(evt){
                        me.modelInstance.set('isActive', 'true');
                        marklayer.show();
                        var ruleId = me.modelInstance.id;
                        user.markToActive(ruleId).then(function() {
                            marklayer.hide();
                        });
                    });
                        on(this.icon_pause, 'click', function(evt){
                            me.modelInstance.set('isActive', 'false');
                            marklayer.show();
                            var ruleId = me.modelInstance.id;
                            user.markToActive(ruleId).then(function() {
                                marklayer.hide();
                            });
                        });
                        
                        on(this.icon_pause, "mouseover", function(evt){
                            var clientX = evt.clientX + 10;
                            var clientY = evt.clientY;
                            clientX += "px";
                            clientY += "px";
                            domConstruct.create("div", { innerHTML: "&nbsp;Pause this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "88px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                            
                        });
                        on(this.icon_pause, "mouseout", function(evt){
                            var mc = dom.byId("module_content");
                            mc.removeChild(mc.lastChild);
                        });
                        on(this.icon_resume, "mouseover", function(evt){
                            var clientX = evt.clientX + 10;
                            var clientY = evt.clientY;
                            clientX += "px";
                            clientY += "px";
                            domConstruct.create("div", { innerHTML: "&nbsp;Resume this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "100px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                            
                        });
                        on(this.icon_resume, "mouseout", function(evt){
                            var mc = dom.byId("module_content");
                            mc.removeChild(mc.lastChild);
                        });
                        
                        on(this.icon_copy, "mouseover", function(evt){
                            var clientX = evt.clientX - 98;
                            var clientY = evt.clientY;
                            clientX += "px";
                            clientY += "px";
                            domConstruct.create("div", {id:"copyRuleButtonTip", innerHTML: "&nbsp;Copy this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "84px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                            
                        });
                        on(this.icon_copy, "mouseout", function(evt){
                        	if(dom.byId("copyRuleButtonTip")){
	                            var mc = dom.byId("module_content");
	                            mc.removeChild(mc.lastChild);
                        	}
                        });
                },
                showActive: function(isActive){
                    if(isActive == "true"){
                        domClass.remove(this.icon_pause, 'hidden');
                        domClass.add(this.icon_resume, 'hidden');
                    }else{
                        domClass.add(this.icon_pause, 'hidden');
                        domClass.remove(this.icon_resume, 'hidden')
                    }
                },
                copyRuleContent: function(rule){    //deep copy rule data
                    var ruleCopy = user.createRule(rule.template);
                    var ruleCopy = ruleCopy.extend(ruleCopy, rule);
                    return ruleCopy;
                },
                _loadRuleWidget: function(_ruleType, _con, _hander, _clear){                    
                    if(_clear) this.emptyWidget(_con);
                    if(_ruleType){
                        require([_ruleType], function(customWidget){
                            var widget = new customWidget();
                            _hander && _hander(widget);
                            widget.status = 'edit';
                            widget.startup();

//                            _con.appendChild(widget.domNode);
                           if(_con.className == "rule_name_widgetContainer"){
                              _con.insertBefore(widget.domNode.querySelector(".oneblock"),_con.childNodes[0]);
                           }
                           if(_con.className == "rule_type_widgetContainer_first"){
                               _con.insertBefore(widget.domNode,_con.childNodes[0]);
                           }
                           if(_con.className == "rule_type_widgetContainer_second"){
                               _con.insertBefore(widget.domNode.querySelector(".channels_block"),_con.childNodes[0]);
                           }
                           systemApp.appView.resize();
                        });
                    }
                },
                emptyWidget: function(_con){
                  _con.children.length && _con.removeChild(_con.children[0]);
              },
              initGoBack:function(){    
                  var me = this;
                    gobackbutton.goBackButton = function(){
                        me.ruleListModule._loadModule('module_rulesList',{});
                    }
                }    
            }    
        );    
        // end of declare function    
        return View;    
    }    
);
