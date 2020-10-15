$(function () {
    $('.login-btn').click(function (e) {

        e.preventDefault();
        // 获取表单数据
        var strData = $('#flogin').serialize();
        // 向服务器提交数据
        postData(strData);
    })
})
function postData(data) {
    $.post(domain + '/api/member/login', data, function (res) {
        console.log(res);
        if (res.code === 2000) {
            var tk = res.token;
            // 将token存在本地
            localStorage.setItem('token', tk);
            location.href='goodsList.html' ;
        } else {
            alert('登录失败');
        }
    })
} 