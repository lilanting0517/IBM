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
  "dijit/form/CheckBox",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  'app/services/ConsoleService'
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, CheckBox, CustomSelector, user,ConsoleService) {

	return declare("OpptyStageChangeWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
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
			var amountValueType = fields[0].value2;
			var stageSelectValue = fields[0].value;
			var listItems = [{'label': 'more than or exactly','value': 'IS_GREATER_OR_EQUAL'},{'label': 'less than or exactly','value': 'IS_LESS_OR_EQUAL'}];
			// Native
			
//			me.operatorSelect.changeLabel(operatorType);
			me.setSelectValue(listItems, operatorType);
			me.operatorSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[0].operator = me.operatorSelect.getValue();
				stateful.set("fields", fields);
			}));
			
			me.setStageSelectValue(stageSelectValue);
			on(this["opptySelect"], 'click', function(){
				var opptySelect="";
				for(var i = 0; i<this.elements.length; i++) {
					if(this.elements[i].checked){
						opptySelect += this.elements[i].value+",";
					}
				}
				opptySelect = opptySelect.substring(0,opptySelect.length-1);
				fields[0].value = opptySelect;
				stateful.set("fields", fields);
			});
			
			me.amountTextBox.setValue(amountValueType);
			on(this["amountTextBox"], 'change', function(){
				fields[0].value2 = this.getValue();
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
				var operatorType = fields[0].operator;
				me.setSelectValue(listItems, operatorType);
//				var operatorType = fields[0].operator;
//				me.operatorSelect.selectLabel = operatorType;
				var stageSelectValue = fields[0].value;
				me.setStageSelectValue(stageSelectValue);
				var amountValueType = fields[0].value2;
				me.amountTextBox.setValue(amountValueType);
			});
		},
		setStageSelectValue : function(stageSelectValue){
			var me = this;
			var checkboxElements = me.opptySelect.elements;
			for(var i = 0; i<checkboxElements.length; i++) {
				dijit.byId(checkboxElements[i].id).set("checked",false);
			}
			var stageContent = stageSelectValue.split(",");
			for(var i = 0; i<stageContent.length; i++) {
				switch (stageContent[i]){
				case 'S01':
					me.S01.set("checked",true);
					break;
				case 'S02':
					me.S02.set("checked",true);
					break;
				case 'S03':
					me.S03.set("checked",true);
					break;
				case 'S04':
					me.S04.set("checked",true);
					break;
				case 'S05':
					me.S05.set("checked",true);
					break;
				case 'S06':
					me.S06.set("checked",true);
					break;
				default:
					break;
				}
			}
		},
		setSelectValue: function(listItems,key){
			var arr_content = user.setSelectValue(listItems,key);
			this.operatorSelect.setData(arr_content);
		}
		

	});

});