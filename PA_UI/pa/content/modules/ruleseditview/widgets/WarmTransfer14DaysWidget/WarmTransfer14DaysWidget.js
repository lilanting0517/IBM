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
    "dijit/form/NumberTextBox"
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox) {

    return declare("WarmTransfer14DaysWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString : template,
        constructor: function(){},
        startup: function(){
            this._eventsBind();
        },
        _eventsBind: function(){
            var me = this;
            var stateful = this.modelInstance;
            var fields = stateful.get("fields");
            var periodType = fields[0].value;
            
            me.PeriodTextBox.setValue(periodType);
            on(this["PeriodTextBox"], 'change', function(){
                fields[0].value = this.getValue();
                stateful.set("fields", fields);
            });
            stateful.watch("fields", function(){
                var periodType = fields[0].value;
                me.PeriodTextBox.setValue(periodType);
            });
        }
    });

});