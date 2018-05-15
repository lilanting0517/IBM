/*
 * check form for every rule type before saving data
 */
define([
"dojo/dom-class"
], function(domClass){
    regAmount = /^(\d{1,10})(\.\d{1,1})?$/;
    function STUCK_OPPTY(params){
        var flag = true;
        var fields = params.fields[0];
        var fields1 = params.fields[1];
        var inputDay = dojo.query(".inputDay")[0];
        var selectItemTitle = dojo.query(".check_title")[1];
        var selectItemTitle1 = dojo.query(".check_title")[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        
        if(isNaN(fields.value) || !regAmount.test(fields.value)){
        	domClass.add(inputAmount, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(inputAmount, 'redborder');
        }
        if(isNaN(fields.value2)){
        	domClass.add(inputDay, 'redborder');
        	flag = false;
        }else if(fields.value2 < 1 || fields.value2 > 180){
        	domClass.add(inputDay, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(inputDay, 'redborder');
        }
        if(fields.name == ''){
        	domClass.add(selectItemTitle, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selectItemTitle, 'redborder');
        }
        if(fields1.value == ''){
        	domClass.add(selectItemTitle1, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selectItemTitle1, 'redborder');
        }
        return flag;
    }
    
    function OPENED_OPPTY_GPP(params){
        var flag = true;
        var fields = params.fields[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value) || !regAmount.test(fields.value)){
            domClass.add(inputAmount, 'redborder');
            flag = false;
        }else{
        	domClass.remove(inputAmount, 'redborder');
        }
        return flag;
    }
    
    function MISSING_LINE_ITEM_STEPS_TO_CLOSURE(params){
        var flag = true;
//        var fields = params.fields[0];
//        var selectItemTitle = dojo.query(".check_title")[0];
//        if(fields.value2 == ''){
//        	domClass.add(selectItemTitle, 'redborder');
//        	flag = false;
//        }else{
//        	domClass.remove(selectItemTitle, 'redborder');
//        }
        return flag;
    }
    
    function WARM_TRANSFER_NEEDED(params){
        var flag = true;
        var fields = params.fields[0];
        var selectItemTitle = dojo.query(".check_title")[0];
        var selectItemTitle1 = dojo.query(".check_title")[1];
        if(fields.value == ''){
        	domClass.add(selectItemTitle, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selectItemTitle, 'redborder');
        }
        if(fields.value2 == ''){
        	domClass.add(selectItemTitle1, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selectItemTitle1, 'redborder');
        }
        return flag;
    }
    
    function RMT(params){
        var flag = true;
        var fields = params.fields[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value)){
        	domClass.add(inputAmount, 'redborder');
        	flag = false;
        }
        return flag;
    }
    
    function OPENED_OPPTY(params){
        var flag = true;
        var fields = params.fields[0];
        var selectItemTitle = dojo.query(".check_title")[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value) || !regAmount.test(fields.value)){
             domClass.add(inputAmount, 'redborder');
            flag = false;
        }else{
        	domClass.remove(inputAmount, 'redborder');
        }
        if(fields.value2 == ''){
        	domClass.add(selectItemTitle, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selectItemTitle, 'redborder');
        }
        return flag;
    }
    
    function OPPTY_STAGE_CHANGE(params){
        var flag = true;
        var fields = params.fields[0];
        var selectItemTitle = dojo.query(".check_title")[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value) || !regAmount.test(fields.value)){
            domClass.add(inputAmount, 'redborder');
            flag = false;
        }else{
            domClass.remove(inputAmount, 'redborder');
        }
        if(fields.value2 == ''){
            domClass.add(selectItemTitle, 'redborder');
            flag = false;
        }else{
            domClass.remove(selectItemTitle, 'redborder');
        }
        if(fields.name == ''){
            domClass.add(selectItemTitle, 'redborder');
            flag = false;
        }else{
            domClass.remove(selectItemTitle, 'redborder');
        }
        return flag;
    }
    
    function OPPTY_DECISION_DATE_CHANGE(params){
        var flag = true;
        var fields = params.fields[0];
        var selectItemTitle = dojo.query(".check_title")[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value2) || !regAmount.test(fields.value2)){
            domClass.add(inputAmount, 'redborder');
            flag = false;
        }else{
            domClass.remove(inputAmount, 'redborder');
        }
        if(fields.value == ''){
            domClass.add(selectItemTitle, 'redborder');
            flag = false;
        }else{
            domClass.remove(selectItemTitle, 'redborder');
        }
        return flag;
    }
    
    function PAGE_MANAGER_EXP(params){
        var flag = true;
        var fields = params.fields[0];
        var inputDay = dojo.query(".inputDay")[0];
        var selectItemTitle = dojo.query(".check_title")[0];
        
        if(isNaN(fields.value)){
        	domClass.add(inputDay, 'redborder');
        	flag = false;
        }else if(fields.value < 1 || fields.value > 30){
        	domClass.add(inputDay, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(inputDay, 'redborder');
        }
        if(fields.value2==''){
        	domClass.add(selectItemTitle, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selectItemTitle, 'redborder');
        }
        
        return flag;
    }
    
    function NEW_OPPTY_NOT_SALES_TEAM(params){
        var flag = true;
        var fields = params.fields[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value)){
        	domClass.add(inputAmount, 'redborder');
        	flag = false;
        }
        return flag;
    }
    
    function SOCIAL_AUTH_EXP(params){
        var flag = true;
        var fields = params.fields[0];
        var inputDay = dojo.query(".inputDay")[0];
        var selectItemTitle = dojo.query(".check_title")[0];
        if(isNaN(fields.value2)){
            domClass.add(inputDay, 'redborder');
            flag = false;
        }else if(fields.value2 < 1 || fields.value2 > 30){
            domClass.add(inputDay, 'redborder');
            flag = false;
        }else{
            domClass.remove(inputDay, 'redborder');
        }
        return flag;
    }
    
    function UNICA_STEPS(params){
        var flag = true;
        var fields = params.fields;
        var operatorValue='';
        for(var i = 0; i < fields.length; i++){
            var item = fields[i];
            if(item.value ==""){
            	operatorValue = dojo.query(".operatorValue")[i];
            	domClass.add(operatorValue, 'redborder');
                flag = false;
            }else{
            	operatorValue = dojo.query(".operatorValue")[i];
            	domClass.remove(operatorValue, 'redborder');
            }
        }
        
        return flag;
    }
    
    function UNICA_VISITS(params){
        var flag = true;
        var fields = params.fields[0];
        var regDay = /^\d{0,2}$/;
        var visitsTimes = dojo.query(".visitsTimes")[0];
        var PeriodText = dojo.query(".s_textBox")[0];
        if(fields.value == '' || isNaN(fields.value) || !regDay.test(fields.value)){
        	domClass.add(visitsTimes, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(visitsTimes, 'redborder');
        }
        var period = fields.period;
        if(fields.value2 == '' || isNaN(fields.value2)){
        	domClass.add(PeriodText, 'redborder');
        	flag = false;
        }else if(period=='DAY' &&  fields.value2 < 2 || (period=='WEEK' || period=='MONTH') &&  fields.value2 < 1){
        	domClass.add(PeriodText, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(PeriodText, 'redborder');
        }
        
        return flag;
    }
    function COMPLEX(params){
        var flag = true;
        var fields = params.fields;
        var PeriodText='';
        for(var i = 0; i < fields.length; i++){
            var item = fields[i];
            //var period = item.period;
            if(isNaN(item.value)){
            	PeriodText = dojo.query(".PeriodText")[i];
            	domClass.add(PeriodText, 'redborder');
                flag = false;
            }else if(item.period=='DAY' &&  item.value < 2 || (item.period=='WEEK' || item.period=='MONTH') &&  item.value < 1){
            	PeriodText = dojo.query(".PeriodText")[i];
            	domClass.add(PeriodText, 'redborder');
            	flag = false;
            }else{
            	PeriodText = dojo.query(".PeriodText")[i];
            	domClass.remove(PeriodText, 'redborder');
            }
        }
        
        return flag;
    }
    function CLOSE_OUT_CALL(params){
        var flag = true;
        var fields = params.fields[0];
        var inputDay = dojo.query(".inputDay")[0];
        var inputAmount = dojo.query(".inputAmount")[0];
        if(isNaN(fields.value) || !regAmount.test(fields.value)){
            domClass.add(inputAmount, 'redborder');
            flag = false;
        }else{
            domClass.remove(inputAmount, 'redborder');
        }
        if(isNaN(fields.value2)){
            domClass.add(inputDay, 'redborder');
            flag = false;
        }else if(fields.value2 < 1 || fields.value2 > 180){
            domClass.add(inputDay, 'redborder');
            flag = false;
        }else{
            domClass.remove(inputDay, 'redborder');
        }
        return flag;
    }
    function TASK_LOGGED(params){
    	 var flag = true;
         var fields = params.fields[0];
         var selecetPeriodTitle = dojo.query(".check_period_title")[0];
         if(fields.value==''){
         	domClass.add(selecetPeriodTitle, 'redborder');
         	flag = false;
         }else{
         	domClass.remove(selecetPeriodTitle, 'redborder');
         }
         
         return flag;
    }
    function CALL_LOGGED(params){
        var flag = true;
        var fields = params.fields[0];
        var selecetPeriodTitle = dojo.query(".check_period_title")[0];
        if(fields.value==''){
        	domClass.add(selecetPeriodTitle, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selecetPeriodTitle, 'redborder');
        }
        
        return flag;
    }
    function TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL(params){
        var flag = true;
        var fields = params.fields[0];
        var selecetPeriodTitle = dojo.query(".check_period_title")[0];
        if(fields.value==''){
        	domClass.add(selecetPeriodTitle, 'redborder');
        	flag = false;
        }else{
        	domClass.remove(selecetPeriodTitle, 'redborder');
        }
        
        return flag;
    }
    function WARM_TRANSFER_5_DAYS(params){
        var flag = true;
//        var fields = params.fields[0];
//        var inputDay = dojo.query(".inputDay")[0];
//        
//        if(isNaN(fields.value)){
//            domClass.add(inputDay, 'redborder');
//            flag = false;
//        }else if(fields.value < 1 || fields.value > 30){
//            domClass.add(inputDay, 'redborder');
//            flag = false;
//        }else{
//            domClass.remove(inputDay, 'redborder');
//        }
        return flag;
    }
    function WARM_TRANSFER_14_DAYS(params){
        var flag = true;
//        var fields = params.fields[0];
//        var inputDay = dojo.query(".inputDay")[0];
//        
//        if(isNaN(fields.value)){
//            domClass.add(inputDay, 'redborder');
//            flag = false;
//        }else if(fields.value < 1 || fields.value > 30){
//            domClass.add(inputDay, 'redborder');
//            flag = false;
//        }else{
//            domClass.remove(inputDay, 'redborder');
//        }
        return flag;
    }
    return function(){
        var me = this;
        switch (me.template){
            case 'STUCK_OPPTY':
                return STUCK_OPPTY(me);
                break;
            case 'OPENED_OPPTY_GPP':
                return OPENED_OPPTY_GPP(me);
                break;
            case 'WARM_TRANSFER_NEEDED':
                return WARM_TRANSFER_NEEDED(me);
                break;
            case 'RMT':
                return RMT(me);
                break;
            case 'OPENED_OPPTY':
                return OPENED_OPPTY(me);
                break;
            case 'OPPTY_STAGE_CHANGE':
                return OPPTY_STAGE_CHANGE(me);
                break;
            case 'OPPTY_DECISION_DATE_CHANGE':
                return OPPTY_DECISION_DATE_CHANGE(me);
                break;
            case 'PAGE_MANAGER_EXP':
                return PAGE_MANAGER_EXP(me);
                break;
            case 'NEW_OPPTY_NOT_SALES_TEAM':
                return NEW_OPPTY_NOT_SALES_TEAM(me);
                break;
            case 'CALL_BACK_DUE':   
                return RMT(me);
                break;
            case 'NEW_OPPORTUNITY': 
                return RMT(me);
                break;
            case 'OPPORTUNITY_NEEDS_UPDATING': 
                return RMT(me);
                break;
            case 'ORDER_BOOKED':  
                return RMT(me);
                break;
            case 'CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED':   
                return RMT(me);
                break;
            case 'SOCIAL_AUTH_EXP':
                return SOCIAL_AUTH_EXP(me);
                break;
            case 'UNICA_STEPS':
                return UNICA_STEPS(me);
                break;
            case 'UNICA_VISITS':
                return UNICA_VISITS(me);
                break;
            case 'COMPLEX':
                return COMPLEX(me);
                break;
            case 'CLOSE_OUT_CALL':
                return CLOSE_OUT_CALL(me);
                break;
            case 'NEW_OPPTY_LESS_THAN_500K':
                return true;
                break;
            case 'TASK_LOGGED':
                return TASK_LOGGED(me);
                break;
            case 'CALL_LOGGED':
                return CALL_LOGGED(me);
                break;
            case 'OPEN_OPPTY_REVENUE_IN_PRIOR_MONTH':
            	return true;
                break;
            case 'WON_OPPTY_REVENUE_IN_PRIOR_MONTH':
            	return true;
                break;
            case 'NEW_OPPTY_NOT_LIO_OR_OO':
            	return true;
                break;
            case 'WON_OPPTY_FUTURE_DECISION_DATE':
            	return true;
                break;
            case 'WARM_TRANSFER_5_DAYS':
            	return WARM_TRANSFER_5_DAYS(me);
                break;
            case 'WARM_TRANSFER_14_DAYS':
            	return WARM_TRANSFER_14_DAYS(me);
                break;
            case 'ROADMAP_STATUS_UPDATE_REQUIRED':
            	return true;
                break;
            case 'REMOVED_FROM_SALES_TEAM':
            	return true;
                break;
            case 'POTE_DUPL_OF_LOST_OPPTY':
            	return true;
                break;
            case 'MISSING_LINE_ITEM_STEPS_TO_CLOSURE':
            	return true;
                break;
            case 'OPEN_OPPTY_WITH_PRIOR_DECISION_DATE':
            	return true;
                break;
            case 'MISSING_INVALID_EMAIL_ADDRESS':
            	return true;
                break;
            case 'TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL':
            	return CALL_LOGGED(me);
                break;
            default:
                return false;
                break;
        }
    }
});