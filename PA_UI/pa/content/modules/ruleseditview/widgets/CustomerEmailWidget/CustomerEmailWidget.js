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

	return declare("CustomerEmailWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
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
//			me.setSelectValue(listItems,operatorType);
//			me.operatorSelect.addListener("CHANGE", lang.hitch(me,function(evt){
//				fields[0].operator = me.operatorSelect.getValue();
//				stateful.set("fields", fields);
//			}));
//			me.amountTextBox.setValue(amountValueType);
//			on(this["amountTextBox"], 'change', function(){
//				fields[0].value = this.getValue();
//				stateful.set("fields", fields);
//			});
//			stateful.watch("fields", function(){
//				var operatorType = fields[0].operator;
//				me.setSelectValue(listItems,operatorType);
//				var amountValueType = fields[0].value;
//				me.amountTextBox.setValue(amountValueType);
//			});
			
//			var popup;
//			on(me.customerEmailNeedsToBeUpdatedHelp, "mouseover", function(){
//				popup = new helpTip();
//				popup.setContent('Customer email needs to be updated');
//				popup.show(this);
//			});
//			on(me.customerEmailNeedsToBeUpdatedHelp, "mouseout", function(){
//				popup.hide();
//			});
		},
//		setSelectValue: function(listItems,key){
//			var arr_content = user.setSelectValue(listItems,key);
//			this.operatorSelect.setData(arr_content);
//		}
	});

});