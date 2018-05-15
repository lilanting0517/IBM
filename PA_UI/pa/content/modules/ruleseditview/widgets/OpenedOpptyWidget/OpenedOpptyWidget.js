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

	return declare("OpenedOpptyWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,
		status:'',
		constructor: function(){},
		startup: function(){
			this._eventsBind();
		},
		_eventsBind: function(){
			var me = this;
			var stateful = this.modelInstance;
			
			var fields = stateful.get("fields");
			var contentType = fields[0].value2;
			var operatorType = fields[0].operator;
			var amountValueType = fields[0].value;
			var listItems = [{'label': 'more than or exactly','value': 'IS_GREATER_OR_EQUAL'},{'label': 'less than or exactly','value': 'IS_LESS_OR_EQUAL'}];
			// Native
			//102389
			//me.setContentTypeValue(contentType);
			if(this.status =='create'){
			var ccRoleId = ConsoleService.getCurrentUser().getDmmsSellerInfo().ccRoleId;
			if(ccRoleId == 107){
				me.CLIENT.set("checked",true);
			}else{
				 fields[0].value2 = "OPPTY_TEAM";
				 me.OPPTY_TEAM.set("checked",true);
			}
			}else{
				me.setContentTypeValue(contentType);
			}
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
			me.setSelectValue(listItems,operatorType);
			me.operatorSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[0].operator = me.operatorSelect.getValue();
				stateful.set("fields", fields);
			}));
			
			me.amountTextBox.setValue(amountValueType);
			on(this["amountTextBox"], 'change', function(){
				fields[0].value = this.getValue();
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
				var operatorType = fields[0].operator;
				me.setSelectValue(listItems,operatorType);
				var amountValueType = fields[0].value;
				me.amountTextBox.setValue(amountValueType);
			});
		},
		setSelectValue: function(listItems,key){
			var arr_content = user.setSelectValue(listItems,key);
			this.operatorSelect.setData(arr_content);
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
                    case 'OPPTY_TEAM':
                        me.OPPTY_TEAM.set("checked",true);
                        break;
                    case 'CLIENT':
                        me.CLIENT.set("checked",true);
                        break;
                    default:
                        break;
                    }
                }
            
	}   
	});

});