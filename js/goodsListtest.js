$(function () {

    // var strData = $('#aui-list-theme-box').serialize();
    getGoodsList();
    pageCount();
    $('#search').keyup(function () {

        // console.log(11);
        var content = $(this).val().trim();
        $.get(domain + '/api/goods/getlist', { search: content }, function (res) {
            if (res.code === 2000) {
                // console.log(res);
                var htmlStr = template('goodsList', res);
                $('.aui-list-theme-box').html(htmlStr);
                $('.aui-pagination-page').html(res.page.pageNo + '/' + res.page.pageCount + ',共30件商品')
            }
        })
    })
})

// 页面载入后，请求商品信息并渲染至页面中
function getGoodsList() {

    $.get(domain + '/api/goods/getlist', function (res) {
        if (res.code === 2000) {
            // 如果获取成功删除页面信息渲染页面
            var htmlStr = template('goodsList', res);
            $('.aui-list-theme-box').html(htmlStr);


            $('.aui-list-theme-box').on('click','.aui-list-theme-img', function () {
                var id = $(this).parents('.aui-list-item').attr('data-id');
                console.log(id);
                var l = location.assign('goodsinfo.html?id='+id);
                // console.log(l);
                
            })
            getinfo();
            function getinfo() {
                let id = location.search
                console.log(id);
                $.get(domain + '/api/goods/getinfo', { id: id }, function (res) {
                    console.log(res);
                    // if (res.code === 2000) {
                    //     var pic = template('tpic', res);
                    //     $('#scrollView').html(pic);
                     
                    // }
                })


            }
        } else {
            alert('商品列表获取失败')
        }
    })
}

// 分页
function pageCount() {
    var pageNum = 1;

    $('.van-icon-arrow').click(function () {
        $('.van-icon-arrow-left').off();
        pageNum++;
        $.get(domain + '/api/goods/getlist', { page: pageNum }, function (res) {
            if (res.code === 2000) {
                var htmlStr = template('goodsList', res);
                $('.aui-list-theme-box').html(htmlStr);
                $('.aui-pagination-page').html(res.page.pageNo + '/' + res.page.pageCount + ',共30件商品')

            } else {
                $('.van-icon-arrow').off();

                $('.van-icon-arrow-left').click(function () {
                    pageNum--;
                    $.get(domain + '/api/goods/getlist', { page: pageNum }, function (res) {
                        if (res.code === 2000) {
                            console.log(22);
                            var htmlStr = template('goodsList', res);
                            $('.aui-list-theme-box').html(htmlStr);
                            $('.aui-pagination-page').html(res.page.pageNo + '/' + res.page.pageCount + ',共30件商品')
                        } else {
                            alert('不能到下一页')

                        }
                    })
                })
            }
        })
    })
}

