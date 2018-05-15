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

	return declare("ExpiryAuthorizationSocialWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		constructor: function(){},
		startup: function(){
			this._eventsBind();
		},
		_eventsBind: function(){
			var me = this;
			var stateful = this.modelInstance;
			
			var fields = stateful.get("fields");
			var linkType = fields[0].value;
			var periodType = fields[0].value2;
			
			// Native
			me.setLinkTypeValue(linkType);
			on(this["linkType"], 'click', function(){
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
				var linkType = fields[0].value;
				me.setLinkTypeValue(linkType);
			});
			
			me.PeriodTextBox.setValue(periodType);
			on(this["PeriodTextBox"], 'change', function(){
				fields[0].value2 = this.getValue();
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
				var periodType = fields[0].value2;
				me.PeriodTextBox.setValue(periodType);
			});
		},
		setLinkTypeValue : function(linkType){
			var me = this;
			var checkboxElements = me.linkType.elements;
			for(var i = 0; i<checkboxElements.length; i++) {
				dijit.byId(checkboxElements[i].id).set("checked",false);
			}
			var typeContent = linkType.split(",");
			for(var i = 0; i<typeContent.length; i++) {
				switch (typeContent[i]){
				case 'LinkedIn':
					//me.LinkedIn.set("checked",true);
					break;
				case 'Google':
					me.Google.set("checked",true);
					break;
				case 'Facebook':
					me.Facebook.set("checked",true);
					break;
				case 'Weibo':
					me.Weibo.set("checked",true);
					break;
				case 'Xing':
					me.Xing.set("checked",true);
					break;
				case 'YouTube':
					me.YouTube.set("checked",true);
					break;
				default:
					break;
				}
			}
		}

	});

});