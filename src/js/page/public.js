require(['jquery', 'handlebars', 'render'], function($, handlebars, render) {
    $(".btn-add").on("click", function() {
        var title = $("#title").val();
        var content = $("#content").val();
        console.log(title, content)
        if (!title || !content) {
            alert("输入不能为空")
        }
        $.ajax({
            url: '/api/add',
            dataType: "json",
            data: {
                title: title,
                content: content
            },
            type: "post",
            success: function(res) {
                console.log(res.code)
                location.href = "../../index.html";
            }

        })
    })
})