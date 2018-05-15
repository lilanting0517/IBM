define(["dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./template/template.html",
  "dojo/on",
  "dojo/dom-class",    
  "dojo/dom-style",
  "dojox/mvc/at",
  "dojo/Stateful",
  "pa/widgets/marklayer/marklayer",
  "pa/bmodels/userModel",
  "dojo/dom",
  "dojo/dom-construct",
  "system/data/Model",
  "pa/Services/RuleCheck"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, domClass, domStyle, at, Stateful, marklayer, user, dom, domConstruct,Model, RuleCheck) {

    return declare('ruleListWidget', [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        constructor: function(){
        },
        startup: function(){
            var me = this;
            var stateful = this.modelInstance;
            me.showActive(stateful.get('isActive'));
            stateful.watch("isActive", function(){
                me.showActive(stateful.get('isActive'));
            });
            me.ruleName.innerHTML = stateful.get('ruleName');
            //disable edit
            if(stateful.template == "NEW_OPPTY_NOT_SALES_TEAM_HW"){
            	domClass.add(this.rule_function, 'hidden');
            	domClass.remove(this.rule_function_special, 'hidden');
            }else{
            	domClass.remove(this.rule_function, 'hidden');
            	domClass.add(this.rule_function_special, 'hidden');
            }
            //disable delete
            if(stateful.template == "NEW_OPPTY_LESS_THAN_500K" || stateful.template == "OPEN_OPPTY_REVENUE_IN_PRIOR_MONTH" || stateful.template == "WON_OPPTY_REVENUE_IN_PRIOR_MONTH"|| 
                stateful.template == "NEW_OPPTY_NOT_LIO_OR_OO" || stateful.template == "WON_OPPTY_FUTURE_DECISION_DATE" || stateful.template == "ROADMAP_STATUS_UPDATE_REQUIRED" ||
                stateful.template == "MISSING_LINE_ITEM_STEPS_TO_CLOSURE" || stateful.template == "OPEN_OPPTY_WITH_PRIOR_DECISION_DATE"|| stateful.template == "TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL"|| 
                stateful.template == "WARM_TRANSFER_NEEDED" || stateful.template == "MISSING_INVALID_EMAIL_ADDRESS" || stateful.template == "REMOVED_FROM_SALES_TEAM" || 
                stateful.template == "WARM_TRANSFER_5_DAYS"|| stateful.template == "WARM_TRANSFER_14_DAYS"  || stateful.template == "POTE_DUPL_OF_LOST_OPPTY"){
        		domClass.add(this.icon_delete, 'rule_action-special');
        		domClass.add(this.icon_delete, 'cursor');
        	}
            //103218
            if(stateful.createdMode == 'PRESET'){
            	domClass.add(this.icon_delete, 'rule_action-special');
            	domClass.add(this.icon_delete, 'cursor');
            }
            this.eventsBind();
        },
        showActive: function(isActive){
            if(isActive == "true"){
                domClass.remove(this.icon_pause, 'hidden');
                domClass.add(this.icon_resume, 'hidden');
            }else{
            	domClass.add(this.icon_pause, 'hidden');
                domClass.remove(this.icon_resume, 'hidden')
            }
        },
        eventsBind: function(){
            var _super = this;
            on(this.edit_rule_action, "click", function(evt){
            	marklayer.show();
            	if(dom.byId("editRuleButtonTip")){
            		var mc = dom.byId("module_content");
                    mc.removeChild(dom.byId("editRuleButtonTip"));
            	}
            	var contentModel = Model.getCachedModel('pa/content/modules/ruleseditview/ruleseditviewModule','module_ruleseditview');
                contentModel.moduleView._loadModule('module_editRule',{modelInstance:_super.modelInstance});
                
            });
            var ruleId = _super.modelInstance.id;
            var ruleTemplate = _super.modelInstance.template;
            //disable tooltip
            if(ruleTemplate == "NEW_OPPTY_LESS_THAN_500K" || ruleTemplate == "OPEN_OPPTY_REVENUE_IN_PRIOR_MONTH" || ruleTemplate == "WON_OPPTY_REVENUE_IN_PRIOR_MONTH"|| 
                ruleTemplate == "NEW_OPPTY_NOT_LIO_OR_OO" || ruleTemplate == "WON_OPPTY_FUTURE_DECISION_DATE" || ruleTemplate == "ROADMAP_STATUS_UPDATE_REQUIRED" ||
                ruleTemplate == "MISSING_LINE_ITEM_STEPS_TO_CLOSURE" || ruleTemplate == "OPEN_OPPTY_WITH_PRIOR_DECISION_DATE"|| 
                ruleTemplate == "TOUCHPOINT_REQUIRED_FOR_SAAS_RENEWAL" ||  ruleTemplate == "MISSING_INVALID_EMAIL_ADDRESS" ||  _super.modelInstance.createdMode == 'PRESET'){
        	}else{
	            on(_super.icon_delete, "mouseover", function(evt){
	                var clientX = evt.clientX - 100;
	                var clientY = evt.clientY;
	                clientX += "px";
	                clientY += "px";
	                domConstruct.create("div", {id:"deleteRuleButtonTip", innerHTML: "&nbsp;Delete this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "89px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
	                
	            });
	            on(_super.icon_delete, "mouseout", function(evt){
	            	while(dom.byId("deleteRuleButtonTip")){
	            		var mc = dom.byId("module_content");
	                    mc.removeChild(dom.byId("deleteRuleButtonTip"));
	            	}
	                
	            });
	            on(this.icon_delete, 'click', function(evt){
	            		var PAModule = Model.getCachedModel('pa/PAModule','module_pa');
	                    PAModule.deleteDialog(function(){
	                        marklayer.show();
	                        user.deleteRule(ruleId).then(function() {
	                            _super.destroy();
	                            _super.ruleListModule.scrollViewRules._refresh();
	                            marklayer.hide();
	                        });
	                    });
	            });
        	}
            on(this.icon_pause, 'click', function(evt){
                _super.modelInstance.set('isActive', 'false');
                marklayer.show();
                user.markToActive(ruleId).then(function() {
                    marklayer.hide();
                });
            });
            on(this.icon_resume, 'click', function(evt){
                _super.modelInstance.set('isActive', 'true');
                marklayer.show();
                user.markToActive(ruleId).then(function() {
                    marklayer.hide();
                });
            });
            on(_super.icon_pause, "mouseover", function(evt){
                var clientX = evt.clientX + 10;
                var clientY = evt.clientY;
                clientX += "px";
                clientY += "px";
                domConstruct.create("div", { innerHTML: "&nbsp;Pause this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "88px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                
            });
            on(_super.icon_pause, "mouseout", function(evt){
                var mc = dom.byId("module_content");
                mc.removeChild(mc.lastChild);
                while(!mc){
                	
                }
            });
            on(_super.icon_resume, "mouseover", function(evt){
                var clientX = evt.clientX + 10;
                var clientY = evt.clientY;
                clientX += "px";
                clientY += "px";
                domConstruct.create("div", { innerHTML: "&nbsp;Resume this rule&nbsp;" ,style: { color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "100px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                
            });
            on(_super.icon_resume, "mouseout", function(evt){
                var mc = dom.byId("module_content");
                mc.removeChild(mc.lastChild);
            });
            on(_super.edit_rule_action, "mouseover", function(evt){
                var clientX = evt.clientX - 80;
                var clientY = evt.clientY;
                clientX += "px";
                clientY += "px";
                domConstruct.create("div", {id:"editRuleButtonTip", innerHTML: "&nbsp;Edit this rule&nbsp;" ,style: {color:"#404040" ,border: "1px solid #B3B3B3", background:"#f0f0f0", width: "75px", position: "fixed", left: clientX, top: clientY, zIndex: 999999} }, dom.byId("module_content"));
                
            });
            on(_super.edit_rule_action, "mouseout", function(evt){
            	while(dom.byId("editRuleButtonTip")){
            		var mc = dom.byId("module_content");
                    mc.removeChild(dom.byId("editRuleButtonTip"));
            	}
            });
            
        }
    });
}); 