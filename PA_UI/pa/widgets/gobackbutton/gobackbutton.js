/*
 * every back button will go back to different page, so will re-define function goBackButton when use this button
 */
define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./template/template.html",
  'comlib/ui/CustomUIWidget',
  "dijit/Dialog",
  "dojo/query",
  "dojo/on",
  "dijit/focus",
  "dijit/Tooltip",
  "dijit/TooltipDialog",
  "dijit/popup",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/dom",
  "dojo/dom-class"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,template, CustomUIWidget, Dialog, query, on, focusUtil, Tooltip, TooltipDialog, popup, lang, domConstruct, dom, domClass) {

	var buttonClass = declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
    templateString: template,
    constructor: function(_temp) {
    },
    postCreate: function() {
    	this.inherited(arguments);
    	var me = this;
    	//domClass.add(this.icon_pause, 'hidden');
    	on(this.icon_return, "click", function(){
    		if(dom.byId("backButtonTip")){
    			var mc = dom.byId("module_pa");
                mc.removeChild(dom.byId("backButtonTip"));
    		}
    		me.goBackButton();
    	});
    	on(this.icon_return, "mouseover", function(evt){
            var clientX = evt.clientX - 55;
            var clientY = evt.clientY;
            clientX += "px";
            clientY += "px";
            domConstruct.create("div", { id:"backButtonTip", innerHTML: "&nbsp;Return&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "44px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_pa"));
        });
        on(this.icon_return, "mouseout", function(evt){
        	if(dom.byId("backButtonTip")){
	            var mc = dom.byId("module_pa");
	            mc.removeChild(dom.byId("backButtonTip"));
        	}
        });
    },
    goBackButton: function(){
    	
    }
  });
	var btnInstance = new buttonClass();
	 return btnInstance;

});