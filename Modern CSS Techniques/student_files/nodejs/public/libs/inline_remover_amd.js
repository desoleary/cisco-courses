// this is a jQuery plug-in designed to remove any inline styles that jQuery might apply
// use it with the following syntax:
//      $(selector).removeStyle('propertyName');
//      $('#myDiv').removeStyle('display');
define(['jquery'], function($){

    $.fn.removeStyle = function(style) {
        var search = new RegExp(style + '[^;]+;?', 'g');

        return this.each(function()
        {
            $(this).attr('style', function(i, style)
            {
                return style.replace(search, '');
            });
        });
    };

    return null;
});