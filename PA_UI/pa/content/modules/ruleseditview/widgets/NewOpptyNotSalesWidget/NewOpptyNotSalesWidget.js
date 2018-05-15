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
  "pa/widgets/CustomSelector/CustomSelector",
  "dijit/form/CheckBox",
  "pa/bmodels/userModel"
  ], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, CustomSelector, CheckBox,user) {

    return declare("NewOpptyNotSalesWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString : template,
        constructor: function(){},
        startup: function(){
            this._eventsBind();
        },
        _eventsBind: function(){
            var me = this;
            var stateful = this.modelInstance;
            if(stateful.get("fields").length == 0){
                this.modelInstance.fields = [{
                    "operator": "IS_GREATER_OR_EQUAL",
                    "value": 0,
                    "name": "BP,IBM"
                }];
            }
            var fields = stateful.get("fields");
            var operatorType = fields[0].operator;
            var amountValueType = fields[0].value;
            var ownerSelectValue = fields[0].name;
            var listItems = [{'label': 'more than or exactly','value': 'IS_GREATER_OR_EQUAL'},{'label': 'less than or exactly','value': 'IS_LESS_OR_EQUAL'}];
            // Native
            me.setSelectValue(listItems,operatorType);
            me.operatorSelect.addListener("CHANGE", lang.hitch(me,function(evt){
                fields[0].operator = me.operatorSelect.getValue();
                stateful.set("fields", fields);
            }));
            if(ownerSelectValue == ''){
                ownerSelectValue = "BP,IBM";
                fields[0].name = ownerSelectValue;
                stateful.set("fields", fields);
            }
            me.setOwnerValue(ownerSelectValue);
            on(this["owner"], 'click', function(){
                var ownerContent="";
                for(var i = 0; i<this.elements.length; i++) {
                    if(this.elements[i].checked){
                        ownerContent += this.elements[i].value+",";
                    }
                }
                ownerContent = ownerContent.substring(0,ownerContent.length-1);
                fields[0].name = ownerContent;
                stateful.set("fields", fields);
            });
            
            me.amountTextBox.setValue(amountValueType);
            on(this["amountTextBox"], 'change', function(){
                fields[0].value = this.getValue();
                stateful.set("fields", fields);
            });
            stateful.watch("fields", function(){
                var operatorType = fields[0].operator;
                me.setSelectValue(listItems,operatorType);
                var ownerSelectValue = fields[0].name;
                me.setOwnerValue(ownerSelectValue);
                var amountValueType = fields[0].value;
                me.amountTextBox.setValue(amountValueType);
            });
        },
        setOwnerValue : function(ownerSelectValue){
            var me = this;
            var checkboxElements = me.owner.elements;
            for(var i = 0; i<checkboxElements.length; i++) {
                dijit.byId(checkboxElements[i].id).set("checked",false);
            }
            var ownerSelect = ownerSelectValue.split(",");
            for(var i = 0; i<ownerSelect.length; i++) {
                switch (ownerSelect[i]){
                case 'BP':
                    me.BP.set("checked",true);
                    break;
                case 'IBM':
                    me.IBM.set("checked",true);
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