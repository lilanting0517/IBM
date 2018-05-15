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
  "dijit/form/TextBox",
  "dijit/form/MultiSelect",
  "dijit/form/ValidationTextBox",
  "dijit/form/NumberTextBox",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  "pa/widgets/helpTip"
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, TextBox, MultiSelect, ValidationTextBox, NumberTextBox, CustomSelector, user,helpTip) {

	return declare("RepPageVisitsWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
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
			var visitsTimesType = fields[0].value;
			var periodType = fields[0].value2;
			var periodSelect = fields[0].period;
			var listItems1 = [{'label': 'exactly','value': 'IS_EQUAL'},{'label': 'more than','value': 'IS_GREATER_THAN'},{'label': 'less than','value': 'IS_LESS_THAN'}];
			var listItems2 = [{'label': 'day(s)','value': 'DAY'},{'label': 'week(s)','value': 'WEEK'},{'label': 'month(s)','value': 'MONTH'}];
			
			// Native
			me.setSelectValue1(listItems1, operatorType);
//			me.operatorForVisit.changeLabel(operatorType);
			me.operatorForVisit.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[0].operator = me.operatorForVisit.getValue();
				stateful.set("fields", fields);
			}));
			me.setSelectValue2(listItems2, periodSelect);
//			me.periodSelect.changeLabel(periodSelect);
			me.periodSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[0].period = me.periodSelect.getValue();
				stateful.set("fields", fields);
			}));
			
			me.visitsTimes.setValue(visitsTimesType);
			on(this["visitsTimes"], 'change', function(){
				fields[0].value = this.getValue();
				stateful.set("fields", fields);
			});
			me.PeriodText.setValue(periodType);
			on(this["PeriodText"], 'change', function(){
				fields[0].value2 = this.getValue();
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
				var operatorType = fields[0].operator;
				me.operatorForVisit.selectLabel = operatorType;
				var periodSelect = fields[0].period;
				me.periodSelect.value = periodSelect;
				var visitsTimesType = fields[0].value;
				me.visitsTimes.setValue(visitsTimesType);
				var periodType = fields[0].value2;
				me.PeriodText.setValue(periodType);
			});
			
			var popup;
			on(me.ppvHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('This is the frequency and timeframe a customer visits the page');
				popup.show(this);
			});
			on(me.ppvHelp, "mouseout", function(){
				popup.hide();
			});
		},
		setSelectValue1: function(listItems,key){
			var arr_content = user.setSelectValue(listItems,key);
			this.operatorForVisit.setData(arr_content);
		},
		setSelectValue2: function(listItems,key){
			var arr_content = user.setSelectValue(listItems,key);
			this.periodSelect.setData(arr_content);
		}
	});

});