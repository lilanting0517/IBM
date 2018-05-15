define([    
    "dojo/parser",    
    "dojo/_base/declare",    
    "dojo/_base/lang",    
    "dojo/text!./template/template.html",    
    "dijit/layout/ContentPane",    
    "system/view/ModelView",    
    "system/data/Model",    
    "dijit/_WidgetsInTemplateMixin",
    "../widgets/gobackbutton/gobackbutton",
    "pa/widgets/popup/popup",
    "dojo/on",
    "pa/widgets/dialog/dialog",
    
    //Model
    "pa/bmodels/userModel",
    "pa/bmodels/systemModel",
    "pa/widgets/marklayer/marklayer",
    "app/widgets/tips/client",
    "dojo/dom-class",
    'app/widgets/ContentModuleExtend',
    'system/module/Module',
    'app/services/CookieService',
    "dojo/text!./config/popup.json",  //if VIEWAS is true, when you use Viewas function, you will get others yellow bubble at local, dev, uat environment
    "dojo/dom",
    "dojo/dom-construct",
    "comlib/fun/JSAddress",
    'app/services/ConsoleService'
],
    function(parser,declare,lang,htmlTemp,ContentPane,ModelView,Model,_WidgetsInTemplateMixin, goBackButton, Popup, on, Dialog, user, system, marklayer, Clent, domClass, ContentModuleExtend, MainModule, CookieService, Popupjson,dom, domConstruct, JSAddress,ConsoleService){    
        // start of declare function    
        var View = declare(    
            [ContentPane, ModelView, _WidgetsInTemplateMixin, ContentModuleExtend, MainModule],    
            {    
                id : "module_pa",
                Popupjson : JSON.parse(Popupjson),
                
                loadModels:function(){    
                    this.addModel('pa',Model.getCachedModel('pa/PAModule','module_pa'));    
                },    
                initView:function(){    
                    this.loadCachedTemplate(htmlTemp);
                    this.addStyleSheet('pa','style');
                },    
                initEventsMapping:function(){    
                    var me = this;
                    on(me.editRuleList, 'click', function(evt){
                       me.changeModule2RulesView();
                    });
                    on(me.clearAllAlerts, 'click', function(evt){
                       me.changeModule2ClearAlerts();
                      });
                    on(me.showPopUp, 'click', function(evt){
                        me.popup.show(me.popupCon);
                    });
                    on(me.editRuleList, "mouseover", function(evt){
                        var clientX = evt.clientX - 110;
                        var clientY = evt.clientY;
                        clientX += "px";
                        clientY += "px";
                        domConstruct.create("div", {id: "goToRuleListButton", innerHTML: "&nbsp;Edit my alert rules&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "107px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_pa"));
                    });
                    on(me.editRuleList, "mouseout", function(evt){
                        if(dom.byId("goToRuleListButton")){
                            var mc = dom.byId("module_pa");
                            mc.removeChild(dom.byId("goToRuleListButton"));
                        }
                    });
                    on(me.clearAllAlerts, "mouseover", function(evt){
                        var clientX = evt.clientX - 100;
                        var clientY = evt.clientY;
                        clientX += "px";
                        clientY += "px";
                        domConstruct.create("div", {id:"clearAllAlertsButton", innerHTML: "&nbsp;Clear all alerts&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "87px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_pa"));
                    });
                    on(me.clearAllAlerts, "mouseout", function(evt){
                        if(dom.byId("clearAllAlertsButton")){
                            var mc = dom.byId("module_pa");
                            mc.removeChild(dom.byId("clearAllAlertsButton"));
                        }
                        
                    });
                },    
                modifyView:function(){    
                },
                // three main functions in PA, alert list, rule list and clear all alerts
                changeModule2AlertsList: function(reload){
                    var frame = this.contentFrame;
                    var modelInstance = this.parentModel.modelInstance;
                    if(reload){
                    	modelInstance.reload = reload;
                    }else{
                    	modelInstance.reload = !!reload;
                    }
                    domClass.remove(this.editRuleList, 'hidden');
                    //domClass.add(this.gobackbutton.icon_return, 'hidden');
                    domClass.remove(this.changeModuleAlertsList, 'hidden');
                    domClass.add(this.changeModuleRulesList, 'hidden');
                    frame._loadModule('module_alertsListView', modelInstance);
                },
                
                changeModule2RulesView: function(){
                    if(dom.byId("goToRuleListButton")){
                        var mc = dom.byId("module_pa");
                        mc.removeChild(dom.byId("goToRuleListButton"));
                    }
                    var frame = this.contentFrame;
                    var modelInstance = this.parentModel.modelInstance;
                    domClass.remove(this.gobackbutton.icon_return, 'hidden');
                    frame._loadModule('module_ruleseditview', modelInstance);
                    domClass.add(this.editRuleList, 'hidden');
                    domClass.remove(this.changeModuleRulesList, 'hidden');
                    domClass.add(this.changeModuleAlertsList, 'hidden');
                    if(!domClass.contains(this.clearAllAlerts, 'hidden')){
                        domClass.add(this.clearAllAlerts, 'hidden');
                    }
                },
                
                changeModule2ClearAlerts: function(){
                    var me = this;
                    var consolePageContainer = dojo.query('.consolepage_container')[0];
                    this.dialog.show(this.popupCon, consolePageContainer, "Are you sure you want to clear all visible alerts?", 
                            function(){user.clearAllAlerts().then(function(){
                                me.changeModule2AlertsList(true);//send get-alers
                                domClass.add(me.clearAllAlerts, 'hidden');
                        });
                    });
                },
                
                isPopUpByViewAs: function(){    //the relationship between yellow bubble and viewas in CSA
                    if (window.location.host.indexOf("csa.dst.ibm.com") != -1 || window.location.host.indexOf("isa.dst.ibm.com") != -1){  //if prod environment, you can not see other people's yellow bubble
                        if(CookieService.isViewAs()){
                            return false;
                        }
                    }else {          //whether you can see his yellow bubble, it is depend on VIEWAS's value in Popupjson file on local, dev and uat environment
                        if(CookieService.isViewAs()){
                            return this.Popupjson.VIEWAS;
                        }
                    }
                    return true;
                },
                
                _initDialog: function(){
                    var me = this;
                    var dialogInstance = this.dialog = new Dialog();
                    dialogInstance.parentModel = me;
                },
                
                _initFramePopup: function(){         //yellow bubble
                    var me = this;
                    var newFeatureContent = '';
                    var newFeatureContent2 = '';
                    var newFeatureContent3 = '';
                    var newFeatureContent4 = '';
                    var newFeatureContent5 = '';
                    var newFeatureContent6 = '';
                    var newFeatureContent7 = '';
                    var currentUserInfo = me.parentModel.currentUser.getDmmsSellerInfo();
                    var isPopUpByViewAs = this.isPopUpByViewAs();
                    var isPopUp = false;
                    var isPopUp4 = false;
                    var isPopUp4WarmTransferNew = false;//89587
                    var pushBubble = [];
                    if(isPopUpByViewAs){
                    	//95052
                        if(currentUserInfo.ccRoleId != '000' //Non-Seller
                            &&  currentUserInfo.ccRoleId != '002' //Manager
                            /*&& currentUserInfo.ccTier != 'Lite'*/){
                            isPopUp = true;
                        }
                        
                        //89587
                        //95052
                        if(currentUserInfo.ccRoleId == '102' //LDR
                            || (currentUserInfo.ccRoleId == '002' //Manager
                            	&& currentUserInfo.ccMgrTypeId == '102')//LDR
                            	){
                        	isPopUp4WarmTransferNew = true;
                        }
                        
                        //95052
                        if (currentUserInfo.ccRoleId == '002' //Manager
                            && currentUserInfo.ccMgrTypeId != ""
                            && currentUserInfo.ccMgrTypeName != ""
                            && currentUserInfo.ccMgrTypeId !="000" //Non-Seller
                            && currentUserInfo.ccMgrTypeId !="002" //Manager
                            	){
                            isPopUp = true;
                        }
                        
                        if (isPopUp){
                            newFeatureContent = 'A preset SalesConnect rule has been added for you. It will notify you that an opportunity ';
                            newFeatureContent += 'has been \'won\' for more than 5 days, but no \'close out call\' (cloc) happened.';
                            newFeatureContent += '<br><br>To edit or disable this alert rule, from the My alerts menu at the upper right, click Edit my alert rules button.';
                            pushBubble.push({id:'pa-de629913a661', content:newFeatureContent, position:'bottom-left'});
                            //Clent.pushTips();
                            //system.checkNewFeature();
                        }
                       
                        //87255, 87253, 87254
                        //002: Manager
                        if (currentUserInfo.ccRoleId == '002'){
                        	if (currentUserInfo.ccMgrTypeId !="000" 
                                && currentUserInfo.ccMgrTypeId !="002"){
                        		isPopUp4 = true;
                        	}
                        }else {
                        	//000: Non-Seller
                        	if(currentUserInfo.ccRoleId != '000'){
                                isPopUp4 = true;
                            }
                        }
                        
                        //87255, 87253, 87254
                        if (isPopUp4){
                        	 
                            newFeatureContent4 = 'Three new alerts have been preset for you.  The alerts highlight SalesConnect situations requiring attention: ';
                        	newFeatureContent4 += '1) roadmap status update required, 2) missing line item steps to closure, and 3) open opportunity with a prior decision date.';
                            newFeatureContent4 += '<br><br>To edit or disable these alert rules, from the My alerts menu at the upper right, click Edit my alert rules button.';
                            pushBubble.push({id:'pa-409ced5459f7', content:newFeatureContent4, position:'bottom-left'});
                        }
                        
                        //95639
                        var isPopUp5 = false;
                        if(currentUserInfo.ccRoleId == '101'
                            ||  currentUserInfo.ccRoleId == '100' ){
                        	isPopUp5 = true;
                        }
                        if (isPopUp5){
                            newFeatureContent5 = 'A new alert is now available for SaaS Contract Extension Reps to remind you when you need to "touchpoint" with clients about their upcoming SaaS renewal.';
                            newFeatureContent5 += '<br><br>To edit or disable these alert rules, from the My alerts menu at the upper right, click Edit my alert rules button.';
                            pushBubble.push({id:'pa-432399d925ea', content:newFeatureContent5, position:'bottom-left'});
                        }
                        
                        //101491
                        var isPopUp6 = true;
                        if(currentUserInfo.ccRoleId == '000'
                        	|| currentUserInfo.ccMgrTypeId =="000"){
                        	isPopUp6 = false;
                        }
                        if (isPopUp6){
                            newFeatureContent6 = 'The \'Opportunity stage change\' alert is now enabled to notify you of sales stage changes (between SS 2-11).';
                            newFeatureContent6 +='<br><br>To edit or disable this alert rule, from the My alerts menu, click the Edit my alert rules icon';
                            newFeatureContent6 += '<span class="icon-edit-graphic" style="font-size: 28px; vertical-align: middle;"></span>';
                            pushBubble.push({id:'pa-61352eb4963e', content:newFeatureContent6, position:'bottom-left'});
                        }
                        
                        //102188
                        var isPopUp7 = true;
                        if(currentUserInfo.ccRoleId == '000'
                        	|| currentUserInfo.ccMgrTypeId =="000"){
                        	isPopUp7 = false;
                        }
                        if (isPopUp7){
                            newFeatureContent7 = 'The updated<span style="font-weight:bold;"> IBM opened opportunity </span>alert rule now notifies you of any new opportunity for a client in your territory, even if you are not on the opportunity team.';
                            newFeatureContent7 +='<br><br>To edit this alert rule, click the<span  style="font-weight:bold;"> bell </span>icon to open the<span  style="font-weight:bold;"> My alerts</span> menu. Click the<span  style="font-weight:bold;"> Edit my alert rules</span> button.';
                            newFeatureContent7 +='<br><br>Click the<span  style="font-weight:bold;"> pencil</span> icon located to the right of the <span  style="font-weight:bold;">IBM opened opportunity</span> rule.';
                            newFeatureContent7 +='<br><br>Next, select either or both check boxes for the <span  style="font-weight:bold;">where I am on the opportunity team option</span> and for<span  style="font-weight:bold;"> all clients in my territory </span>option.';
                            pushBubble.push({id:'pa-db8793aabed6', content:newFeatureContent7, position:'bottom-left'});
                        }
                        
                        //89587
                        if (isPopUp4WarmTransferNew){
                        	newFeatureContent3 = 'Two preset SalesConnect rules have been added for you. They will notify you that an opportunity ';
                        	newFeatureContent3 += 'has been tranferred to an OO for 5 or 14 days.';
                        	newFeatureContent3 += '<br><br>To disable this alert rule, from the My alerts menu at the upper right, click Edit my alert rules button.';
                        	pushBubble.push({id:'pa-de629913a661', content:newFeatureContent3, position:'bottom-left'});
                        	//Clent.pushTips([{id:'pa-de629913a661', content:newFeatureContent3, position:'bottom-left'}]);
                        }
                        
                        //101395 commented
                        /*if (isPopUp || isPopUp4WarmTransferNew){
                        	system.checkNewFeature();
                        }*/
                    }
                		newFeatureContent2 = '<span style="font-weight:bold; color:black">Easy access to your alerts.</span>&nbsp;';
                		newFeatureContent2 += 'A red dot next to the alerts bell icon indicates you have unread alerts.&nbsp;';
                    newFeatureContent2 += 'Tap/click icon to show alerts.&nbsp;Tap/click icon again to hide alerts.';
                    pushBubble.push({id:'pa-ecf7b7f8462c', content:newFeatureContent2, position:'bottom-left'});
                    if(pushBubble !=[]){
                    		Clent.pushTips(pushBubble);
                    }
                    me.parentModel.blockShowTip = false;    //let framework team know, it is time to show pa yellow bubble
                },
                _backButton: function(){         //init back button at right top corner of PA container
                    this.gobackbutton = goBackButton;
                    this.menu.appendChild(this.gobackbutton.domNode);
                },
                
                _initContentModuleFrame: function(){    //load contentModule file
                    var container = this.moduleFrameContainer;
                    var me = this;
                    return Model.load('pa/content/contentModule', 'module_content', {
                        parentView : container
                    }).then(function(contentFrame) {
                        me.contentFrame = contentFrame;
                        return contentFrame;
                    });
                },
                deleteDialog: function(deleteFunction){      //show delete the rule dialog
                    this.dialog.show(this.popupCon, this.domNode, "Delete this rule?", deleteFunction);
                }
            }    
        );    
        // end of declare function    
        return View;    
    }    
);    