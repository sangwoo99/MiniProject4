
//앞의 화면에서 전송한 데이터를 가져온다.

var decode = decodeURI(location.href); 
var values = decode.split("?"); 
var nameValue = values[1].split("&");
var heartValue = nameValue[0].split("=");
var beforeHeart = parseInt(heartValue[1]); 
var dogValue = nameValue[1].split("=");
var dogName = dogValue[1];

var timerID = null;
var $doeat = null;
var $heart = null;

$(document).ready(function () {
    $doeat = $("#doeat")
    $heart = $("#heart")

    doEat();
    donoteat();
    dogImageChange();
    dogBoneChange();
});

//1. 밥주기
function doEat() {
    $("#doeat").click(function () {
        if (timerID == null) {
            $("#doeat").css({
                backgroundColor: "black",
                color: "white"
            }).html("멈 춤");
            timerID = setInterval(function () {
                var x = Math.floor(Math.random() * 800);
                var y = Math.floor(Math.random() * 100);
                $("#heart").css({
                    left: x + 300,
                    top: y + 200
                })
            }, 500)
        } else {
            $("#doeat").css({
                backgroundColor: "white",
                color: "black"
            }).html("게임 시작");
            clearInterval(timerID)
            timerID = null;
        }
    })
    
    //점수반영
    var count = 0;
    var $score = $("#score");

    $("#heart").click(function () {
        count++;
        $score.html(10 * count);
        if (count == 5) {
            swal.fire({
                icon: 'success', // Alert 타입 
                text: '----- 성공! 하트 100개 획득! -----', // Alert 내용
            }).then(function () {
                location.href = 'myHomeMain.html?heart='+(beforeHeart + 100)+"&dogName="+ dogName;
                //다음으로 갈 페이지 = 마이홈
            })
        }
    })
}

// 게임설명 모달
function donoteat() {
    document.getElementById("modal_btn").onclick = function () {
        document.getElementById("modal").style.display = "block";
    }
    document.getElementById("modal_colse_btn").onclick = function () {
        document.getElementById("modal").style.display = "none";
    }
}

// 개이미지 체인지
function dogImageChange() {
    var $bgimg = $("#bgimg");
    if (dogName == "clover")
        $bgimg.attr("src", "../images/eat_clover.jpg");
    else if (dogName == "homil")
        $bgimg.attr("src", "../images/eat_homil.jpg");
    else if (dogName == "jein")
        $bgimg.attr("src", "../images/eat_jein.jpg");
        else if (dogName == "serhyun")
        $bgimg.attr("src", "../images/eat_serhyun.jpg");
}

// 개뼈다귀 체인지
function dogBoneChange() {
    if (dogName == "clover")
        $heart.attr("src", "../images/getHeart2.png");
    else if (dogName == "homil")
        $heart.attr("src", "../images/getEeat.png");
    else if (dogName == "jein")
        $heart.attr("src", "../images/getHeart2.png");
    else if (dogName == "serhyun")
        $heart.attr("src", "../images/getEeat.png")
}
