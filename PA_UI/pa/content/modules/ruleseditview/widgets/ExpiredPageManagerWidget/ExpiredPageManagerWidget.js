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

    return declare("ExpiredPageManagerWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
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
            var contentType = fields[0].value2;
            var periodType = fields[0].value;
            
            // Native
            me.setContentTypeValue(contentType);
            on(this["contentType"], 'click', function(){
                var typeContent="";
                for(var i = 0; i<this.elements.length; i++) {
                    if(this.elements[i].checked){
                        typeContent += this.elements[i].value+",";
                    }
                }
                typeContent = typeContent.substring(0,typeContent.length-1);
                fields[0].value2 = typeContent;
                stateful.set("fields", fields);
            });
            stateful.watch("fields", function(){
                var contentType = fields[0].value2;
                me.setContentTypeValue(contentType);
            });
            
            me.PeriodTextBox.setValue(periodType);
            on(this["PeriodTextBox"], 'change', function(){
                fields[0].value = this.getValue();
                stateful.set("fields", fields);
            });
            stateful.watch("fields", function(){
                var periodType = fields[0].value;
                me.PeriodTextBox.setValue(periodType)
            });
        },
        setContentTypeValue : function(contentType){
            var me = this;
            var checkboxElements = me.contentType.elements;
            for(var i = 0; i<checkboxElements.length; i++) {
                dijit.byId(checkboxElements[i].id).set("checked",false);
            }
            var typeContent = contentType.split(",");
            for(var i = 0; i<typeContent.length; i++) {
                switch (typeContent[i]){
                case 'EVENT':
                    me.EVENT.set("checked",true);
                    break;
                case 'LINKED_LIST':
                    me.LINKED_LIST.set("checked",true);
                    break;
                case 'MESSAGE':
                    me.MESSAGE.set("checked",true);
                    break;
                case 'VIDEO':
                    me.VIDEO.set("checked",true);
                    break;
                default:
                    break;
                }
            }
        }
    });
});