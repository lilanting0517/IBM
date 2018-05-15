define([
    'dojo/_base/declare',
    './base/baseModel',
    './userModel',
    'pa/proxy/proxy',
    'dojo/_base/lang'
],function(declare, baseModel, userModel, proxy, lang){
    var SystemClass = declare('pa_systemModel', [baseModel], {
        getRulesType: function(flag) {
            var params = {
                value:{"operator": flag ? "edit" : 'new'}
            };
            params = lang.mixin(userModel.getNecessaryParams(), params);
            return proxy.getRulesType(params);
        },

        checkPhoneNum: function(_params) {
            return proxy.checkPhoneNum(_params);
        },

        checkISDE: function(_params) {
            return proxy.checkISDE(_params);
        },
        
        createPresetruleRmt: function(_flag){
        	if(_flag == true){
                var params = {
                     "value":{ preset : "SET"}
                };
             }
             if(_flag == false){
                 var params = {
                      "value":{ preset : "IGNORE"}
                  };
             }
             if(_flag == "clickHere"){
                  var params = {
                       "value":{ preset : "INVALID"}
                 };
             }
            params = lang.mixin(userModel.getNecessaryParams(), params);
            return proxy.createPresetruleRmt(params);
        },
        
        createPresetrulePm: function(_flag){
            var params = {
                "value":{ preset: _flag? "SET" : "IGNORE"}
            };
            params = lang.mixin(userModel.getNecessaryParams(), params);
            return proxy.createPresetrulePm(params);
        },
        createPresetruleComingCall: function(_flag){
            var params = {
                "value":{ preset: _flag? "SET" : "IGNORE"}
            };
            params = lang.mixin(userModel.getNecessaryParams(), params);
            return proxy.createPresetruleComingCall(params);
        },
        createPresetruleComingTask: function(_flag){
            var params = {
                "value":{ preset: _flag? "SET" : "IGNORE"}
            };
            params = lang.mixin(userModel.getNecessaryParams(), params);
            return proxy.createPresetruleComingTask(params);
        },
        checkNewFeature: function(){
            var params = userModel.getNecessaryParams();
            return proxy.checkPopUpNew(params);
        },
        checkPopUp: function(){
            var params = userModel.getNecessaryParams();
            return proxy.checkPopUp(params).then(function(response) {
                var resultMap = response.popupResult;
                if(resultMap.EXPIRATION) {
                    return 'EXPIRATION';
                 }
                if(resultMap.RMT) {
                    return 'RMT';
                }
                if(resultMap.TASK_LOGGED) {
                    return 'TASK_LOGGED';
                }
                if(resultMap.CALL_LOGGED) {
                    return 'CALL_LOGGED';
                }
            });
        },
        
        saveNewFeature: function(_flag){
            var params = {
                "value":{ 
                    type:"alert_group_v1",
                    action:"click"
                }
            };
            params = lang.mixin(userModel.getNecessaryParams(), params);
            return proxy.saveNewFeature(params).then(function() {
                proxy.ccMetrics("1113");
            });
        },
        markToRead: function(alertId) {
            var params = {
                    value : {
                       alertId : alertId
                        }
                    };
            params = lang.mixin(userModel.getNecessaryParams(), params);
            proxy.markToRead(params);
        },
        
        ccMetrics: function(eventID, id, opptyId) {
            proxy.ccMetrics(eventID, id, opptyId);
        },
        
        getNewAlerts: function(){
            var params = userModel.getNecessaryParams();
            return proxy.getNewAlerts(params);
        }
    });
    var systemInstance = new SystemClass();
    
    return systemInstance;
});