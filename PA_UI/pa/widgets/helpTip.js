define([
    'dojo/_base/declare',
    'comlib/ui/CustomUIWidget',
    "dijit/TooltipDialog",
    "dijit/popup"
],function(declare, CustomUIWidget, TooltipDialog, popup) {
    var widget = declare([CustomUIWidget], {
        baseClass : '',
        templateString : '<div></div>',
        postCreate: function() {
    //        var domNode = this.domNode;
            this.inherited(arguments);
    
            var me = this;
    
            me.createTip();        
        },
    
        setContent: function(content){
            var me = this;
            if(!me.tip) {
                return;
            }
            me.tip.set('content', content);
        },
    
        createTip: function() {
            var me = this;
    
            if (me.tip){
                return;
            }
            me.tip = new TooltipDialog({
                content: me.domNode
            });
    
            //var domNode = me.tip.domNode;
        },
    
        show: function(container) {
            var me = this;
    
            popup.open({
                popup: me.tip,
                around: container,
                orient: ['above-centered']
            });
        },
        hide: function() {
            popup.close(this.tip);
            this.destroy();
        },
        _onFocus: function() {
            this.inherited(arguments);
        },
        _onBlur: function() {
            this.inherited(arguments);
        },
        startup: function() {
            this.inherited(arguments);
        }
    });
    return widget;
}); 