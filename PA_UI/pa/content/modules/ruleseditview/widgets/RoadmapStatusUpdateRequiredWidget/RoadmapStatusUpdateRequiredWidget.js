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
        "pa/bmodels/userModel",
        "dijit/form/CheckBox",
        'app/services/ConsoleService'
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, CustomSelector,user,CheckBox,ConsoleService) {

	return declare("RoadmapStatusUpdateRequiredWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		constructor: function(){},
		startup: function(){
			this._eventsBind();
		},
		_eventsBind: function(){
			var me = this;
			var stateful = this.modelInstance;
			
			var fields = stateful.get("fields");
			var contentType = fields[0].value2;
			// Native
			//102389
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
			
		},
		setContentTypeValue : function(contentType){
            var me = this;
            var checkboxElements = me.contentType.elements;
            for(var i = 0; i<checkboxElements.length; i++) {
                dijit.byId(checkboxElements[i].id).set("checked",false);
            }
            if(contentType==null){
              	 
                //me.CLIENT.set("checked",false);
           }else{
            var typeContent = contentType.split(",");
           
            for(var i = 0; i<typeContent.length; i++) {
                switch (typeContent[i]){
                    case 'OPPTY_TEAM':
                        me.OPPTY_TEAM.set("checked",true);
                        break;
                    case 'CLIENT':
                       // me.CLIENT.set("checked",true);
                        break;
                    default:
                        break;
                    }
                }
           }
            
	}   
	});

});