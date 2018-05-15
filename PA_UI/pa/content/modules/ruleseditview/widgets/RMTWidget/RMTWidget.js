define([
  "dojo/parser",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./template/template.html",
  "dojo/on",
  "dojox/mvc/at",
  "dojo/Stateful",
  "dijit/form/NumberTextBox",
  "dijit/form/RadioButton",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  "pa/widgets/helpTip",
  'dojo/dom-class',
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, RadioButton, CustomSelector, user,helpTip,domClass) {

	return declare("RMTWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		constructor: function(){},
		startup: function(){
			this._eventsBind();
		},
		_eventsBind: function(){
			var me = this;
			var stateful = this.modelInstance;
			var fields = stateful.get("fields");
			var operatorType = fields[0].operator;
			var amountValueType = fields[0].value;
			var listItems = [{'label': 'more than or exactly','value': 'IS_GREATER_OR_EQUAL'},{'label': 'less than or exactly','value': 'IS_LESS_OR_EQUAL'}];
			
			// Native
			me.setSelectValue(listItems,operatorType);
			me.operatorSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[0].operator = me.operatorSelect.getValue();
				stateful.set("fields", fields);
			}));
			if(stateful.get("template") == "RMT"){
				stateful.set("template", 'CALL_BACK_DUE');
			}
			me.setAlertOptionsValue(stateful);
			on(this["alertOptionsType"], 'click', function(){
				var alertOptions="";
				for(var i = 0; i<this.elements.length; i++) {
					if(this.elements[i].checked){
						alertOptions = this.elements[i].value;
					}
				}
				stateful.set("template", alertOptions);
			});
			stateful.watch("template", function(){
				me.setAlertOptionsValue(stateful);
			});
			
			me.amountTextBox.setValue(amountValueType);
			on(this["amountTextBox"], 'change', function(){
				fields[0].value = this.getValue();
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
				var operatorType = fields[0].operator;
				me.setSelectValue(listItems,operatorType);
				var amountValueType = fields[0].value;
				me.amountTextBox.setValue(amountValueType);
			});
			
			var popup;
			on(me.callBackDueHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('Call back date is due - need to call customer');
				popup.show(this);
			});
			on(me.callBackDueHelp, "mouseout", function(){
				popup.hide();
			});
			
			on(me.newOpportunityHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('A new opportunity has been created and assigned to you');
				popup.show(this);
			});
			on(me.newOpportunityHelp, "mouseout", function(){
				popup.hide();
			});
			
			on(me.opportunityNeedUpdateHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('It has been 14 days since an opportunity was updated');
				popup.show(this);
			});
			on(me.opportunityNeedUpdateHelp, "mouseout", function(){
				popup.hide();
			});

			on(me.orderBookedHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('Renewal has been processed and sales order # populated in RMT');
				popup.show(this);
			});
			on(me.orderBookedHelp, "mouseout", function(){
				popup.hide();
			});
			on(me.customerEmailNeedsToBeUpdatedHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('Customer email needs to be updated');
				popup.show(this);
			});
			on(me.customerEmailNeedsToBeUpdatedHelp, "mouseout", function(){
				popup.hide();
			});
		},
		setAlertOptionsValue : function(stateful){
			var me = this;
			var alertOptionsType = stateful.get("template");
			switch (alertOptionsType){
			case 'CALL_BACK_DUE': //Call back due
				me.callBackDue.set("checked",true);
				break;
			case 'NEW_OPPORTUNITY':
				me.newOpportunity.set("checked",true);
				break;
			case 'OPPORTUNITY_NEEDS_UPDATING':
				me.opportunityNeedsUpdating.set("checked",true);
				break;
			case 'ORDER_BOOKED':
				me.orderBooked.set("checked",true);
				break;
			case 'CUSTOMER_EMAIL_NEEDS_TO_BE_UPDATED':
				me.customerEmailNeedsToBeUpdated.set("checked",true);
				break;
			default:
				break;
			}
		},
		setSelectValue: function(listItems,key){
			var arr_content = user.setSelectValue(listItems,key);
			this.operatorSelect.setData(arr_content);
		}
	});

});