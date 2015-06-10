define(['jquery', 'rest'], function($, RestClient){

    var url     = '/contact/',
        gridTpl,
        gridTplUrl = '/labs/lab04/starter/tmpl/tabletpl.hbs';

        RestClient.retrieve(gridTplUrl, 'html', function(results){
            gridTpl =  Handlebars.compile(results);
        });

    return {
        render: function(updateEl) {
            RestClient.retrieve(url, 'json', function(results){
                if (gridTpl)
                    $(updateEl).html(gridTpl(results));
                else
                    console.log('Grid template not initialized.');
            });
        }
    };
});
