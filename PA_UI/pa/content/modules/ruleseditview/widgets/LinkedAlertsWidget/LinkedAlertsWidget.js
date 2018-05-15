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
  "../LinkedAlertsWidget/widget/Condition",
  "pa/bmodels/userModel",
  "dojo/_base/array",
  "pa/widgets/marklayer/marklayer"
], function(parser, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, TextBox, MultiSelect, ValidationTextBox, Condition, user,array, marklayer) {

	return declare("LinkedAlertsWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		conditionNum: 0,
		stateful:null,
		ruleList:[],
		constructor: function(){},
		startup: function(){
			var me = this;
			this.stateful = this.modelInstance;
			//marklayer.show();
			this.modelInstance.getRuleSelect(user,this.stateful.template).then(function(data){
				me.ruleList = [];
				var _arr = data.paresponse.rules;
				array.forEach(_arr, function(data, index){
					me.ruleList.push({'label':data.value,'value': data.key});
				});
			}).then(function(data){
				var fields = me.stateful.get("fields");
				for(var i=0; i<fields.length; i++){
					me.addCondition(i);
					me.scrollViewRules._refresh();
				}
				me.conditionNum= i-1;
				on(me["addAnotherCondition"], 'click', function(){
					var addField = {
							"ruleid":"",
							"operator":"TRIGGER",
							"period":"DAY",
							"value":"",
							"junction":"AND"
						}
					me.stateful.get("fields").push(addField);
					me.conditionNum++;
					me.addCondition(me.conditionNum);
					me.scrollViewRules._refresh();
				});
			});
		},
		addCondition: function(num){
			var newCondition = new Condition({
	            conditionNum : num,
	            stateful : this.stateful,
	            ruleList :this.ruleList,
	        }).placeAt(this.conditions);
			newCondition.startup();
		}

	});

});