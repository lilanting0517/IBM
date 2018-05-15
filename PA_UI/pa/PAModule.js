/*
 * This file is entrance for PA project. this.me.moduleView is './view/PAView' file
 */
define([
    'dojo/_base/declare',
    'dojo/text!./config/info.json',
    './view/PAView',
    'system/module/Module',
    'dojo/dom-construct',
    'app/services/ConsoleService',
    'pa/bmodels/userModel',
    'pa/widgets/marklayer/marklayer',
    "dojo/dom-class",
    'app/widgets/ContentModuleExtend',
    "pa/bmodels/userModel",
    'app/services/CookieService',
    'pa/proxy/proxy'
],     
    function(declare,info,PAView,Module,domConstruct, ConsoleService, user, marklayer,domClass, ContentModuleExtend,user, CookieService,proxy){    
    
        var paModule = declare([Module,ContentModuleExtend], {    
            pfields : Module,
            blockShowTip: true,    //for new feature
            currentUser:'',
            proxy : {    
                reader : {    
                    isCache : true,    
                    cachedData : info    
                }    
            },    
            noCache:false,    
        
            preSettings : function() {    
                this.moduleViewType = PAView;    
            },    
            activate: function(parameter) {        //after clicking pa icon, loading pa, this function will be run
                this.inherited(arguments);   
                ConsoleService.setAlertUnread(false) ;
            },    
            afterViewLoad : function() {          //just be run one time, when csa is loading
//                window._ConsoleService = ConsoleService;
//                window._this = this;
//                window._user = user;
//                window._test = test;
                this.currentUser = ConsoleService.getCurrentUser();
                user.set('userId', this.currentUser.getIntranetId().trim());
                user.set('cnum', this.currentUser.getSerialNumber().trim());
                user.set('isViewAs', CookieService.isViewAs());
                this.modelInstance = user;
                this.inherited(arguments);    
                var me = this;
//                window._marklayer = marklayer;
                marklayer.setCon(this.moduleView.domNode);
                
                marklayer.show();
                me.moduleView._initContentModuleFrame()
                .then(function(contentFrame){
                    me.moduleView._backButton();
                    marklayer.hide();
                    me.moduleView._initDialog();
                    me.moduleView._initFramePopup();
                    me.moduleView.resize();
                });
            },    
            onReloadModule : function() {    //same as active function. this function is run firstly, then active function
                if(this.moduleView.domNode.parentNode !== null){
                    this.moduleView.changeModule2AlertsList();
                    domClass.add(this.moduleView.gobackbutton.icon_return, 'hidden');
                }
                this.moduleView.resize();
            },    
            onUnloadModule : function() {   //close pa container
//                if(this.moduleView.MenuBtn){
//                    this.moduleView.MenuBtn.hide();
//                }
//                if(this.moduleView.domNode.parentNode === null){
//                    this.moduleView.clpsePopUp();
//                }
            },    
            onDestroy:function(){    
                        
            },
            deleteDialog:function(deleteFunction){
                this.moduleView.deleteDialog(deleteFunction);
            },
            onExpandHiddenModule:function(){
                if(this.moduleView.domNode.parentNode !== null){
                    this.moduleView.clpsePopUp();
                }
            },
            onPreloadModule:function(){             //preload some settings
            	proxy.getNewAlerts(user.getNecessaryParams()).then(function(data) { 
            		if(data.result){
            			ConsoleService.setAlertUnread(data.alertsNum) ;//whether show red dot around PA icon. if parameter is 0 or false, red dot is not shown, true is showing dot, number is show dot and number.
            		}else{
            			ConsoleService.setAlertUnread(data.result) ;
            		}
                }, function() {
                });
            }
        });     
    
        return paModule;    
    }    
);    
