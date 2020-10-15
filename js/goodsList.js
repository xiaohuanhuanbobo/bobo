$(function () {
    getgoodsList();
    getPage();
    goodsinfo();
    search();
    shopcar();
    lookCar();
})


// 请求商品信息并渲染至页面中
function getgoodsList(page, search) {

    $.get(domain + '/api/goods/getlist', { page: page, search: search }, function (res) {
        if (res.code == 2000) {
            var data = template('goodsList', res);
            $('.aui-list-theme-box').html(data);
        } else {
            return console.log(res.msg);
        }
    })
}
// 分页

function getPage() {
    var pagenum = 1;
    $.get(domain + '/api/goods/getlist', { page: pagenum }, function (res) {
        if (res.code === 2000) {
            res.page.pageNo = pagenum;
            $('.aui-pagination-next').on('click', function () {
                pagenum++;
                $('.aui-pagination-page').html(pagenum + '/' + res.page.pageCount + '共30件商品');
                getgoodsList(pagenum, '')
                console.log(res.page.pageNo);
                if (pagenum == 3) {
                    $('.aui-pagination-prev').addClass('disabled');
                    $('.aui-pagination-next').off();
                    return
                }
            })
            $('.aui-pagination-prev').on('click', function () {
                pagenum--;
                $('.aui-pagination-page').html(pagenum + '/' + res.page.pageCount + '共30件商品');
                getgoodsList(pagenum, '')
                if (pagenum == 1) {
                    $('.aui-pagination-next').removeClass('disabled');
                    $('.aui-pagination-prev').off();
                    return
                }
            })
        } else {
            return console.log(res.msg);
        }
    })

}

// 搜索功能
function search() {
    $('#search').on('keyup', function () {
        var htmlStr = $(this).val().trim();
        $.get(domain + '/api/goods/getlist', { search: htmlStr }, function (res) {
            if (res.code == 2000) {
                var data = template('goodsList', res);
                $('.aui-list-theme-box').html(data);
                $('.aui-pagination-page').html(res.page.pageNo + '/' + res.page.pageCount + '共30件商品');
            } else {
                return console.log(res.msg);
            }
        })
    })
}
function searchPage() {

}

// 查看当前商品信息
function goodsinfo() {
    $('.aui-list-theme-box').on('click', '.aui-list-theme-img', function () {
        var infoid = $('.aui-list-theme-img').parents('.aui-list-item').attr('data-id');
        localStorage.setItem("infoid", infoid);
        location.assign('goodsInfo.html');
    })
}

// 添加购物车功能
function shopcar() {
    console.log(1);
    $('.aui-list-theme-box').on('click', '.aui-coupon', function () {
        var carid = $(this).attr('data-id');
        var price = $(this).attr('data-price');
        // 获取token
        var tk = localStorage.getItem('token');
        var data = {
            gid: carid,
            price: price,
            token: tk
        }
        $.get(domain + '/api/cart/add', data, function (res) {
            console.log(res);
            if (res.code === 2000) {
                alert('添加成功');
            } else {
                alert(res.msg);
            }
        })
        console.log(data);
    })
}

// 查看购物车
function lookCar() {
    $('.van-tabbar-item').on('click', function () {
        location.href = 'cart.html';
    })
}