define([
    'dojo/parser',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/text!./template/template.html',
    'dijit/layout/ContentPane',
    'system/view/ModelView',
    'system/data/Model',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/dom-class',
    './widgets/alertgroup/alertgroup',
    'pa/widgets/marklayer/marklayer',
    'pa/bmodels/userModel',
    'pa/bmodels/systemModel',
    'pa/content/contentModule',
    'comlib/ui/IScrollView',
    'dojo/on',
    'dojo/mouse',
    'dojo/dom',
    'dojo/query',
    'dijit/form/CheckBox',
    "pa/widgets/popup/popup",
    'app/services/CookieService',
    "dojo/text!./config/popup.json",
    "dojo/dom-style",
    'app/services/ConsoleService'
],
    function(parser, declare, lang, htmlTemp, ContentPane, ModelView,
        Model, _WidgetsInTemplateMixin, array, domConstruct, domClass,
        Alertgroup, marklayer, user, system, contentModule,
        IScrollView, on, mouse, dom, query, CheckBox,popup,CookieService,Popupjson,domStyle,ConsoleService) {
        var showtime = ( function() {
            var old = ( new Date()).getTime();
            return function(log){
                var now = ( new Date()).getTime();
                console.log(log, (now - old) / 1000);
                old = now;
            };
        })();
        var View = declare(
            [ContentPane,ModelView,_WidgetsInTemplateMixin],
            {
                id : 'module_alertsListView',
                widgetsList : [],
                match : [],
                searchedAlerts : [],
                searchedAlertsPosition : 0,
                Popupjson : JSON.parse(Popupjson),
                loadModels :function() {
                    this.addModel('alertslistview',Model.getCachedModel('pa/content/modules/alertsListViewModule','module_alertsListView'));
                },
                initView :function() {
                    this.loadCachedTemplate(htmlTemp);
                    this.addStyleSheet('alertslistview','style');
                },
                initEventsMapping:function() {
                    var me = this;
                    var PAModel = Model.getCachedModel('pa/PAModule','module_pa');
                    on(me.alertsLink, 'click', function() {
//                        user.set("currentModule", 'module_ruleseditview');
                        PAModel.moduleView.changeModule2RulesView();
                    });
//                    on(me.alertGroupDel, 'click', function(evt) {
//                        marklayer.show();
//                        system.saveNewFeature().then(function() {
//                            domClass.add(me.newFeature, 'hidden');
//                            marklayer.hide();
//                            me.scrollViewAlerts._refresh();
//                        });
//                        
//                    });
//                    
//                    on(this.alertGroupDel, mouse.enter, function(evt) {
//                        var clientX = evt.clientX - 60;
//                        var clientY = evt.clientY;
//                        clientX += "px";
//                        clientY += "px";
//                        domConstruct.create("div", { innerHTML: "Delete" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "39px", heith: "50px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
//
//                    });
//                    
//                    on(this.alertGroupDel, mouse.leave, function(evt) {
//                        var mc = dom.byId("module_content");
//                        mc.removeChild(mc.lastChild);
//                    });
                    
                    on(me.search_it,'keyup',function(evt) {
                        setTimeout(function(){
                            var inputValue = me.search_it.value.toUpperCase();
                            if(inputValue == null||inputValue.length ==0){
                                me.search_clear.style.visibility="hidden";
                            }else{
                                me.search_clear.style.visibility="visible";
                            }
                            me.searchedAlertsList();
                        }, 1000);
                    });
                    
                    on(this.search_clear,'click',function(evt) {
                        me.search_it.value = "";
                        //me.alertsCon.innerHTML = me.textHtml;
                        me.searchedAlertsList();
                        me.search_clear.style.visibility="hidden";
                        me.scrollViewAlerts._refresh();
                    });
                    on(this.choosePriority,'change',function(evt){
                        me.searchedAlertsList();
                    });
                    me.scrollViewAlerts.addEventListener('loadMore', function(){
                        alertsList = me.searchedAlerts;
                        var i = me.searchedAlertsPosition;
                        var len = alertsList.length;
                        if (i >= len){
                            return;
                        }
                        var size = 10;
                        var vDom = document.createDocumentFragment();
                        alertsList.slice(i, i + size).forEach(function(alert){
                            i++;
                            me._groupBuilder(alert, vDom);
                        });     
                        me.searchedAlertsPosition = i;
                        me.alertsCon.appendChild(vDom);
                        me.scrollViewAlerts._refresh();
                    });
                },
                searchedAlertsList:function(){
                    var me = this;
                    me.match =[];
                    me._emptyCon();
                    var searchedAlerts = [];
                    var inputValue = me.search_it.value.toUpperCase();
                    var priority = me.choosePriority.checked;
                    //var vDom = document.createDocumentFragment();
                    if(!inputValue ||inputValue ==''){
                        if(priority == true){
                            this.alertsList.forEach(function(alert){
                                if(alert.priority == "High"){
                                    searchedAlerts.push(alert);
                                    //me._groupBuilder(alert, vDom);
                                }
                            });
                        }else{
                            this.alertsList.forEach(function(alert){
                                //me._groupBuilder(alert, vDom);
                                searchedAlerts.push(alert);
                            });
                        }
                    }else{
                        this.alertsList.forEach(function(alert){
                            var content = alert.bodyWithoutTag.toUpperCase();
                            if(priority == true){
                                if(alert.priority == "High" && content.indexOf(inputValue) >=0){
                                    //me._groupBuilder(alert, vDom);
                                    searchedAlerts.push(alert);
                                }
                            }else{
                                if(content.indexOf(inputValue) >=0){
                                    //me._groupBuilder(alert, vDom);
                                    searchedAlerts.push(alert);
                                }
                            }
                        });
                    }
                    
                    var size = 100;
                    var i = 0;
                    //var len = searchedAlerts.length;
                    var vDom = document.createDocumentFragment();
                    searchedAlerts.slice(i, i + size).forEach(function(alert){
                        i++;
                        me._groupBuilder(alert, vDom);
                    }); 
                    this.searchedAlerts = searchedAlerts;
                    this.searchedAlertsPosition = i;
                    this.alertsCon.appendChild(vDom);
                    this.scrollViewAlerts._refresh();
                },
                _groupBuilder:function(alert, vdom) {
                    var flag = false;
                    var occurenceTime = alert.occurenceTime;
                    var newDate = this.formatDate(occurenceTime);
                    if(!this.match[newDate]){
                        vdom.appendChild(this._buildDateGroup(newDate));
                        this.match[newDate] = true;
                        flag = true;
                    }
                    vdom.appendChild(this._buildAlertGroup(alert));
                    if(flag){
                        vdom.childNodes[vdom.childNodes.length-1].setAttribute("class","alertGroup");
                    }
                },
                _deleteDateGroup: function(){
                    var target = this.domNode;
                    var previousSibling = target.previousSibling;
                    var nextSibling = target.nextSibling;
                    if(!previousSibling.id && nextSibling && !nextSibling.id){
                        domConstruct.destroy(previousSibling);
                    }
                    
                    if(!previousSibling.id && !nextSibling){
                        domConstruct.destroy(previousSibling);
                    }
                },
                
                _showNextGroupTime: function(){
                    var target = this.domNode;
                    var nextSibling = target.nextSibling;
                    if(nextSibling && nextSibling.id){
                        domClass.remove(nextSibling.querySelector('.alertGroup_time'), 'vhidden');
                    }
                },
                modifyView:function(){
                    return ;
                },
                _emptyCon: function(){
                    array.forEach(this.widgetsList, function(_child){
                        if(_child.domNode){
                            _child.destroy();
                        }else{
                            domConstruct.destroy(_child);
                        }
                    });
                },
                
                _buildAlertGroup: function(_alert){
                    var alertWidget = new Alertgroup(_alert,this);
                    this.alertWidget = alertWidget;
//                    this.alertsCon.appendChild(alertWidget.domNode);
                    alertWidget.parentModel = this;
                    alertWidget.scrollViewAlerts = this.scrollViewAlerts;
                    alertWidget.startup();
                    this.widgetsList.push(alertWidget);
                    var alertTitle= alertWidget.domNode.getElementsByTagName("strong")[0];
                    var alertGroupTime = alertWidget.domNode.querySelector('.alertGroup_time');
                    var isRead =alertWidget.isRead;
                    if(isRead){
                      domStyle.set(alertTitle,"font-weight","normal");
                      domStyle.set(alertTitle,"color","#404040");
                      domStyle.set(alertGroupTime,"color","#404040");}
                    return alertWidget.domNode;
//                    this.scrollViewAlerts._refresh();
                },
                
                _buildDateGroup: function(_str){
                    var domStr = '<div class="alertGroup pa_font_bolder groupDate">' + _str + "</div>";
                    var domNode = domConstruct.toDom(domStr);
//                    this.alertsCon.appendChild(domNode);
                    this.widgetsList.push(domNode);
                    return domNode;
                },
                
                _noAlert: function(_flag){
                    var func = _flag? 'add': 'remove';
                    domClass[func](this.noAlerts, 'hidden');
                },
                
                _pagenation: function(){
                    
                },
                formatDate : function(_dateStr) {
                    var goupMonth = _dateStr.replace(/-/g,"/");
                    var date = new Date(goupMonth);
                    var temp = date.toDateString().split(' ');
                    var month = '';
                    switch (temp[1]){
                        case 'Jan':
                            month = 'January';
                            break;
                        case 'Feb':
                            month = 'February';
                            break;
                        case 'Mar':
                            month = 'March';
                            break;
                        case 'Apr':
                            month = 'April';
                            break;
                        case 'May':
                            month = 'May';
                            break;
                        case 'Jun':
                            month = 'June';
                            break;
                        case 'Jul':
                            month = 'July';
                            break;
                        case 'Aug':
                            month = 'August';
                            break;
                        case 'Sep':
                            month = 'September';
                            break;
                        case 'Oct':
                            month = 'October';
                            break;
                        case 'Nov':
                            month = 'November';
                            break;
                        case 'Dec':
                            month = 'December';
                            break;
                        default:
                            break;
                    }
                    return month + ' ' + temp[2];
                },
                isPopUpByViewAs: function(){
                    if (window.location.host.indexOf("csa.dst.ibm.com") != -1 || window.location.host.indexOf("isa.dst.ibm.com") != -1){
                        if(CookieService.isViewAs()){
                            return false;
                        }
                    }else {
                        if(CookieService.isViewAs()){
                            return this.Popupjson.VIEWAS;
                        }
                    }
                    return true;
                },
                setAlertList:function(){
                	var _super = this;
                	var data = this.alertListData;
                	var match = {};
                	domClass.remove(_super.search_div, 'hidden');
                    domClass.add(_super.error_one, 'hidden');
                    var _groupBuilder = function (alert, vdom) {
                        var flag = false;
                        var occurenceTime = alert.occurenceTime;
                        var newDate = _super.formatDate(occurenceTime);
                        if(!match[newDate]){
                            vdom.appendChild(_super._buildDateGroup(newDate));
                            match[newDate] = true;
                            flag = true;
                        }
                        vdom.appendChild(_super._buildAlertGroup(alert));
                        if(flag){
                            vdom.childNodes[vdom.childNodes.length-1].setAttribute("class","alertGroup");
                        }
                    };
                    
                    var alertsList = data.paresponse.notification;
                    _super.alertsList = alertsList;
                    var newFeature = data.newFeatureResult;
                   
                    if(alertsList.length == 0){
                        user.set("noAlert", true);
                        domClass.add(_super.search_div, 'hidden');
                        //domClass['add'](_super.search_clear_right, 'search_cursor_default');
                    }else{
                        _super.search_it.disabled = false;
                        user.set("noAlert", false);
                           var clearAllAlertsBtn = dojo.query('.pa_container_clear_all_alerts_btn');
                           clearAllAlertsBtn.removeClass('hidden');
                        //domClass['remove'](_super.search_clear_right, 'search_cursor_default');
                    }
                    _super._emptyCon();
                    //popup
                    var isPopUpByViewAs = _super.isPopUpByViewAs();
                    if(isPopUpByViewAs){
                      system.checkPopUp().then(function(result){
   	                     if(result){
   	                        domClass.remove(_super.paPopup, 'hidden');
   	                        var popupInstance = new popup(result);
   	                        var templateString = popupInstance.templateString;
   	                        _super.paPopupContent.innerHTML = templateString;
   	                         popupInstance.eventsMapping(popupInstance);
   	                         _super.scrollViewAlerts._refresh();
   	                         _super._noAlert(1);
   	                         if(alertsList.length == 0){
   	                             domStyle.set(_super.paPopup,"border-bottom","1px solid #b3b3b3");
   	                         }
   	                      }else{
   	                         domClass.add(_super.paPopup, 'hidden');
   	                         _super._noAlert(alertsList.length);
   	                         
   	                     }
   	                   });
                    }else{
	                         domClass.add(_super.paPopup, 'hidden');
	                         _super._noAlert(alertsList.length);
	                         
	                     }
                    if(data.hasHighPriorityAlert == false){//do not have high alerts
                        domClass.add(_super.search_priority, 'hidden');
                    }else{
                        domClass.remove(_super.search_priority, 'hidden');
                    }
                    //end
                    
                    /*
                     * define size of alerts to show first 
                     */
                    
                    var size = 100;
                    var i = 0;
                    var len = alertsList.length;
                    
                    showtime('!!!_1:' + len);
                    _super.search_it.value = "";
                    _super.choosePriority.set("checked",false);
                    var vDom = document.createDocumentFragment();
                    alertsList.slice(i, i + size).forEach(function(alert){
                        i++;
                        _groupBuilder(alert, vDom);
                    });
                    _super.searchedAlerts = alertsList;
                    _super.searchedAlertsPosition = i;
                    _super.alertsCon.appendChild(vDom);
                    _super.scrollViewAlerts._refresh();
                    showtime('!!!_2');
                    setTimeout(function(){
                        array.forEach(alertsList, function(alert){
                            if(alert.eventId){
                                var eventId = alert.eventId.split(",");
                                for(var num = 0; num<eventId.length; num++) {
                                    if(document.getElementById(alert.id +'+'+ eventId[num])){
                                          var alertTitle =document.getElementById(alert.id +'+'+ "ALERT_NAME");
                                          var alertGroup = document.getElementById(alert.id);
                                          var alertGroupTime = alertGroup.querySelector('.alertGroup_time');
                                          var alertBody = document.getElementById(alert.id +'+'+ "ALERT_BODY");
                                          var alertGroupTime = alertGroup.querySelector('.alertGroup_time');
                                        on(document.getElementById(alert.id + '+' + eventId[num]),'click',function(){
                                            var opptyId = '';
                                            var eventIdCode = this.id.split('+')[1];
                                            var getClickHere = document.getElementById(alert.id + '+' + eventIdCode);
                                            if(eventIdCode != "1110"){
                                                if(this.innerHTML){
                                                	opptyId = this.innerHTML;
                                                	system.ccMetrics(eventIdCode, alert.id, opptyId);
                                                }
                                            }else{
                                            	system.ccMetrics(eventIdCode, alert.id, '');
                                            }
                                        });
                                        if(alertBody){
                                            var opptyIdTags = alertBody.getElementsByTagName("a");
                                            for(i=0; i < opptyIdTags.length; i++){
                                            	on(opptyIdTags[i],'click',function(){
                                            		try{
                                            			var lists = this.alertListData.paresponse.notification;
                                            			for(var i = 0; i < lists.length; i++){
                                            				var itemStatus = lists[i].body.indexOf(alertTitle.id);
                                                			if(itemStatus !== -1){
                                                				this.alertListData.paresponse.notification[i].body = this.alertListData.paresponse.notification[i].body.replace("color:black", "color: rgb(64, 64, 64); font-weight: normal");
                                                			}
                                            			}
                                            		}
                                            		catch(e){
                                            		}
	                                                domStyle.set(alertTitle,"font-weight","normal");
	                                                domStyle.set(alertTitle,"color","#404040");
	                                                domStyle.set(alertGroupTime,"color","#404040");
	                                                system.markToRead(alert.id);
                                                }.bind(_super));
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        var popUpCloseBtn = _super.paPopup.querySelector('.closeBtn');
                        if(popUpCloseBtn){
                            on(popUpCloseBtn, 'click', function(){
                               _super._noAlert(alertsList.length); 
                            });
                         }
                        var popUpHereBtn = _super.paPopup.querySelector('.clickHere');
                        if(popUpHereBtn){
                            on(popUpHereBtn, 'click', function(){
                               _super._noAlert(alertsList.length); 
                            });
                         }
                    }, 1000);
                    //end
                    var linkList = _super.alertsCon.querySelectorAll("#linktoreppage");
                    linkList.forEach(function(item, index){
                    	on(item, "click", function(e){
                    		ConsoleService.loadLeftModule("my_rep_page");
                        });
                    }); 
                },
                _initAlertsList: function(){
                    var _super = this;
                    marklayer.show();
                    
                    user.getAlertList().then(function(data) {
                    	_super.alertListData = data;
                        _super.setAlertList();
                        marklayer.hide();
                    }, function(error) {
                        //domClass.add(_super.newFeature, 'hidden');
                        domClass.add(_super.search_div, 'hidden');
                        domClass.add(_super.search_priority, 'hidden');
                        //domClass.add(_super.scrollViewAlerts, 'hidden');
                        domClass.remove(_super.error_one, 'hidden');
                        marklayer.hide();
                    });
                    window.openDigitalMasteryforPA = function(){
                    	ConsoleService.loadLeftModule("digital_mastery");
                    };
                }
            }    
        );    
        // end of declare function    
        return View;    
    }    
);    
