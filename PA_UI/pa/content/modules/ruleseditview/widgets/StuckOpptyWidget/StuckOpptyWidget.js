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
  //"dijit/form/Select",
  "dijit/form/NumberTextBox",
  "dijit/form/CheckBox",
  "pa/widgets/CustomSelector/CustomSelector",
  "pa/bmodels/userModel",
  "pa/widgets/helpTip",
  'app/services/ConsoleService'
], function(parser, declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, at, Stateful, NumberTextBox, CheckBox, CustomSelector, user, helpTip,ConsoleService) {

	return declare("StuckOpptyWidget", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
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
			var operatorType = fields[0].operator;
			var amountValueType = fields[0].value;
			var periodType = fields[0].value2;
			var stageSelectValue = fields[0].name;
			var contentType = fields[1].value;
			var listItems = [{'label': 'more than or exactly','value': 'IS_GREATER_OR_EQUAL'},{'label': 'less than or exactly','value': 'IS_LESS_OR_EQUAL'}]
			// Native
			if(this.status =='create'){
			   var ccRoleId = ConsoleService.getCurrentUser().getDmmsSellerInfo().ccRoleId;
			   if(ccRoleId == 107){
		    	  
				   me.CLIENT.set("checked",true);
			    
			   }else{

				   fields[1].value = "OPPTY_TEAM";
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
                   fields[1].value = typeContent;
                   stateful.set("fields", fields);
             });
			
            
//			me.operatorSelect.changeLabel(operatorType);
			me.setSelectValue(listItems, operatorType);
			me.operatorSelect.addListener("CHANGE", lang.hitch(me,function(evt){
				fields[0].operator = me.operatorSelect.getValue();
				stateful.set("fields", fields);
			}));
			
			me.setStageValue(stageSelectValue);
			on(this["stageSelect"], 'click', function(){
				var stageContent="";
				for(var i = 0; i<this.elements.length; i++) {
					if(this.elements[i].checked){
						stageContent += this.elements[i].value+",";
					}
				}
				stageContent = stageContent.substring(0,stageContent.length-1);
				fields[0].name = stageContent;
				stateful.set("fields", fields);
			});
			
			me.PeriodTextBox.setValue(periodType);
			on(this["PeriodTextBox"], 'change', function(){
				fields[0].value2 = this.getValue();
				stateful.set("fields", fields);
			});
			
			me.amountTextBox.setValue(amountValueType);
			on(this["amountTextBox"], 'change', function(){
				fields[0].value = this.getValue();
				stateful.set("fields", fields);
			});
			stateful.watch("fields", function(){
//				var operatorType = fields[0].operator;
//				me.operatorSelect.selectLabel = operatorType;
				var operatorType = fields[0].operator;
				me.setSelectValue(listItems, operatorType);
				
				var stageSelectValue = fields[0].name;
				me.setStageValue(stageSelectValue);
				var periodType = fields[0].value2;
				me.PeriodTextBox.setValue(periodType);
				var amountValueType = fields[0].value;
				me.amountTextBox.setValue(amountValueType);
			});
			var popup;
			on(me.stuckopptyHelp, "mouseover", function(){
				popup = new helpTip();
				popup.setContent('Please input a number of days such as 30. Opportunities that have gone 180 days<br>without an update will not be considered');
				popup.show(this);
			});
			on(me.stuckopptyHelp, "mouseout", function(){
				popup.hide();
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
					case 'S06':
						me.S06.set("checked",true);
						break;
					default:
						break;
					}
				}
			}
			
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