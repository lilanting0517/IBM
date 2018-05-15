define([
  "dojo/parser",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./template/template.html",
  "dojo/on",
  "dijit/form/TextBox",
  "dijit/form/CheckBox",
  "dojox/mvc/at",
  "dojo/Stateful",
  "dijit/form/CheckBox",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  "pa/widgets/helpTip",
  "app/widgets/tips/client",
  "dojo/dom-class",
  "dojo/dom-attr"
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, TextBox, CheckBox, at, Stateful, CheckBox, CustomSelector, user,helpTip,client,domClass,domAttr) {
    return declare("CommonWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString : template,
        constructor: function(){},
        startup: function(){
            this._eventsBind();
        },
        _eventsBind: function(){
            var me = this;
            var stateful = this.modelInstance;
            if(this.modelChannel){
                stateful.set('channel', this.modelChannel);
            }
            me.setChannelValue(stateful);
            //me.setGroupEmailValue(stateful);
            on(this["channels"], 'click', function(){
                var channelsContent="";
                for(var i = 0; i<this.elements.length; i++) {
                    if(this.elements[i].checked){
                        channelsContent += this.elements[i].value+",";
                    }
                }
                channelsContent = channelsContent.substring(0,channelsContent.length-1);
                stateful.set('channel', channelsContent);
            });
            on(this["EMAIL"], 'click', function(){
//                var newFeatureContent = '';
//                var ruleType = me.modelInstance.template;
//                if(ruleType == "PAGE_MANAGER_EXP" || ruleType == "STUCK_OPPTY" || ruleType == "CALL_LOGGED" || ruleType == "TASK_LOGGED" || ruleType == "CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED"
//                    || ruleType == "CALL_BACK_DUE" || ruleType == "NEW_OPPORTUNITY" || ruleType == "OPPORTUNITY_NEEDS_UPDATING" || ruleType == "ORDER_BOOKED" 
//                    	|| ruleType == "CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED" || ruleType == "OPPTY_STAGE_CHANGE"||ruleType == "OPENED_OPPTY"||ruleType == "OPENED_OPPTY_GPP"||
//                    	ruleType == "OPEN_OPPTY_WITH_PRIOR_DECISION_DATE"|| ruleType == "CLOSE_OUT_CALL" || ruleType == "ROADMAP_STATUS_UPDATE_REQUIRED"|| 
//                    	ruleType == "MISSING_LINE_ITEM_STEPS_TO_CLOSURE"|| ruleType == "WARM_TRANSFER_NEEDED" || ruleType == "MISSING_INVALID_EMAIL_ADDRESS" || ruleType == "OPPTY_DECISION_DATE_CHANGE"){
//                    //after checking email box, show group function
//                	if(this.checked){
//                        domClass.remove(me.groupEmail, 'hidden');
//                            stateful.set('isGroup', true);
//                            me.GROUP.set("checked",true);
//                        if(ruleType != "CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED" && ruleType == "CALL_BACK_DUE" && ruleType == "NEW_OPPORTUNITY" 
//                           && ruleType == "OPPORTUNITY_NEEDS_UPDATING" && ruleType == "ORDER_BOOKED" && ruleType == "CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED"){
//                            newFeatureContent = 'To reduce the number of individual alerts you ';
//                            newFeatureContent += 'receive daily, use the group feature to receive ';
//                            newFeatureContent += 'them all in a consolidated emailed list.';
//                            client.pushTips([{id:'pa-3469c3d05f60', content:newFeatureContent, position:'right-top'}]);
//                        }
//                    }else{
//                        domClass.add(me.groupEmail, 'hidden');
//                        stateful.set('isGroup', false);
//                        me.GROUP.set("checked",false);
//                    }
//                }else{
                    domClass.add(me.groupEmail, 'hidden');
//                }
            });
            //me.GROUP.set("checked",true);
//            on(this["GROUP"], 'click', function(){
//                var isChecked = this.checked;
//                var isCheckedString = isChecked.toString();
//                stateful.set('isGroup', isCheckedString);
//                
//            });
//            stateful.watch('isGroup', function(){
//               me.setGroupEmailValue(stateful);
//            });
            stateful.watch('channel', function(){
                me.setChannelValue(stateful);
            });
            // Dojo
            me.rule_Name.setValue(stateful.get('ruleName'));
            this["rule_Name"].set('value', at(stateful, "ruleName"));
            this["rule_Name"].startup();
        },
//       setGroupEmailValue: function(stateful){
//           var me = this;
//           var isGroup = stateful.get('isGroup');
//           var ruleType = me.modelInstance.template;
//           if((ruleType == "PAGE_MANAGER_EXP" || ruleType == "STUCK_OPPTY" || ruleType == "CALL_LOGGED" || ruleType == "TASK_LOGGED" || 
//               ruleType == "CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED" || ruleType == "CALL_BACK_DUE" || ruleType == "NEW_OPPORTUNITY" || ruleType == "OPPORTUNITY_NEEDS_UPDATING" 
//            	   || ruleType == "ORDER_BOOKED" || ruleType == "CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED" ||  ruleType == "OPPTY_STAGE_CHANGE" || ruleType == "OPENED_OPPTY" || ruleType == "OPENED_OPPTY_GPP" || 
//            	   ruleType == "OPEN_OPPTY_WITH_PRIOR_DECISION_DATE" ||  ruleType == "CLOSE_OUT_CALL" ||  ruleType == "ROADMAP_STATUS_UPDATE_REQUIRED"|| 
//            	   ruleType == "MISSING_LINE_ITEM_STEPS_TO_CLOSURE" || ruleType == "WARM_TRANSFER_NEEDED" || ruleType == "MISSING_INVALID_EMAIL_ADDRESS" || ruleType == "OPPTY_DECISION_DATE_CHANGE") && me.EMAIL.checked){
//               //these rules have group function, set check value to group check box
//        	   domClass.remove(me.groupEmail, 'hidden');
//               if(isGroup == "true"){
//                  me.GROUP.set("checked",true);
//               }else{
//                  me.GROUP.set("checked",false);
//               }
//             }
//        },
        setChannelValue: function(stateful){
            var me = this;
            var checkboxElements = me.channels.elements;
            var ruleType = this.modelInstance.template;
            for(var i = 0; i<checkboxElements.length; i++) {
                dijit.byId(checkboxElements[i].id).set("checked",false);
            }
            var channel = stateful.get('channel').split(",");
            for(var i = 0; i<channel.length; i++) {
                switch (channel[i]){
                case 'EMAIL':
                    me.EMAIL.set("checked",true);
                    break;
                case 'SAMETIME':
                    me.SAMETIME.set("checked",true);
                    break;
                default:
                    break;
                }
            }
        }
    });
});