define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./template/customselector_template.html',
    'dojo/dom-style', 
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/mouse',
    'dojo/query',
    'dijit/focus',
    'dojo/_base/array',
    'comlib/event/CustomEvent'
], function (declare, _WidgetBase, _TemplatedMixin,template, domStyle,domConstruct, domClass,lang,on,mouse,query,focusUtil,array,CustomEvent) {
    var widget = declare("custom_selector",[_WidgetBase, _TemplatedMixin,CustomEvent], {
        baseClass:'custom_selector',
        templateString: template,
        selectValue:'',
        currentLabel:'',
        selectLabel:'',
        data:null,
        postCreate: function(){
            // Run any parent postCreate processes - can be done at any point
            this.inherited(arguments);
            
            var me = this;
            var scroll = function(e){
                e.stopPropagation();
            };
            
            focusUtil.on('widget-blur', function() {
                me.closeSelector();
            }); 
            on(this.selectedValue, 'click', function(e){
                me.openSelector();
            });
            on(this.openValue, 'click', function(e){
                me.openSelector();
            });
            on(this.menuList, mouse.leave,function(){
                me.closeSelector();
            });
            on(this.menuList, 'mousedown', scroll);
            on(this.menuList, 'mousemove', scroll);
            on(this.menuList, 'mouseup', scroll);
            on(this.menuList, 'wheel', scroll);
            on(this.menuList, 'mousewheel', scroll);
            on(this.menuList, 'DOMMouseScroll', scroll);
            if(me.data != null){
                me.setData(me.data);
            }
        },
        setData:function(data){
            var me = this;
            me.selectedValue.innerHTML = data.defaultItem.label;
            me.selectedValue.setAttribute('value',data.defaultItem.value);
            
            domConstruct.empty(me.menuList);
            
            array.forEach(data.listItems,function(item){
                domConstruct.place("<li value='"+item.value+"'><p>"+item.label+"</p></li>", me.menuList);
            });
            
            query("ul li", me.domNode).on("click", function(node) {
                me.selectedValue.innerHTML = node.currentTarget.innerHTML;
                var _value = node.currentTarget.getAttribute('value');
                me.selectedValue.setAttribute('value',_value);
                me.currentLabel = node.currentTarget.innerHTML;

                if(_value != me.selectLabel){
                    me.changeLabel(_value);
                }
                
                me.closeSelector();
            });
        },
        changeLabel:function(value){
            var me = this;
            me.selectLabel = value;
            me.trigger("CHANGE",me);
        },
        getLabel:function(){
            var me = this;
            return me.currentLabel;
        },
        getValue:function(){
            var me = this;
            return me.selectLabel;
        },
        openSelector:function() {
            var me = this;
            if (domStyle.get(me.menuList, "display") == 'none') {
                domStyle.set(me.menuList, "display", "block");
                domStyle.set(me.domNode, "z-index", "20000");
            } else {
                domStyle.set(me.menuList, "display", "none");
                domStyle.set(me.domNode, "z-index", "2000");
            }
        }, 
        closeSelector:function() {
            var me = this;
            domStyle.set(me.menuList, "display", "none");
            domStyle.set(me.domNode, "z-index", "2000");
        },
        setDisable:function(_boolean){
            var me = this;
            me.disable = _boolean;
            if(_boolean){
                domClass.toggle(me.selectedValue, "disable");
            }
        },
        startup : function() {
            this.inherited(arguments);
        }

    });
    
    return widget;
});
