define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojox/collections/Dictionary',
    '../ruleModel',
    '../alertModel'
], function(declare, array, Dictionary, RuleModel, AlertModel){
    return declare('pa.dictionaryList', [Dictionary], {
        reset: function(arr){
            var me = this;
            var type = this.type;
            
            this.clear();
            array.forEach(arr, function(item){
                var id = item.id;
                if(type == 'alert'){
                    var newAlert = new AlertModel();
                    newAlert.set(item);
                    me.add(id, newAlert);
                }else{
                    var template = item.template || '';
                    var thisRule = new RuleModel(template);
                    thisRule.set(item);
                    me.add(id, thisRule);
                }
            });
        },
        set: function(name, value){
            this[name] = value;
        },
        get: function(id){
            return this.item(id);
        }
    });
});