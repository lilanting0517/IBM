
define([
    'dojo/_base/declare',
    './base/baseModel',
    'pa/proxy/proxy',
    'dojo/text!./configjson/alert.json'
],function(declare, baseModel, proxy, alertJson){
    return declare('pa_alertModel', [baseModel], {
        //dojo life cycle and init keys
        postscript: function() {
            var alertConfig = JSON.parse(alertJson);
            this.set(alertConfig);
        },
        
        destroy: function(params){
            return proxy.deleteAnAlert(params);
        }
    });
});