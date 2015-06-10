define(['jquery'], function($){

    function makeRequest(options, callback){
        options.cache = false;
        options.success = function(){
            callback.apply(this, arguments);
        };
        options.error = function(xhr, err, msg) {
            alert(err + ": " + msg);
        };

        $.ajax(options);
    }

	return {
        retrieve: function(url, dataType, callback) {

            var options = {
                url:  url,
                type: 'GET',
                headers:  {'format' :  dataType },
                dataType: dataType
            };

            makeRequest(options, callback);
        },

        update: function(url, params, callback){
            var options = {
                url:  url,
                type: 'PUT',
                data: params,
                dataType: 'json'
            };

            makeRequest(options, callback);
        },

        insert: function(url, params, callback){
            var options = {
                url:  url,
                type: 'POST',
                data: params,
                dataType: 'json'
            };

            makeRequest(options, callback);
        },


        del: function(url, callback) {
            var options = {
                url:  url,
                type: 'DELETE',
                dataType: 'json'

            };

            makeRequest(options, callback);
        }
    };
});