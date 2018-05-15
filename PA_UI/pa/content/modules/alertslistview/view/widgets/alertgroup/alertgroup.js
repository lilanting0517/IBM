define([
    "dojo/parser",
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./template/template.html",
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-construct",
    "pa/widgets/marklayer/marklayer",
    "pa/bmodels/userModel",
    "dojo/mouse",
    "dojo/_base/window",
    "dojo/dom",
    "dojo/query",
    'pa/bmodels/systemModel',
    "dojo/dom-style"
], function(parser, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, domClass, domConstruct, marklayer, user, mouse, win, dom, query,system,domStyle) {

    return declare("PA_alertGroup", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString : template,
        constructor: function(_alert,alertListView){
            this.alert = _alert;
            this.alertListView = alertListView;
        },
        startup: function(){
            this._timeHander();
            this._contentHander();
            this._priorityHander();
            this._eventsMap();
        },
        
        _eventsMap: function(){
            
            var _super = this;
            
            on(this.alertGroupDel, 'click', function(evt){
                var alertId = _super.alert.id;
                var clearAllAlertsBtn = dojo.query('.pa_container_clear_all_alerts_btn');
                marklayer.show();
                user.deleteAlert(alertId).then(function(){
                    _super._deleteDateGroup();
                    _super._showNextGroupTime();
                    _super.destroy();
                    if(_super.parentModel.alertsList.length == 0){
	                    _super.parentModel._noAlert(Boolean(_super.parentModel.alertsCon.children.length));
	                    if(_super.parentModel.alertsCon.children.length ==0){
	                        _super.parentModel.scrollViewAlerts.containerNode.style.top = "0px";
	                        _super.parentModel.search_div.style.display ="none";
	                    }
                    }
                    var alertsList = _super.alertListView.alertListData.paresponse.notification;
                    alertsList.forEach(function(alert,i){
                        if(alert.id == alertId){
                        	alertsList.splice(i,1);
                        }
                    }); 
                    if(alertsList.length ==0){
                    	system.checkPopUp().then(function(result){
                    		if(result){
                    			_super.alertListView._noAlert(1);
                    			domStyle.set(_super.alertListView.paPopup,"border-bottom","1px solid #b3b3b3");
                    			clearAllAlertsBtn.addClass('hidden');
                    		}else{
                    			_super.alertListView._noAlert(alertsList.length);
                    			clearAllAlertsBtn.addClass('hidden');
                    		}
                    	});
                    	domClass.add(_super.alertListView.search_div, 'hidden');
                    	domClass.add(_super.alertListView.search_priority, 'hidden');
                    }
                    
                    _super.scrollViewAlerts._refresh();
                    marklayer.hide();
                });
            });
            
            on(this.alertGroupDel, mouse.enter, function(evt){
                var clientX = evt.clientX - 105;
                var clientY = evt.clientY;
                clientX += "px";
                clientY += "px";
                domConstruct.create("div", { innerHTML: "Delete this alert" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "92px", heith: "50px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));

            });
            
            on(this.alertGroupDel, mouse.leave, function(evt){
                var mc = dom.byId("module_content");
                mc.removeChild(mc.lastChild);
            });
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
        
        _timeHide: function(_thisTime){
            var pDom = this.domNode.previousSibling;
            var pTime;
            if(pDom && pDom.querySelector('.alertGroup_time')){
                pTime = pDom.querySelector('.alertGroup_time');
                if(pTime.innerHTML == _thisTime) return true;
            }
            return false;
        },
        
        _timeHander: function(){
            
            var con = this.alertGroupTime;
            var alert = this.alert;
            var occurenceTime = alert.occurenceTime;
            occurenceTime = new Date(Date.parse(occurenceTime.replace(/-/g, "/")+" +0000")).getTime();
            var goupTime = this.timeTransform(occurenceTime).replace(/-/g,"/");
            var hour = (new Date(goupTime)).getHours();
            
            if(hour > 12){
                var newHour = hour - 12 + ' pm';
            }else if(hour == 12){
                var newHour = '12 pm';
            }else{
                if(hour == 0){
                    var newHour = '12 am';
                }else{
                    var newHour =  hour + ' am';
                }
            }
            con.innerHTML = newHour;
//            if(this._timeHide(newHour)){
//                domClass.add(con, 'vhidden');
//            }
        },
        
        _priorityHander: function(){
            var con = this.alertGroupPriority;
            var alert = this.alert;
            var priority = alert.priority;
            if(priority != 'High'){
                con.style.display='none';
                
            }
        },
        
        _contentHander: function(){
            var alert = this.alert;
            var detailCon = this.alertGroupCon;
            var body = alert.body;
            detailCon.innerHTML = body;
        },
        
         timeTransform:function(e){
             
            var date = new Date(e);
            var year = date.getFullYear();
            var month = this.addZero(date.getMonth()+1);
            var day = this.addZero(date.getDate());
            var hour = this.addZero(date.getHours());
            var min = this.addZero(date.getMinutes());
            return year+'/'+month+'/'+day+" "+hour+":"+min;
        },
        
        addZero: function (e){
            if(e<10){
                e = "0"+ e;
            }
            return e;
        },
        
    });

});