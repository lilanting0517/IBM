define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "./net",
    "dojo/Deferred",
    "app/services/ConsoleService"
], function(declare, lang, Net, Deferred, ConsoleService) {
    //测试用
    var debugMode = false;
    var webRoot = '/sales/gss/proxyservice/proxy/pa/core/';
    //var secretKey = 'dhASLDH1232AasdasdA412dasdaDIWAHedAiHSio';
    var requireJson = function (_url){
        var def = new Deferred();
        
        require(['dojo/text!' + _url], function(_dataStr){
            def.resolve(JSON.parse(_dataStr));
        });
        return def.promise;
    };
    var mixUrl = function (_subUrl) {
        return webRoot + _subUrl || '';
    };
    var netInstance = new Net();
    var ProxyClass = declare('PA_proxy', [], {
        //获取RulesTyleList
        getRulesType: function(_params) {
            var subUrl = 'get-baseconf';
            var config = lang.mixin({
                url : mixUrl(subUrl)
            }, _params);
            return debugMode ? requireJson('pa/proxy/testData/ruletypelist.json'): netInstance.getDataByJsonp(config);
        },
        
        //标记一个alert已读
        markAnAlertToRead: function(_params){
            var subUrl = 'mark-to-read';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        
        //获取用户所有Alerts
        getUserAlerts: function(_params){
            var subUrl = 'get-alerts';
            var config = lang.mixin({
                url : mixUrl(subUrl)
            }, _params);
            return debugMode ? requireJson('pa/proxy/testData/alertslist.json'): netInstance.getDataByJsonp(config);    
        },
        
        //获取一个Rule的信息
        getAnRule: function(_params){
            var subUrl = 'get-one-rule';
            var config = lang.mixin({
                url : mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);    
        },
    
        //获取用户所有的Rules
        getUserRules: function(_params) {
            var subUrl = 'get-rules';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return debugMode ? requireJson('pa/proxy/testData/userrules.json'): netInstance.getDataByJsonp(config);
        },
    
        //删除所有的Alerts
        deleteAllAlerts: function(_params) {
            var subUrl = 'delete-alerts';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
    
        //删除一个Alert
        deleteAnAlert: function(_params) {
            var subUrl = 'delete-one-alert';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
    
        //保存一个Rule
        saveAnRule: function(_params) {
            var subUrl = 'save-rule';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
    
        //检查phoneNum
        checkPhoneNum: function(_params) {
            var subUrl = 'check-phonenum';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
    
        //检查ISDE
        checkISDE: function(_params) {
            var subUrl = 'check-isde';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
    
        //搜索用户
        searchCustomer: function(_params) {
            var subUrl = 'get-customerbysearch';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
    
        //获取Personal信息
        getPersonInfo: function(_params) {
            var subUrl = 'get-persettings';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return debugMode ? requireJson('pa/proxy/testData/personal.json') : netInstance.getDataByJsonp(config);
        },
    
        //保存Personal信息
        savePersonInfo: function(_params) {
            var subUrl = 'save-persettings';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        
        //删除一个Rule
        deleteAnRule: function(_params) {
            var subUrl = 'delete-one-rule';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        
        //create PresetruleRmt
        createPresetruleRmt: function(_params){
            var subUrl = 'create-presetrule-rmt';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        
        //create PresetrulePm
        createPresetrulePm: function(_params){
            var subUrl = 'create-presetrule-pm';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        createPresetruleComingCall: function(_params){
            var subUrl = 'create-presetrule-call';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        createPresetruleComingTask: function(_params){
            var subUrl = 'create-presetrule-task';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        //checkPopUp
        checkPopUp : function(_params){
            var subUrl = 'check-popup';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        
        checkPopUpNew : function(_params){
            var subUrl = 'check-popup-new';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        
        //saveNewFeature
        saveNewFeature : function(_params) {
            var subUrl = 'save-new-feature-action';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        //markToActive
        markToActive: function(_params) {
            var subUrl = 'mark-to-active';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
      //markToActive
        markToGroup: function(_params) {
            var subUrl = 'mark-to-group';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        getRuleSelect: function(_params) {
            var subUrl = 'get-one-rule';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        markToRead: function(_params) {
            var subUrl = 'mark-to-read';
            var config = lang.mixin({
                url: mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);
        },
        ccMetrics: function(eventID, id, opptId) {
            var metricObject = {"relatedOppty":"","relatedClient":"","relatedContact":"","relatedLead":"","relatedExtra":""};
            if(id){
                metricObject.relatedExtra = id;
            }
            if(opptId){
                metricObject.relatedOppty = opptId;
            }
            ConsoleService.logActivity(eventID,"B00",metricObject);
        },
        getNewAlerts: function(_params){
            var subUrl = 'check-new-alerts';
            var config = lang.mixin({
                url : mixUrl(subUrl)
            }, _params);
            return netInstance.getDataByJsonp(config);    
        }
    });

    var proxyInstance = new ProxyClass();
    return proxyInstance;
});