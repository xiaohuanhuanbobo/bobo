$(function () {
    // 点击注册按钮
    $('.lowin-btn').click(function (e) {
        e.preventDefault();
        // 获取表单数据
        var strData = $('#fregister').serialize();
        // 将数据提交到服务器
        postData(strData);

    })
})
//向后台提交数据
function postData(data) {
    $.post(domain + '/api/member/register', data, function (res) {
        console.log(res);
        if (res.code === 2000) {
            location.assign('login.html');
        } else {
            alert('注册失败');
        }
    })
} 