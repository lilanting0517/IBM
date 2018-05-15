define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    './base/modelsList',
    './base/baseModel',
    './alertModel',
    './ruleModel',
    'pa/proxy/proxy',
    'dojo/text!./configjson/user.json'
], function(declare, lang, ModesList, baseModel, alertModel, RuleModel, proxy, userJson) {
    var formatDate = function(_date) {
        var _str = _date.toLocaleDateString();
        return _str.replace(/\//g, '-');
    };
    var UserClass = declare('pa_userModel', [ baseModel ],{
                //dojo life cycle and init keys
        postscript : function() {
            var userConfig = JSON.parse(userJson);
            var alertsList = new ModesList();
            alertsList.set('type', 'alert');
            var rulesList = new ModesList();
            rulesList.set('type', 'rule');
            this.set(userConfig);
            this.set('alertsList', alertsList);
            this.set('rulesList', rulesList);
        },

        getNecessaryParams : function(){
            return {
                    userId : this.get('userId').trim(),
                    cnum: this.get('cnum').trim(),
                    secretKey : this.get('secretKey'),
                    isViewAs:""+this.get('isViewAs')
                };
        },

        createRule : function(ruleType, params) {
            var newRule = new RuleModel(ruleType, params);
            return newRule;
        },

        getAlertList : function() {
            var days = 30;
            var endDay = new Date();
            var startDay = new Date(endDay.getTime() - days * 24 * 3600 * 1000);
            var alertsList = this.get('alertsList');
            var _params = {
                value : {
                    startDate : formatDate(startDay),
                    endDate : formatDate(endDay),
                    role : "needs assignment"
                }
            };
            _params = lang.mixin(this.getNecessaryParams(), _params);
            return proxy.getUserAlerts(_params).then(function(data) {
                var alertsListData = data.paresponse.notification;
                alertsList.reset(alertsListData);
                return data;
            });
        },

        getRuleList : function() {
            var rulesList = this.get('rulesList');
            var params = this.getNecessaryParams();
            return proxy.getUserRules(params).then(function(data) {
                var rulesListData = data.paresponse.ruleconfig;
                rulesList.reset(rulesListData);
                return rulesListData;
            }, function() {
            });
        },

        deleteRule: function(_id) {
            var rulesList = this.get('rulesList');
            var targetRule = rulesList.get(_id);
            var params = {
                value: {
                    alertrequest:{
                        ruleId: _id
                    }
                }
            };
            params = lang.mixin(this.getNecessaryParams(), params);
            return targetRule.destroy(params).then(function() {
                proxy.ccMetrics('1106', _id);
                rulesList.remove(_id);
            });
        },
        markToActive: function(_id) {
            var rulesList = this.get('rulesList');
            var targetRule = rulesList.get(_id);
            var params = {
                value: {
                    isActive: targetRule.isActive,
                    ruleId: _id
                }
            };
            params = lang.mixin(this.getNecessaryParams(), params);
            return targetRule.markToActive(params).then(function() {
                if(targetRule.isActive == "false"){
                    proxy.ccMetrics('1115', _id);
                }
            });
        },
        markToGroup: function(_id) {
            var rulesList = this.get('rulesList');
            var targetRule = rulesList.get(_id);
            var params = {
                value: {
                    isGroup: targetRule.isGroup,
                    ruleId: _id
                }
            };
            params = lang.mixin(this.getNecessaryParams(), params);
            return targetRule.markToGroup(params).then(function() {
                if(targetRule.isGroup == "true"){
                    proxy.ccMetrics("1111", _id);
                }else if(targetRule.isGroup == "false"){
                    proxy.ccMetrics("1112", _id);
                }
            });
        },
        deleteAlert : function(_id) {
            var alertsList = this.get('alertsList');
            var targetAlert = alertsList.get(_id);
            var params = {
                "value" : {
                    "alertrequest" : {
                        "alertId" : _id
                    }
                }
            };
            params = lang.mixin(this.getNecessaryParams(), params);
            return targetAlert.destroy(params).then(function() {
                proxy.ccMetrics("1102", _id);
                alertsList.remove(_id);
            });
        },
        savePersonalPreference : function() {
            var params = {
                value : {
                    cellularProvider : this.get('cellularProvider'),
                    cellNumber : this.get('cellNumber'),
                    timeZone : this.get('timeZone'),
                    //add by pekka
                    effectiveTimeFrom : this.get('effectiveTimeFrom'),
                    effectiveTimeTo : this.get('effectiveTimeTo'),
                    channels : this.get('channels')
                }
            };
            params = lang.mixin(this.getNecessaryParams(), params);
            return proxy.savePersonInfo(params);
        },

        getPersonalPreference : function() {
            var me = this;
            var params = this.getNecessaryParams();
            return proxy.getPersonInfo(params).then(function(data) {
                var personalInfo = data.paresponse.personalinfo;
                me.set(personalInfo);
                return data.paresponse;
            });
        },
        clearAllAlerts : function() {
            var me = this;
            var params = {
                value : {
                    userId : this.get('userId').trim()
                }
            };
            params = lang.mixin(this.getNecessaryParams(), params);
            return proxy.deleteAllAlerts(params).then(function() {
                proxy.ccMetrics("1101");
                var alertsList = me.get('alertsList');
                alertsList.reset([]);
            });
        }
    });
    var userInstance = new UserClass();
    
    return userInstance;
});