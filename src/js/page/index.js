require(['jquery', 'handlebars', 'render'], function($, handlebars, render) {
    $.ajax({
        url: "/api/list",
        dataType: "json",
        success: function(res) {
            if (res.code == 1) {
                render("#tpl", res.data, ".list1")
                    //location.reload();
            }
        }
    })
})