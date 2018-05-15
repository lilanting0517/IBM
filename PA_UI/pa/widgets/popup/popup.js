

define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  "dojo/text!./template/PageManagerAlerts.html",
  "dojo/text!./template/RMTAlert.html",
  "dojo/text!./template/UpcomingCallAlerts.html",
  "dojo/text!./template/UpcomingTaskAlerts.html",

  "dijit/Dialog",
  "dojo/query",
  "dojo/on",
  "dijit/focus",
  "dijit/Tooltip",
  "dijit/TooltipDialog",
  "dijit/popup",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/fx",
  
  "pa/bmodels/systemModel",
  "pa/bmodels/userModel"
], function(declare, _WidgetBase, _TemplatedMixin,EXPIRATION, RMT,CALL_LOGGED,TASK_LOGGED, Dialog, query, on, focusUtil, Tooltip, TooltipDialog, popup, lang, domConstruct, domClass, fx, system,user) {

  var widget = declare([ _WidgetBase, _TemplatedMixin], {
	constructor : function(type) {
		var mapping = {
				"RMT": RMT,
				"EXPIRATION": EXPIRATION,
				"CALL_LOGGED" : CALL_LOGGED,
				"TASK_LOGGED" : TASK_LOGGED
		};
		this.popupType = type;
		this.templateString = mapping[this.popupType];
	},
	
    postCreate: function() {
      this.inherited(arguments);
      var me = this;
      on(window.document, 'click', function(e) {
          if (e.target.className == "pa_container_title_text_con_alert" ||
        	  e.target.className == "pa_popup" ||
        	  domClass.contains(e.target, 'button')) {
            e.stopPropagation();
          } else {
//            me.hide();
          }
      });
    },
    
    _action: function(_flag){
        if(this.popupType === 'EXPIRATION'){
            return system.createPresetrulePm(_flag);
        }
        if(this.popupType === 'RMT'){
           return system.createPresetruleRmt(_flag);
        }
        if(this.popupType === 'CALL_LOGGED'){
            return system.createPresetruleComingCall(_flag);
        }
        if(this.popupType === 'TASK_LOGGED'){
           return system.createPresetruleComingTask(_flag);
        }
    },

    eventsMapping: function(popup){
        var me = popup;
        var igBtn = dojo.query('.igBtn')[0];
        var setBtn = dojo.query('.setBtn')[0];
        var clickHere = dojo.query('.clickHere')[0];
        var PAModel = Model.getCachedModel('pa/PAModule','module_pa');
        if(setBtn){
             on(setBtn, 'click', function() {
                me._action(true).then(function(){
                    PAModel.moduleView.changeModule2RulesView();
               });
           });
         }

         if(igBtn){
             on(igBtn, 'click', function(){
                 me._action(false).then(function(){
                    PAModel.moduleView.changeModule2RulesView();
                 });
            });
        }
         
        if(clickHere){
           on(clickHere, 'click', function(){
        	   me.hide();
               me._action("clickHere").then(function(){
                });
            });
        }
    },

    hide: function() {
      var paPopupFrame = dojo.query('.pa_popup_frame')[0];
      domClass.add(paPopupFrame, 'hidden');
    }
  });

  return widget;
});