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
  "dojo/dom-class",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  "pa/widgets/helpTip"
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, domClass, CustomSelector, user,helpTip) {

	return declare("RepPageCondition", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		conditionNum : 0,
		stateful: null,
		constructor: function(args){
			this.conditionNum = args.conditionNum;
			this.stateful = args.stateful;
			this.ruleList = args.ruleList;
		},
		startup: function(){
			if(this.conditionNum > 0){
				domClass.toggle(this.fieldName, "hidden");
				domClass.toggle(this.andOr.domNode, "hidden");
//				this.ppsHelp.style.display = "none";
				//domClass.toggle(this.ppsHelp, "hidden");
			}
			this._eventsBind();
			
		},
		_eventsBind: function(){
			var me = this;
			var fields = me.stateful.get("fields");
			var operatorType = fields[me.conditionNum].operator;
			var containValue = fields[me.conditionNum].value;
			var periodValue = fields[me.conditionNum].period;
			var ruleValue = fields[me.conditionNum].ruleid;
			var listItems = me.ruleList;
			var listItemsAndOr = [{'label': 'and','value': 'AND'},{'label': 'or','value': 'OR'}];
			var listItemsTime = [{'label': 'day(s)','value': 'DAY'},{'label': 'week(s)','value': 'WEEK'},{'label': 'month(s)','value': 'MONTH'}];
			var listItemstrigger = [{'label': 'triggered','value': 'TRIGGER'},{'label': 'not triggered','value': 'NOT_TRIGGER'}];
			
			if(this.conditionNum > 0){
				var junctionValue = fields[me.conditionNum].junction;
				me.andOr.changeLabel(junctionValue);
				//me.setSelectValue(me.andOr, listItemsAndOr, junctionValue);
				me.andOr.addListener("CHANGE", lang.hitch(me,function(evt){
					fields[me.conditionNum].junction = me.andOr.getValue();
					me.stateful.set("fields", fields);
				}));
				me.stateful.watch("fields", function(){
					var junctionValue = fields[me.conditionNum].junction;
					me.setSelectValue(me.andOr, listItemsAndOr, junctionValue);
				});
			}
			if(ruleValue == ''){
				me.setSelectValue(me.ruleSelect, listItems, listItems[0]);
				fields[me.conditionNum].ruleid = listItems[0].value;
			}else{
				me.setSelectValue(me.ruleSelect, listItems, ruleValue);
			}
			me.ruleSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[me.conditionNum].ruleid = me.ruleSelect.getValue();
				me.stateful.set("fields", fields);
			}));
			me.setSelectValue(me.triggerSelect, listItemstrigger, operatorType);
			me.triggerSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[me.conditionNum].operator = me.triggerSelect.getValue();
				me.stateful.set("fields", fields);
			}));
			me.setSelectValue(me.periodSelect, listItemsTime, periodValue);
			me.periodSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[me.conditionNum].period = me.periodSelect.getValue();
				me.stateful.set("fields", fields);
			}));
			me.PeriodText.setValue(containValue);
			on(this["PeriodText"], 'change', function(){
				fields[me.conditionNum].value = this.getValue();
				me.stateful.set("fields", fields);
			});
			me.stateful.watch("fields", function(){
				var operatorType = fields[me.conditionNum].operator;
				me.setSelectValue(me.triggerSelect, listItemstrigger, operatorType);
				var containValue = fields[me.conditionNum].value;
				me.PeriodText.setValue(containValue);
				var periodValue = fields[me.conditionNum].period;
				me.setSelectValue(me.periodSelect, listItemsTime, periodValue);
				var ruleValue = fields[me.conditionNum].ruleid;
				me.setSelectValue(me.ruleSelect, listItems, ruleValue);
			});
			
//			var popup;
//			on(me.ppsHelp, "mouseover", function(){
//				popup = new helpTip();
//				popup.setContent('Any distinctive part of a Rep Page URL visited by a Client.<br>For instance, for a URL - www.ibm.com/connect/ibm/us<br>/en/resources/andrew.html, the value may be the complete<br>URL, the string \'andrew.html\' or, even just \'andrew\'.');
//				popup.show(this);
//			});
//			on(me.ppsHelp, "mouseout", function(){
//				popup.hide();
//			});
		},
		setSelectValue: function(object, listItems, key){
			var arr_content = user.setSelectValue(listItems,key);
			object.setData(arr_content);
		}

	});

});