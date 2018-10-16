define(['jquery', 'handlebars'], function($, Handlebars) {
    var renderTpl = function(tpl, data, ele, isAppend) {
        var source = $(tpl).html();
        var template = Handlebars.compile(source);
        var html = template(data);
        if (isAppend) {
            $(ele).append(html);
        } else {
            $(ele).html(html);
        }

    }
    return renderTpl;
})