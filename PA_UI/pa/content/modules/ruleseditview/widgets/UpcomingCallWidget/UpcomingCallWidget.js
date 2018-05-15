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
    "dijit/form/NumberTextBox",
    "dijit/form/CheckBox"
], function(parser, declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, CheckBox) {

    return declare("UpcomingCallWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
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
                    "value": "",
                    "value2": "",
                    "period": "DAY"
                }];
            }
            var fields = stateful.get("fields");
            var periodType = fields[0].value;
            
            // Native);
            me.setPeriodTypeValue(periodType);
            on(this["periodType"], 'click', function(){
                var periodType="";
                for(var i = 0; i<this.elements.length; i++) {
                    if(this.elements[i].checked){
                    	periodType += this.elements[i].value+",";
                    }
                }
                periodType = periodType.substring(0,periodType.length-1);
                fields[0].value = periodType;
                stateful.set("fields", fields);
            });
            stateful.watch("fields", function(){
                var periodType = fields[0].value;
                me.setPeriodTypeValue(periodType);
            });
        },
        setPeriodTypeValue : function(periodType){
            var me = this;
            var checkboxElements = me.periodType.elements;
            for(var i = 0; i<checkboxElements.length; i++) {
                dijit.byId(checkboxElements[i].id).set("checked",false);
            }
            var periodType = periodType.split(",");
            for(var i = 0; i<periodType.length; i++) {
                switch (periodType[i]){
                case '1':
                    me.ONE.set("checked",true);
                    break;
                case '2':
                    me.TWO.set("checked",true);
                    break;
                case '3':
                    me.THREE.set("checked",true);
                    break;
                case '4':
                    me.FOUR.set("checked",true);
                    break;
                case '5':
                    me.FIVE.set("checked",true);
                    break;
                default:
                    break;
                }
            }
        }
    });
});