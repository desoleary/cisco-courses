define(['jquery'], function($){

    // these tasks are page specific
    function specialTasks(bodyClass) {
        if (bodyClass === 'narrow') cb_narrow();
        else if (bodyClass === 'medium') cb_medium();
        else if (bodyClass === 'wide') cb_wide();
    }

    var bp_narrow = 600, bp_wide = 800,
        cb_narrow = cb_medium = cb_wide = function(){},

        LayoutMgr = {

            init: function(narrow, wide, cb1, cb2, cb3){
                bp_narrow = narrow; bp_wide = wide;
                cb_narrow = cb1 || cb_narrow;
                cb_medium = cb2 || cb_medium;
                cb_wide   = cb3 || cb_wide;
                this.clear();
                this.doLayout();
                return this;
            },

            clear: function() { this.lastWidth = null; return this; },

            doLayout: function() {
                var body = $('body'), width = $(document).width();
                if(width !== this.lastWidth) {

                    var bodyClass = 'narrow';
                    if(width > bp_wide)
                        bodyClass = 'wide';
                    else if(width >= bp_narrow && width <= bp_wide)
                        bodyClass = 'medium';

                    body.removeClass();
                    body.addClass(bodyClass);
                    this.lastWidth = width;

                    specialTasks(bodyClass);
                }
            },
            lastWidth: null
        };

    $(window).load(LayoutMgr.doLayout);
    $(window).resize(LayoutMgr.doLayout);

    return LayoutMgr;
});