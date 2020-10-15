var price = 1;
var dataid = 1;
var token = localStorage.getItem('token');
$(function () {
    var id = localStorage.getItem('infoid');
    getInfo(id);
})
// 获取数据
function getInfo(id) {
    $.get(domain + '/api/goods/getinfo', { id: id }, function (res) {
        console.log(res);
        if (res.code === 2000) {
            getData(res);
        } else {
            alert(res.msg);
        }
    })
}
// 渲染函数
function getData(res) {
    $('#img')[0].src = domain + res.data.fileurl;
    $('#img-title').html(res.data.name);
    $('#data-price').html('<i>￥</i>' + res.data.price);
    $('#aui-product').html(res.data.content)
    price = res.data.price;
    datdaid = res.data.id;
}
// 添加到购物车
$('#addcar').on('click', function () {
    // console.log(price, dataid, id);
    var data = {
        gid: dataid,
        price: price,
        token:token
    }
    $.get(domain + '/api/cart/add', data, function (res) {
        console.log(res);
    })
})
// 购物车跳转
$('.aui-footer-wrap').on('click', function () {
    window.location.href = 'cart.html';
})