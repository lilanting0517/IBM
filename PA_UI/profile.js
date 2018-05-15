var profile = (function(){
    return {
        basePath: ".",
        releaseDir: "lib",
        releaseName: "",
        mini: true,
        selectorEngine: 'lite',
        action: "release",
        stripConsole: "all",
        optimize: "shrinksafe",
        
        packages:[
            { name: "dojo", location: "../../Framework/dojo"},
            { name: "dojox", location: "../../Framework/dojox"},
            { name: "dijit", location: "../../Framework/dijit"},
            { name: "gridx", location: "../../Framework/gridx"},
            { name: "system", location: "../../Framework/system"},
            { name: "comlib", location: "../../Framework/comlib"},
            { name: "bcomlib", location: "../../Framework/bcomlib"},
            { name: "app", location: "../../WebContent/app"},
            { name: "pa", location: "pa"}
        ],
        staticHasFeatures: {
            // The trace & log APIs are used for debugging the loader, so we do not need them in the build.
            'dojo-trace-api': false,
            'dojo-log-api': false,

            // This causes normally private loader data to be exposed for debugging. In a release build, we do not need
            // that either.
            'dojo-publish-privates': false,

            // This app is pure AMD, so get rid of the legacy loader.
            'dojo-sync-loader': false,
    
            // `dojo-xhr-factory` relies on `dojo-sync-loader`, which we have removed.
            'dojo-xhr-factory': false,
    
            // We are not loading tests in production, so we can get rid of some test sniffing code.
            'dojo-test-sniff': false
        },
        layers: {
            'dojo/dojo': {
                include: ["dojo/Deferred",
                     "dojo/Evented",
                     "dojo/NodeList-dom",
                     "dojo/Stateful",
                     "dojo/_base/Color",
                     "dojo/_base/Deferred",
                     "dojo/_base/array",
                     "dojo/_base/config",
                     "dojo/_base/connect",
                     "dojo/_base/declare",
                     "dojo/_base/event",
                     "dojo/_base/fx",
                     "dojo/_base/json",
                     "dojo/_base/kernel",
                     "dojo/_base/lang",
                     "dojo/_base/sniff",
                     "dojo/_base/url",
                     "dojo/_base/window",
                     "dojo/_base/xhr",
                     "dojo/aspect",
                     "dojo/cache",
                     "dojo/cldr/nls/en/number",
                     "dojo/cldr/nls/number",
                     "dojo/cookie",
                     "dojo/data/util/sorter",
                     "dojo/date/stamp",
                     "dojo/dnd/Moveable",
                     "dojo/dnd/Mover",
                     "dojo/dnd/TimedMoveable",
                     "dojo/dnd/autoscroll",
                     "dojo/dnd/common",
                     "dojo/dojo",
                     "dojo/dom",
                     "dojo/dom-attr",
                     "dojo/dom-class",
                     "dojo/dom-construct",
                     "dojo/dom-form",
                     "dojo/dom-geometry",
                     "dojo/dom-prop",
                     "dojo/dom-style",
                     "dojo/domReady",
                     "dojo/errors/CancelError",
                     "dojo/errors/RequestError",
                     "dojo/errors/RequestTimeoutError",
                     "dojo/errors/create",
                     "dojo/fx",
                     "dojo/has",
                     "dojo/hccss",
                     "dojo/html",
                     "dojo/i18n",
                     "dojo/io-query",
                     "dojo/io/script",
                     "dojo/json",
                     "dojo/keys",
                     "dojo/mouse",
                     "dojo/number",
                     "dojo/on",
                     "dojo/parser",
                     "dojo/promise/Promise",
                     "dojo/promise/all",
                     "dojo/promise/instrumentation",
                     "dojo/promise/tracer",
                     "dojo/query",
                     "dojo/ready",
                     "dojo/regexp",
                     "dojo/request",
                     "dojo/request/default",
                     "dojo/request/handlers",
                     "dojo/request/script",
                     "dojo/request/util",
                     "dojo/request/watch",
                     "dojo/request/xhr",
                     "dojo/selector/_loader",
                     "dojo/selector/lite",
                     "dojo/sniff",
                     "dojo/store/Memory",
                     "dojo/store/util/QueryResults",
                     "dojo/store/util/SimpleQueryEngine",
                     "dojo/string",
                     "dojo/text",
                     "dojo/topic",
                     "dojo/touch",
                     "dojo/uacss",
                     "dojo/when",
                     "dojo/window"
                    ],
                boot: true,
                customBase: true
            },
            'dijit/dijit': {
                include: ["dijit/BackgroundIframe",
                     "dijit/Destroyable",
                     "dijit/Dialog",
                     "dijit/DialogUnderlay",
                     "dijit/DropDownMenu",
                     "dijit/MenuItem",
                     "dijit/MenuSeparator",
                     "dijit/Tooltip",
                     "dijit/TooltipDialog",
                     "dijit/Viewport",
                     "dijit/_AttachMixin",
                     "dijit/_Contained",
                     "dijit/_Container",
                     "dijit/_CssStateMixin",
                     "dijit/_DialogMixin",
                     "dijit/_FocusMixin",
                     "dijit/_HasDropDown",
                     "dijit/_KeyNavContainer",
                     "dijit/_KeyNavMixin",
                     "dijit/_MenuBase",
                     "dijit/_OnDijitClickMixin",
                     "dijit/_TemplatedMixin",
                     "dijit/_Widget",
                     "dijit/_WidgetBase",
                     "dijit/_WidgetsInTemplateMixin",
                     "dijit/_base/manager",
                     "dijit/a11y",
                     "dijit/a11yclick",
                     "dijit/focus",
                     "dijit/form/Button",
                     "dijit/form/CheckBox",
                     "dijit/form/MappedTextBox",
                     "dijit/form/NumberTextBox",
                     "dijit/form/RangeBoundTextBox",
                     "dijit/form/Select",
                     "dijit/form/TextBox",
                     "dijit/form/ToggleButton",
                     "dijit/form/ValidationTextBox",
                     "dijit/form/_ButtonMixin",
                     "dijit/form/_CheckBoxMixin",
                     "dijit/form/_FormMixin",
                     "dijit/form/_FormSelectWidget",
                     "dijit/form/_FormValueMixin",
                     "dijit/form/_FormValueWidget",
                     "dijit/form/_FormWidget",
                     "dijit/form/_FormWidgetMixin",
                     "dijit/form/_TextBoxMixin",
                     "dijit/form/_ToggleButtonMixin",
                     "dijit/form/nls/validate",
                     "dijit/hccss",
                     "dijit/layout/BorderContainer",
                     "dijit/layout/ContentPane",
                     "dijit/layout/LayoutContainer",
                     "dijit/layout/_ContentPaneResizeMixin",
                     "dijit/layout/_LayoutWidget",
                     "dijit/layout/utils",
                     "dijit/main",
                     "dijit/nls/common",
                     "dijit/nls/loading",
                     "dijit/place",
                     "dijit/popup",
                     "dijit/registry"
                    ]
            },
            'dojox/dojox': {
                include: ["dojox/collections/ArrayList",
                     "dojox/collections/Dictionary",
                     "dojox/collections/_base",
                     "dojox/mvc/_atBindingExtension",
                     "dojox/mvc/_atBindingMixin",
                     "dojox/mvc/at",
                     "dojox/mvc/atBindingExtension",
                     "dojox/mvc/resolve",
                     "dojox/mvc/sync",
                     "dojox/timing",
                     "dojox/timing/_base"
                    ]
            },
            'gridx/gridx': {
                include: [
                ]
            },
            'system/system': {
                include: ["system/application/LoadingDialog",
                     "system/application/startup",
                     "system/data/FUModel",
                     "system/data/Model",
                     "system/data/Store",
                     "system/data/bind/ModelBinding",
                     "system/data/proxy/Proxy",
                     "system/module/Module",
                     "system/module/ModuleFrame",
                     "system/page/Page",
                     "system/page/PageFrame",
                     "system/page/widget/FuncWidget",
                     "system/util/Checker",
                     "system/util/MarkLayer",
                     "system/util/PathUtil",
                     "system/util/ResourceLoader",
                     "system/util/Timer",
                     "system/view/ModelView"
                    ]
            },
            'comlib/comlib': {
                include: ["comlib/dom/DomFun",
                     "comlib/event/CustomEvent",
                     "comlib/fun/Device",
                     "comlib/fun/Logger",
                     "comlib/fun/Validate",
                     "comlib/rpc/RemoteObject",
                     "comlib/ui/CustomUIWidget",
                     "comlib/ui/IScrollView",
                     "comlib/ui/iscroll"
                    ]
            },
            'app/app': {
                include: ["app/Application",
                     "app/contentpages/consolepage/ConsolePageModule",
                     "app/contentpages/consolepage/modules/consoleheader/ConsoleHeaderModule",
                     "app/contentpages/consolepage/modules/consoleheader/view/ConsoleHeaderView",
                     "app/contentpages/consolepage/modules/consoleheader/widgets/Tip",
                     "app/contentpages/consolepage/modules/consoleheader/widgets/ViewAsDialogWidget",
                     "app/contentpages/consolepage/modules/iconnavigation/IconNavigationModule",
                     "app/contentpages/consolepage/modules/iconnavigation/view/IconNavigationView",
                     "app/contentpages/consolepage/modules/iconnavigation/widgets/IconButtonWidget",
                     "app/contentpages/consolepage/modules/leftmoduleframe/LeftModuleFrameModule",
                     "app/contentpages/consolepage/modules/leftmoduleframe/view/LeftModuleFrameView",
                     "app/contentpages/consolepage/modules/menunavigation/MenuNavigationModule",
                     "app/contentpages/consolepage/modules/menunavigation/view/MenuNavigationView",
                     "app/contentpages/consolepage/modules/menunavigation/widgets/menunavigationgroup/MenuNavigationGroup",
                     "app/contentpages/consolepage/modules/menunavigation/widgets/menunavigationtip/MenuNavigationTip",
                     "app/contentpages/consolepage/modules/ribbonbar/RibbonBarModule",
                     "app/contentpages/consolepage/modules/ribbonbar/view/RibbonBarView",
                     "app/contentpages/consolepage/modules/rightmoduleframe/rightModuleFrameModule",
                     "app/contentpages/consolepage/modules/rightmoduleframe/view/rightModuleFrameView",
                     "app/contentpages/consolepage/view/ConsolePageView",
                     "app/services/ConsoleService",
                     "app/services/ConsoleServiceTest",
                     "app/services/CookieService",
                     "app/services/LayoutService",
                     "app/services/Model/LayoutModel",
                     "app/services/Model/ModuleApiModel",
                     "app/services/Model/ModuleModel",
                     "app/services/Model/User",
                     "app/services/ModuleApiService",
                     "app/services/ModuleService",
                     "app/services/UserService",
                     "app/view/AppView",
                     "app/widgets/BrowserNoSupportDialogWidget",
                     "app/widgets/GlobalConstants",
                     "app/widgets/ViewAsErrorDialogWidget"
                    ]
            },
            'pa/pa': {
                include: ["pa/content/contentModule",
                    "pa/content/modules/alertslistview/alertsListViewModule",
                    "pa/content/modules/alertslistview/view/alertsListViewView",
                    "pa/content/modules/alertslistview/view/widgets/alertgroup/alertgroup",
                    "pa/content/modules/ruleseditview/ruleseditviewModule",
                    "pa/content/modules/ruleseditview/view/ruleseditviewView",
                    "pa/content/modules/ruleseditview/ruleModules/copyrule/copyRuleModule",
                    "pa/content/modules/ruleseditview/ruleModules/copyrule/view/copyRuleView",
                    "pa/content/modules/ruleseditview/ruleModules/creatrule/creatRuleModule",
                    "pa/content/modules/ruleseditview/ruleModules/creatrule/view/creatRuleView",
                    "pa/content/modules/ruleseditview/ruleModules/editrule/editRuleModule",
                    "pa/content/modules/ruleseditview/ruleModules/editrule/view/editRuleView",
                    "pa/content/modules/ruleseditview/ruleModules/ruleslist/rulesListModule",
                    "pa/content/modules/ruleseditview/ruleModules/ruleslist/view/rulesListView",
                    "pa/content/modules/ruleseditview/ruleModules/ruleslist/view/widgets/RuleListWidget/RuleListWidget",
                    "pa/content/modules/ruleseditview/widgets/BusinessPartnerWidget/BusinessPartnerWidget",
                    "pa/content/modules/ruleseditview/widgets/CommonWidget/CommonWidget",
                    "pa/content/modules/ruleseditview/widgets/ExpiredPageManagerWidget/ExpiredPageManagerWidget",
                    "pa/content/modules/ruleseditview/widgets/NewOpptyNotSalesWidget/NewOpptyNotSalesWidget",
                    "pa/content/modules/ruleseditview/widgets/OpenedOpptyWidget/OpenedOpptyWidget",
                    "pa/content/modules/ruleseditview/widgets/OpptyStageChangeWidget/OpptyStageChangeWidget",
                    "pa/content/modules/ruleseditview/widgets/RepPageStepsWidget/RepPageStepsWidget",
                    "pa/content/modules/ruleseditview/widgets/RepPageStepsWidget/widget/Condition",
                    "pa/content/modules/ruleseditview/widgets/LinkedAlertsWidget/LinkedAlertsWidget",
                    "pa/content/modules/ruleseditview/widgets/LinkedAlertsWidget/widget/Condition",
                    "pa/content/modules/ruleseditview/widgets/RepPageVisitsWidget/RepPageVisitsWidget",
                    "pa/content/modules/ruleseditview/widgets/RoadmapStatusUpdateRequiredWidget/RoadmapStatusUpdateRequiredWidget",
                    "pa/content/modules/ruleseditview/widgets/OpportunityDecisionDateChangeWidget/OpportunityDecisionDateChangeWidget",
                    "pa/content/modules/ruleseditview/widgets/RMTWidget/RMTWidget",
                    "pa/content/modules/ruleseditview/widgets/UpcomingCallWidget/UpcomingCallWidget",
                    "pa/content/modules/ruleseditview/widgets/UpcomingTaskWidget/UpcomingTaskWidget",
                    "pa/content/modules/ruleseditview/widgets/TouchpointRequiredSaaSWidget/TouchpointRequiredSaaSWidget",
                    "pa/content/view/contentView",
                    "pa/PAModule",
                    "pa/view/PAView",
                    "pa/widgets/marklayer/marklayer",
                    "pa/bmodels/alertModel",
                    "pa/bmodels/base/baseModel",
                    "pa/proxy/net",
                    "pa/proxy/proxy",
                    "pa/bmodels/base/modelsList",
                    "pa/bmodels/ruleModel",
                    "pa/bmodels/configjson/ruletypes/ruletypefactory",
                    "pa/bmodels/systemModel",
                    "pa/bmodels/userModel",
                    "pa/Services/RuleCheck",
                    "pa/widgets/gobackbutton/gobackbutton",
                    "pa/content/modules/ruleseditview/widgets/CloseOutCallWidget/CloseOutCallWidget"
                ],
                exclude: ["app/Application",
                         "app/contentpages/consolepage/ConsolePageModule",
                         "app/contentpages/consolepage/modules/consoleheader/ConsoleHeaderModule",
                         "app/contentpages/consolepage/modules/consoleheader/view/ConsoleHeaderView",
                         "app/contentpages/consolepage/modules/consoleheader/widgets/Tip",
                         "app/contentpages/consolepage/modules/consoleheader/widgets/ViewAsDialogWidget",
                         "app/contentpages/consolepage/modules/iconnavigation/IconNavigationModule",
                         "app/contentpages/consolepage/modules/iconnavigation/view/IconNavigationView",
                         "app/contentpages/consolepage/modules/iconnavigation/widgets/IconButtonWidget",
                         "app/contentpages/consolepage/modules/leftmoduleframe/LeftModuleFrameModule",
                         "app/contentpages/consolepage/modules/leftmoduleframe/view/LeftModuleFrameView",
                         "app/contentpages/consolepage/modules/menunavigation/MenuNavigationModule",
                         "app/contentpages/consolepage/modules/menunavigation/view/MenuNavigationView",
                         "app/contentpages/consolepage/modules/menunavigation/widgets/menunavigationgroup/MenuNavigationGroup",
                         "app/contentpages/consolepage/modules/menunavigation/widgets/menunavigationtip/MenuNavigationTip",
                         "app/contentpages/consolepage/modules/ribbonbar/RibbonBarModule",
                         "app/contentpages/consolepage/modules/ribbonbar/view/RibbonBarView",
                         "app/contentpages/consolepage/modules/rightmoduleframe/rightModuleFrameModule",
                         "app/contentpages/consolepage/modules/rightmoduleframe/view/rightModuleFrameView",
                         "app/contentpages/consolepage/view/ConsolePageView",
                         "app/contentpages/loginpage/LoginPageModule",
                         "app/contentpages/loginpage/modules/alertsinfo/AlertsInfoModule",
                         "app/contentpages/loginpage/modules/alertsinfo/view/AlertsInfoView",
                         "app/contentpages/loginpage/modules/alertsinfo/widgets/AlertsItemWidget",
                         "app/contentpages/loginpage/view/LoginPageView",
                         "app/services/ConsoleService",
                         "app/services/ConsoleServiceTest",
                         "app/services/CookieService",
                         "app/services/LayoutService",
                         "app/services/Model/LayoutModel",
                         "app/services/Model/ModuleApiModel",
                         "app/services/Model/ModuleModel",
                         "app/services/Model/User",
                         "app/services/ModuleApiService",
                         "app/services/ModuleService",
                         "app/services/UserService",
                         "app/view/AppView",
                         "app/widgets/EventCenterWidget",
                         "app/widgets/GlobalConstants",
                         "app/widgets/ViewAsErrorDialogWidget",
                         "app/widgets/BrowserNoSupportDialogWidget",
                         "app/widgets/ISAMetric",
                         "comlib/dom/DomFun",
                         "comlib/event/CustomEvent",
                         "comlib/fun/Logger",
                         "comlib/fun/Encrypt",
                         "comlib/rpc/RemoteObject",
                         "comlib/ui/CustomUIWidget",
                         "comlib/ui/IScrollView",
                         "comlib/ui/iscroll",
                         "comlib/fun/Device",
                         "system/application/LoadingDialog",
                         "system/application/startup",
                         "system/data/FUModel",
                         "system/data/Model",
                         "system/data/Store",
                         "system/data/bind/ModelBinding",
                         "system/data/proxy/Proxy",
                         "system/module/Module",
                         "system/module/ModuleFrame",
                         "system/page/Page",
                         "system/page/PageFrame",
                         "system/page/widget/FuncWidget",
                         "system/util/Checker",
                         "system/util/MarkLayer",
                         "system/util/PathUtil",
                         "system/util/ResourceLoader",
                         "system/util/Timer",
                         "system/view/ModelView",
                         "dojo/Deferred",
                         "dojo/Evented",
                         "dojo/NodeList-dom",
                         "dojo/Stateful",
                         "dojo/_base/Color",
                         "dojo/_base/Deferred",
                         "dojo/_base/array",
                         "dojo/_base/config",
                         "dojo/_base/connect",
                         "dojo/_base/declare",
                         "dojo/_base/event",
                         "dojo/_base/fx",
                         "dojo/_base/json",
                         "dojo/_base/kernel",
                         "dojo/_base/lang",
                         "dojo/_base/sniff",
                         "dojo/_base/url",
                         "dojo/_base/window",
                         "dojo/_base/xhr",
                         "dojo/aspect",
                         "dojo/cache",
                         "dojo/cookie",
                         "dojo/date/stamp",
                         "dojo/dnd/Moveable",
                         "dojo/dnd/Mover",
                         "dojo/dnd/TimedMoveable",
                         "dojo/dnd/autoscroll",
                         "dojo/dnd/common",
                         "dojo/dojo",
                         "dojo/dom",
                         "dojo/dom-attr",
                         "dojo/dom-class",
                         "dojo/dom-construct",
                         "dojo/dom-form",
                         "dojo/dom-geometry",
                         "dojo/dom-prop",
                         "dojo/dom-style",
                         "dojo/domReady",
                         "dojo/errors/CancelError",
                         "dojo/errors/RequestError",
                         "dojo/errors/RequestTimeoutError",
                         "dojo/errors/create",
                         "dojo/fx",
                         "dojo/has",
                         "dojo/hccss",
                         "dojo/html",
                         "dojo/i18n",
                         "dojo/io-query",
                         "dojo/json",
                         "dojo/keys",
                         "dojo/mouse",
                         "dojo/on",
                         "dojo/parser",
                         "dojo/promise/Promise",
                         "dojo/promise/all",
                         "dojo/promise/instrumentation",
                         "dojo/promise/tracer",
                         "dojo/query",
                         "dojo/ready",
                         "dojo/regexp",
                         "dojo/request",
                         "dojo/request/default",
                         "dojo/request/handlers",
                         "dojo/request/util",
                         "dojo/request/watch",
                         "dojo/request/xhr",
                         "dojo/selector/_loader",
                         "dojo/selector/lite",
                         "dojo/sniff",
                         "dojo/store/Memory",
                         "dojo/store/util/QueryResults",
                         "dojo/store/util/SimpleQueryEngine",
                         "dojo/string",
                         "dojo/text",
                         "dojo/topic",
                         "dojo/touch",
                         "dojo/uacss",
                         "dojo/when",
                         "dojo/window",
                         "dijit/BackgroundIframe",
                         "dijit/Destroyable",
                         "dijit/Dialog",
                         "dijit/DialogUnderlay",
                         "dijit/Tooltip",
                         "dijit/TooltipDialog",
                         "dijit/Viewport",
                         "dijit/_AttachMixin",
                         "dijit/_Contained",
                         "dijit/_Container",
                         "dijit/_CssStateMixin",
                         "dijit/_DialogMixin",
                         "dijit/_FocusMixin",
                         "dijit/_OnDijitClickMixin",
                         "dijit/_TemplatedMixin",
                         "dijit/_Widget",
                         "dijit/_WidgetBase",
                         "dijit/_WidgetsInTemplateMixin",
                         "dijit/_base/manager",
                         "dijit/a11y",
                         "dijit/a11yclick",
                         "dijit/focus",
                         "dijit/form/_FormMixin",
                         "dijit/hccss",
                         "dijit/layout/BorderContainer",
                         "dijit/layout/ContentPane",
                         "dijit/layout/LayoutContainer",
                         "dijit/layout/_ContentPaneResizeMixin",
                         "dijit/layout/_LayoutWidget",
                         "dijit/layout/utils",
                         "dijit/main",
                         "dijit/nls/common",
                         "dijit/nls/loading",
                         "dijit/place",
                         "dijit/popup",
                         "dijit/registry",
                         "dojox/collections/ArrayList",
                         "dojox/collections/Dictionary",
                         "dojox/collections/_base",
                         "dojox/mvc/sync",
                         "dojox/timing",
                         "dojox/timing/_base"
                        ]
                        
            }
        }
    };
})();