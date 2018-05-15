define([
    'dojo/_base/declare',
    'dojo/text!./typeconfig/STUCK_OPPTY.json',
    'dojo/text!./typeconfig/OPPTY_STAGE_CHANGE.json',
    'dojo/text!./typeconfig/OPENED_OPPTY.json',
    'dojo/text!./typeconfig/OPENED_OPPTY_GPP.json',
    'dojo/text!./typeconfig/PAGE_MANAGER_EXP.json',
    'dojo/text!./typeconfig/CALL_BACK_DUE.json',
    'dojo/text!./typeconfig/NEW_OPPORTUNITY.json',
    'dojo/text!./typeconfig/OPPORTUNITY_NEEDS_UPDATING.json',
    'dojo/text!./typeconfig/ORDER_BOOKED.json',
    'dojo/text!./typeconfig/CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED.json',
    'dojo/text!./typeconfig/UNICA_STEPS.json',
    'dojo/text!./typeconfig/UNICA_VISITS.json',
    'dojo/text!./typeconfig/NEW_OPPTY_NOT_SALES_TEAM.json',
    'dojo/text!./typeconfig/SOCIAL_AUTH_EXP.json',
    'dojo/text!./typeconfig/COMPLEX.json',
    'dojo/text!./typeconfig/CLOSE_OUT_CALL.json',
    'dojo/text!./typeconfig/TASK_LOGGED.json',
    'dojo/text!./typeconfig/CALL_LOGGED.json',
    'dojo/text!./typeconfig/WARM_TRANSFER_5_DAYS.json',
    'dojo/text!./typeconfig/WARM_TRANSFER_14_DAYS.json',
    'dojo/text!./typeconfig/TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL.json',
    'dojo/text!./typeconfig/ROADMAP_STATUS_UPDATE_REQUIRED.json',
    'dojo/text!./typeconfig/WARM_TRANSFER_NEEDED.json',
    'dojo/text!./typeconfig/OPPTY_DECISION_DATE_CHANGE.json'
], function(declare, STUCK_OPPTY, OPPTY_STAGE_CHANGE, OPENED_OPPTY, OPENED_OPPTY_GPP, PAGE_MANAGER_EXP, CALL_BACK_DUE, UNICA_STEPS, UNICA_VISITS, NEW_OPPTY_NOT_SALES_TEAM, SOCIAL_AUTH_EXP, COMPLEX, 
		CLOSE_OUT_CALL,TASK_LOGGED,CALL_LOGGED,WARM_TRANSFER_5_DAYS,TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL,ROADMAP_STATUS_UPDATE_REQUIRED,WARM_TRANSFER_NEEDED,OPPTY_DECISION_DATE_CHANGE) {
    var args = [];
    var arg2arr = function(argobj) {
        var i = 0, len = argobj.length, result = [];
        for(; i < len;i++){
            result.push(argobj[i]);
        }
        return result;
    };
    args = arg2arr(arguments);
    var _class = declare('ruleFactory', [], {
        constructor: function(){
            this.ruleTypeList = args.slice(1);
        },
        str2json: function(str){
            var result = {};
            try{
                result = JSON.parse(str);
            }catch(e){
                console.log(e);
            }
            return result;
        },
        searchRule: function(rule_type){
            //rule_type = this.searchRuleForRMT(rule_type);
            var i = 0, ruleTypeList = this.ruleTypeList, target = null;
            for(; i < ruleTypeList.length; i++){
                var o = this.str2json(ruleTypeList[i]);
                if(o['template'] == rule_type){
                    target = o;
                }
            }
            return target || {}
        },
//        searchRuleForRMT: function(rule_type){
//            var type = rule_type;
//            if(rule_type == 'CALL_BACK_DUE' ||rule_type == 'NEW_OPPORTUNITY' ||rule_type == 'OPPORTUNITY_NEEDS_UPDATING' ||rule_type == 'ORDER_BOOKED' ||rule_type =='CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED'){
//                type = 'RMT';
//            }
//            return type;
//        },
        getProperty: function(rule_type){
            return this.searchRule(rule_type);
        }
    });
    
    var factory = new _class;
    
    return factory;
});