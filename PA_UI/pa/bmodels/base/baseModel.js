define([
    'dojo/_base/declare',
    'dojo/Stateful',
    'dojo/_base/lang'
],function(declare, stateful, lang){
    return declare('pa_baseModel', [stateful], {
        set: function(){
            this.inherited(arguments);
        },
        toJSON: function(){
            return lang.mixin({}, this);
        },
        setFormValue:function (control, data) {
            var formateData = null;
            if (data != null) {
                if (control instanceof dijit.form.TimeTextBox) {
                    formateData = dojo.date.locale.parse(data, {
                        timePattern:'hh:mma',
                        selector:'time',
                        locale:'en-us'
                    });
                    control.attr('value', formateData);
                } else if (control instanceof dijit.form.DateTextBox) {
                    formateData= dojo.date.locale.parse(data, {
                        datePattern:"MM/dd/yy",
                        selector:"date"
                    });
                    control.attr('value', formateData);
                }
            }
        },
        setSelectValue:function (listItems, key) {
            var selectedItem = null;
            for(var i = 0; i < listItems.length; i++){
                if(listItems[i].value == key){
                    selectedItem = listItems[i];
                }
            }
            if(selectedItem == null){
                selectedItem = listItems[0];
            }
            var arr_content = {
                defaultItem : selectedItem,
                listItems: listItems
            }; 
            return arr_content;
        }
    });
});