define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/io/script",
    "dojo/Deferred"
], function(declare, lang, script, Deferred) {
    var formatURL = function (_params){
        delete _params.url;
    };
    var defaultConfig = {
        url: '',
        callbackParamName: "jsoncallback",
        timeout: 60 * 1000,
        content: {
            postData: ''
        },
        headers: {
            "Content-Type": "application/json"
        }
    };

    return declare('PA_net', [], {
        randomCallBack: function() {
            var temp = ['jsoncallback', Math.round(Math.random() * 10000)];
            return temp.join('');
        },

        getDataByJsonp: function(_params) {
            var deferred = new Deferred();
            var config = lang.mixin({}, defaultConfig, _params);
          
            formatURL(_params);
          
            config.content = {postData: JSON.stringify(_params)};
            config.load = function(response){
                deferred.resolve(response);
            };
            config.error = function(response){
                deferred.reject(response);
            };
            script.get(config);
            return deferred.promise;
        }
    });
});