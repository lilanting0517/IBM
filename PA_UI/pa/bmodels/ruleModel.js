define([
    'dojo/_base/declare',
    './base/baseModel',
    './configjson/ruletypes/ruletypefactory',
    'pa/proxy/proxy',
    'dojo/_base/lang'
],function(declare, baseModel, ruletypefactory,proxy, lang){
    return declare('pa_ruleModel', [baseModel], {
        postscript: function(params) {
            var ruleConfig = ruletypefactory.getProperty(params);
            this.set(ruleConfig);
        },
        extend: function(target, source) {
            var isArrayCopy = '';
            
            for (var name in source) {
                //if(name == "isGroup" || name == "isActive") continue;
                src = target[name];
                copy = source[name];
                if(src === copy) continue;
                if(true && copy && this.isPlainObject(copy) || (isArrayCopy = this.isArray(copy))){
                    if(isArrayCopy){
                        isArrayCopy = false;
                        clone = this.isArray(src) ? src : [];
                    }else{
                        clone = this.isPlainObject(src) ? src : {};
                    }
                    target[name] = this.extend(clone, copy);
                }else if(copy !== void 0){
                    target[name] = copy;
                }
            }
            return target;
        },
        resetValue : function(target, source, first) {
            var isArrayCopy = '';
            for (var name in source) {
            	if(name == "isGroup" || name == "isActive") continue;
                src = target[name];
                copy = source[name];
                if(src === copy) continue;
                if(false && copy && this.isPlainObject(copy) || (isArrayCopy = this.isArray(copy))){
                    if(isArrayCopy){
                        isArrayCopy = false;
                        clone = this.isArray(src) ? src : [];
                    }else{
                        clone = this.isPlainObject(src) ? src : {};
                    }
                    target[name] = this.resetValue(clone, copy, true);
                    if(name == 'fields'){
                        var fields = target.get("fields");
                        target.set("fields", fields);
                    }
                }else if(copy !== void 0){
                    if(first){
                        target[name] = copy;
                    }else{
                        target.set(name, copy);
                    }
                }
            }
            return target;
        },
        isArray:function(obj){
            return toString.call(obj) === '[object Array]';
        },
        isPlainObject: function(obj) {
            if (!this.isObject(obj) || obj.nodeType || this.isWindow(obj)) {
                return false;
            }
            if (obj.constructor && !{}.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            return true;
        },
        isObject: function(obj) {
            return toString.call(obj) === '[object Object]';
        }, 
        isWindow:function(obj) {
            return obj != null && obj === obj.window;
        },
        save: function(user,personalInfo){
            var me = this;
            if(personalInfo){ //due to personal setting page set value
                if(personalInfo.effectiveTimeFrom){
                    this.set('effectiveTimeFrom', personalInfo.effectiveTimeFrom);
                }
                if(personalInfo.effectiveTimeTo){
                    this.set('effectiveTimeTo', personalInfo.effectiveTimeTo);
                }
            }
            var params = { 
                value: {
                    ruleconfig: {
                        id: this.get('id'),
                        template: this.get('template'),
                        ruleName: this.get('ruleName'),
                        priority: this.get('priority'),
                        channel: this.get('channel'),
                        effectiveTimeFrom: this.get('effectiveTimeFrom'),
                        effectiveTimeTo: this.get('effectiveTimeTo'),
                        isGroup: this.get('isGroup'),
                        fields: this.get('fields')
                    }
                }
            };
            if(this.get('template')=="UNICA_STEPS" || this.get('template')=="UNICA_VISITS" || this.get('template')=="OPENED_OPPTY"){
                params.value.ruleconfig.selectedCustomers = [{"string":"ANY"}];
                params.value.ruleconfig.customerQuantifier = "ANY";  
            }
            params = lang.mixin(user.getNecessaryParams(), params);
            return proxy.saveAnRule(params).then(function(data) {
                if(!me.get('id') || me.get('id') == '0'){
                    proxy.ccMetrics("1105", data.paresponse.id);
                }else{
                    proxy.ccMetrics("1107", data.paresponse.id);
                }
                return data;
            });
        },
        destroy: function(params){
            return proxy.deleteAnRule(params);
        },
        markToActive: function(params){
            return proxy.markToActive(params);
        },
        markToGroup: function(params){
            return proxy.markToGroup(params);
        },
        getRuleSelect: function(user, template){
            var params = {
                value: {
                    alertrequest:{
                        template: template
                    }
                }
            };
            params = lang.mixin(user.getNecessaryParams(), params);
            return proxy.getRuleSelect(params);
        }
    });
});