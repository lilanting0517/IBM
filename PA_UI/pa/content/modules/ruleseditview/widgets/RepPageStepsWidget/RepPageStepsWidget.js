define([
  "dojo/parser",
  "dojo/_base/declare",
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
  "../RepPageStepsWidget/widget/Condition"
], function(parser, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, TextBox, MultiSelect, ValidationTextBox, Condition) {

	return declare("RepPageStepsWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		conditionNum: 0,
		stateful:null,
		constructor: function(){},
		startup: function(){
			var me = this;
			this.stateful = this.modelInstance;
			var fields = this.stateful.get("fields");
			for(var i=0; i<fields.length; i++){
				me.addCondition(i);
			}
			me.conditionNum= i-1;
			on(this["addAnotherCondition"], 'click', function(){
				var addField = {
					"operator":"INCLUDES",
					"value":"",
					"junction": "AND"
					}
				me.stateful.get("fields").push(addField);
				me.conditionNum++;
				me.addCondition(me.conditionNum);
				me.scrollViewRules._refresh();
			});
		},
		addCondition: function(num){
			var newCondition = new Condition({
	            conditionNum : num,
	            stateful : this.stateful
	        }).placeAt(this.conditions);
			newCondition.startup();
		}

	});

});