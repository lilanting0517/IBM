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
  "dojo/dom-class",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  "pa/widgets/helpTip"
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, TextBox, domClass, CustomSelector, user,helpTip) {

	return declare("RepPageCondition", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		conditionNum : 0,
		stateful: null,
		constructor: function(args){
			this.conditionNum = args.conditionNum;
			this.stateful = args.stateful;
		},
		startup: function(){
			if(this.conditionNum > 0){
				domClass.toggle(this.fieldName, "hidden");
				domClass.toggle(this.andOr.domNode, "hidden");
				//domClass.remove(this.andOr.domNode, 'hidden')
			}
			this._eventsBind();
			
		},
		_eventsBind: function(){
			var me = this;
			var fields = me.stateful.get("fields");
			var operatorType = fields[me.conditionNum].operator;
			var containValue = fields[me.conditionNum].value;
			var listItems = [{'label': 'includes','value': 'INCLUDES'},{'label': 'does not include','value': 'DOES_NOT_INCLUDE'}];
			var listItemsAndOr = [{'label': 'and','value': 'AND'},{'label': 'or','value': 'OR'}];
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
					//me.andOr.selectLabel = junctionValue;
					me.setSelectValue(me.andOr, listItemsAndOr, junctionValue);
				});
			}
			// Native
			//me.setSelectValue(me.operatorForRep, listItems, operatorType);
			me.operatorForRep.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[me.conditionNum].operator = me.operatorForRep.getValue();
				me.stateful.set("fields", fields);
			}));
			me.operatorValue.setValue(containValue);
			on(this["operatorValue"], 'change', function(){
				fields[me.conditionNum].value = this.getValue();
				me.stateful.set("fields", fields);
			});
			me.stateful.watch("fields", function(){
				var operatorType = fields[me.conditionNum].operator;
				me.setSelectValue(me.operatorForRep, listItems, operatorType);
				var containValue = fields[me.conditionNum].value;
				me.operatorValue.setValue(containValue);
			});
		},
		setSelectValue: function(object, listItems, key){
			var arr_content = user.setSelectValue(listItems,key);
			object.setData(arr_content);
		}

	});

});