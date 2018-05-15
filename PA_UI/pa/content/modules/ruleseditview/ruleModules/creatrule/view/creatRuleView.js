define([    
    "dojo/parser",    
    "dojo/_base/declare",    
    "dojo/_base/lang",    
    "dojo/text!./template/template.html",    
    "dijit/layout/ContentPane",    
    "system/view/ModelView",    
    "system/data/Model",    
    "pa/bmodels/systemModel",
    "pa/bmodels/userModel",
    "pa/widgets/marklayer/marklayer",
    "pa/widgets/CustomSelector/CustomSelector",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/query",
    "pa/widgets/gobackbutton/gobackbutton",
    "pa/Services/RuleCheck",
    "dojo/on",
    "dijit/_WidgetsInTemplateMixin"    
    ],     
    function(parser,declare,lang,htmlTemp,ContentPane,ModelView,Model,system,user,marklayer,CustomSelector,array,domClass,query,gobackbutton,RuleCheck,on,_WidgetsInTemplateMixin){    
        // start of declare function    
        var View = declare(    
            [ContentPane,ModelView,_WidgetsInTemplateMixin],    
            {    
                id : "module_creatRule",    
                loadModels:function(){    
                    this.addModel('creatrule',Model.getCachedModel('pa/content/modules/ruleseditview/ruleModules/creatRuleModule','module_creatRule'));    
                },    
                initView:function(){    
                    this.loadCachedTemplate(htmlTemp);    
                    this.addStyleSheet('creatrule','style');    
                },    
                initEventsMapping:function(){    
                    var me = this;
                    var ruleTypeSelect = me.ruleTypeSelect;
                    ruleTypeSelect.addListener("CHANGE", lang.hitch(me,function(evt){
                        domClass.add(me.errorMessage, 'hidden');
//                        if(me.ruleTypeSelect.getValue() == "select"){
//                            me.closeSelect();
//                            me.hiddenButton();
//                        }else{
                        	//create a rule that has three parts: name part, itself part, common part
                            var ruleType = me.ruleTypeSelect.getValue();
                            var newRule = me.newRule = user.createRule(ruleType);
                            function setModel(_widget){
                                _widget.modelInstance = newRule;   //rule data
                                _widget.scrollViewRules = me.ruleListModule.scrollViewRules;
                            }
                        
                            var widgetPath = me.widgetsMap[ruleType];
                            var commonPath = me.widgetsMap["Common"];
                            me._loadRuleWidget(commonPath, me.ruleNameCon, setModel, true);
                            me._loadRuleWidget(widgetPath, me.ruleTypeConFirst, setModel, true);
                            me._loadRuleWidget(commonPath, me.ruleTypeConSecond, setModel, true);
                            me.showButton();
                            me.ruleListModule.scrollViewRules._refresh();
//                        }
                        
//                        if(me.ruleTypeSelect.getValue() == "select" || me.ruleTypeSelect.getValue() == "COMPLEX"){
//                            array.forEach(query('.ruleseditview_container .dijitContentPane'),function(item,id){
//                                domStyle.set(item,"overflow","visible");
//                            });
//                        } else {
//                            array.forEach(query('.ruleseditview_container .dijitContentPane'),function(item,id){
//                                domStyle.set(item,"overflow","auto");
//                            });
//                        }
                    }));
                    var saveNewRule = me.saveNewRule;
                    on(saveNewRule, "click", function(evt){
                        marklayer.show();
                        var checkResult = RuleCheck.call(me.newRule);
                        if(!checkResult){//if checkResult is false, show error message
                            domClass.remove(me.errorMessage, 'hidden');
                            marklayer.hide();
                        }else{//if checkResult is true, hide error message, and then save rule
                            domClass.add(me.errorMessage, 'hidden');
                            if(me.newRule.ruleName == ""){
                                me.newRule.ruleName = me.newRule.templateName;
                            }
                            me.newRule.save(user).then(function(data){
                                me.ruleListModule._loadModule('module_rulesList',{});
                            });
                        }
                        me.ruleListModule.scrollViewRules._refresh();
                    });

                    var resetNewRule = me.resetNewRule;
                    on(resetNewRule, "click", function(evt){
                        me.ruleListModule._loadModule('module_rulesList',{});
                    });
                },    
                buildSelect: function(){
                    var con = this.ruleTypeSelect;
                    var me = this;
                    domClass.add(me.errorMessage,"hidden");
                    me.closeSelect();
                    me.hiddenButton();
                    marklayer.show();
                    system.getRulesType(true)
                    .then(function(data){
                        var _arr = data.paresponse.templates;
                        me.personalInfo = data.personalInfo;
                        me._arr_temp = [];
                        //me._arr_temp.push({'label':"Select an alert rule type",'value': 'select'});
                        array.forEach(_arr, function(data, index){
                            me._arr_temp.push({'label':data.value,'value': data.key});
                        });
                        var arr_content = me.setSelectValue(me._arr_temp,'');
                        con.selectLabel ="Select an alert rule type";
                        con.setData(arr_content);
                        marklayer.hide();
                    });
                },
                emptyWidget: function(_con){
                    _con.children.length && _con.removeChild(_con.children[0]);
                },
                closeSelect: function(){
                    this.emptyWidget(this.ruleNameCon);
                    this.emptyWidget(this.ruleTypeConFirst);
                    this.emptyWidget(this.ruleTypeConSecond);
                },
                _loadRuleWidget: function(_ruleType, _con, _hander, _clear){                    
                    var _super = this;
                    if(_clear) this.emptyWidget(_con);
                    if(_ruleType){
                        require([_ruleType], function(customWidget){
                            var widget = new customWidget();
                            _hander && _hander(widget);
                            widget.status = 'create';
                            widget.startup();
////                            _con.appendChild(widget.domNode);
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
                showButton: function(){
                    this.saveNewRule.style.display = 'inline';
                    this.resetNewRule.style.display = 'inline';
                },
                hiddenButton: function(){
                    this.saveNewRule.style.display = 'none';
                    this.resetNewRule.style.display = 'none';
                },
                setSelectValue:function (listItems, key) {
                	var selectedItem = [];
                    if(key == ''){
                    	selectedItem.label = "Select an alert rule type";
                    	selectedItem.value = 'select';
                    }else{
	                    for(var i = 0; i < listItems.length; i++){
	                        if(listItems[i].value == key){
	                            selectedItem = listItems[i];
	                        }
	                    }
                    }
                    if(selectedItem == []){
                        selectedItem = listItems[0];
                    }    
                    var arr_content = {
                        defaultItem : selectedItem,
                        listItems: listItems
                    }; 
                    return arr_content;
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
