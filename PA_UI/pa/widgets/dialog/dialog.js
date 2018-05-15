define([ 'dojo/_base/declare', 'dijit/_WidgetBase', 'dijit/_TemplatedMixin',
        "dojo/text!./template/template.html", "dijit/Dialog", "dojo/query",
        "dojo/on", "dijit/focus", "dijit/Tooltip", "dijit/TooltipDialog",
        "dijit/popup", "dojo/_base/lang", "dojo/dom-construct", "dojo/fx", "pa/bmodels/userModel", "dojo/dom-class"],
        function(declare, _WidgetBase, _TemplatedMixin, template, Dialog,
                query, on, focusUtil, Tooltip, TooltipDialog, popup, lang,
                domConstruct, fx, user, domClass) {

            var widget = declare([ _WidgetBase, _TemplatedMixin ], {
                templateString : template,
                constructor : function(_params) {
                    lang.mixin(this, _params);
                },
                postCreate : function() {
                    this.inherited(arguments);
                    var me = this;
                    me.createTip();
                },

                anmin : function(_flag, _done) {
                    var _super = this;
                    var _func = !_flag ? fx.wipeIn : fx.wipeOut;
                    _func({
                        node : _super.tip.domNode.id,
                        duration : 300
                    }).play();
                    // important
                    this.collapseStatus = _flag;

                    setTimeout(function() {
                        _super.enableClickStatus = true;
                        //_done && _done();
                        if(_done){
                            _done();
                        }
                    }, 300);
                },

                createTip : function() {
                    var me = this;
                    var templateString = me.templateString;
                    
                    if (me.tip){
                        return;
                    }
                    me.tip = new TooltipDialog({
                        content : templateString
                    });

                    //var domNode = me.tip.domNode;
                },
                show : function(container, conToMask, titleContent, yesFunc, noFunc, hiddenButton) {
                    var me = this;
                    var noBtn = me.tip.domNode.querySelector('.noBtn');
                    var yesBtn = me.tip.domNode.querySelector('.yesBtn');
                    var closeBtn = me.tip.domNode.querySelector('.closeBtn');
                    me.tip.domNode.querySelector('.pa_popup_title').innerHTML = titleContent;
                    if(this.noHandler){
                        this.noHandler.remove();
                    }
                    if(this.yesHandler){
                        this.yesHandler.remove();
                    }
                    if(this.yesFuncHandler){
                        this.yesFuncHandler.remove();
                    }
                    if(this.closeHandler){
                        this.closeHandler.remove();
                    }
                    this.yesHandler = on(yesBtn, 'click', function(){
                        me.hide();
                    });
                    this.yesFuncHandler = on(yesBtn, 'click', yesFunc);
                    this.noHandler = on(noBtn, 'click', function(){
                        me.hide();
                    });
                    if(noFunc){
                        this.noHandler = on(noBtn, 'click', noFunc);
                    }
                    this.closeHandler = on(closeBtn, 'click', function(){
                        me.hide();
                    });
                    if(hiddenButton){
                        domClass.add(yesBtn, 'hidden');
                        domClass.add(noBtn, 'hidden');
                    }else{
                        domClass.remove(yesBtn, 'hidden');
                        domClass.remove(noBtn, 'hidden');
                    }
                    var mask = this.mask = domConstruct.create("div", {
                        style : {
                            opacity : 0.5,
                            display : 'block',
                            zIndex : 100,
                            position : 'absolute',
                            top : 0,
                            left : 0,
                            width : "100%",
                            height : "100%",
                            background : "#333"
                        },
                        className : 'mbox'
                    });
                    
                    conToMask.appendChild(mask);
                    this.conToMask = conToMask;
                    // delete V
                    var tip = me.tip;
                    if (tip.connectorNode) {
                        domConstruct.destroy(tip.connectorNode);
                    }

                    // me.anmin(false);

                    popup.open({
                        popup : me.tip,
                        around : container,
                        orient : [ 'above-centered' ]
                    });
                    if(titleContent == "Are you sure you want to clear all visible alerts?"){
                        noBtn.innerHTML = "CANCEL";
                        domClass.add(me.tip.domNode.parentNode, 'pa_popuptop_clear_all');
                        domClass.add(me.tip.domNode.querySelector('.pa_container'),"pa_popup_clear_all");
                        domClass.remove(me.tip.domNode.querySelector('.pa_container'),"pa_dialog");
                        domClass.remove(me.tip.domNode.querySelector('.pa_container'),"pa_popup");
                    }else{
                        noBtn.innerHTML = "NO";
                        domClass.add(me.tip.domNode.parentNode, 'pa_popuptop');
                    }
                    focusUtil.focus(me.tip.domNode);
                },
                hide : function() {
                    var me = this;
                    // me.anmin(true, function(){
                    this.conToMask.removeChild(this.mask);
                    if(domClass.contains(me.tip.domNode.querySelector('.pa_container'),"pa_popup_clear_all")){
                        domClass.remove(me.tip.domNode.parentNode, 'pa_popuptop_clear_all');
                        domClass.remove(me.tip.domNode.querySelector('.pa_container'),"pa_popup_clear_all");
                        domClass.add(me.tip.domNode.querySelector('.pa_container'),"pa_dialog");
                        domClass.add(me.tip.domNode.querySelector('.pa_container'),"pa_popup");
                    }else{
                        domClass.remove(me.tip.domNode.parentNode, 'pa_popuptop');
                    }
                    popup.close(this.tip);
                    // });
                }
            });

            return widget;
        });