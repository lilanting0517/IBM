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

	return declare("WarmTransferNeededWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		constructor: function(){},
		startup: function(){
			this._eventsBind();
		},
		_eventsBind: function(){
			var me = this;
			var stateful = this.modelInstance;
			var fields = stateful.get("fields");
			var contentType = fields[0].value;
			var stageSelectValue = fields[0].value2;
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
                fields[0].value = typeContent;
                stateful.set("fields", fields);
            });
            stateful.watch("fields", function(){
                var contentType = fields[0].value;
                me.setContentTypeValue(contentType);
            });
            
            me.setStageValue(stageSelectValue);
			on(this["stageSelect"], 'click', function(){
				var stageContent="";
				for(var i = 0; i<this.elements.length; i++) {
					if(this.elements[i].checked){
						stageContent += this.elements[i].value+",";
					}
				}
				stageContent = stageContent.substring(0,stageContent.length-1);
				fields[0].value2 = stageContent;
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
				var stageSelectValue = fields[0].value2;
				me.setStageValue(stageSelectValue);
				
			});
			
		},
		
		setStageValue : function(stageSelectValue){
			var me = this;
			var checkboxElements = me.stageSelect.elements;
			for(var i = 0; i<checkboxElements.length; i++) {
				dijit.byId(checkboxElements[i].id).set("checked",false);
			}
			if (stageSelectValue != null){
				var stageContent = stageSelectValue.split(",");
				for(var i = 0; i<stageContent.length; i++) {
					switch (stageContent[i]){
					case 'S04':
						me.S04.set("checked",true);
						break;
					case 'S05':
						me.S05.set("checked",true);
						break;
					default:
						break;
					}
				}
			}
			
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
                    case 'OI':
                        me.OI.set("checked",true);
                        break;
                    case 'OO':
                        me.OO.set("checked",true);
                        break;
                    case 'LIO':
                        me.LIO.set("checked",true);
                        break;
                    default:
                        break;
                    }
                }
            
	}   
	});

});