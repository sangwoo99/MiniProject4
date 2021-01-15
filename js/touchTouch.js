//앞의 화면에서 전송한 데이터를 가져온다.
var decode = decodeURI(location.href);
var values = decode.split("?");
var nameValue = values[1].split("&");
var heartValue = nameValue[0].split("=");
var beforeHeart = parseInt(heartValue[1]);
var dogValue = nameValue[1].split("=");
var dogName = dogValue[1];

var $heart1 = null;
var $heart2 = null;
var $submit = null;
var $dogbody = null;
var heart = null;

$(document).ready(function () {
    init();
    dogImageChange();
    startGame();
});

function init() {
    $heart1 = $("#heart1");
    $heart2 = $("#heart2");
    $submit = $("#submit");
    $dogbody = $(".dogbody");
}
function startGame() {
    $("#start").click(function () {
        $(".informModal").hide();
        $("#background").css('opacity', 1);
        heartMove();
        statusAdd();
    });
}

function heartMove() {
    timer = setInterval(function () {
        var sector1Width = parseInt($(".sector1").css("width")) - parseInt($heart1.css("width"));
        var sector1Height = parseInt($(".sector1").css("height")) - parseInt($heart1.css("height"));
        var sector2Width = parseInt($(".sector2").css("width")) - parseInt($heart2.css("width"));
        var sector2Height = parseInt($(".sector2").css("height")) - parseInt($heart2.css("height"));

        sector1Left = parseInt(Math.random() * sector1Width);
        sector1Top = parseInt(Math.random() * sector1Height);
        sector2Left = parseInt(Math.random() * sector2Width);
        sector2Top = parseInt(Math.random() * sector2Height);

        $heart1.css({ "top": sector1Top, "left": sector1Left }); //0~0.9999~,parseInt:정수로 만들어 소수점 버리기
        $heart2.css({ "top": sector2Top, "left": sector2Left });

    }, 1000);
};

var heartcount = 0;
var thundercount = 0;
var $result = null;

function statusAdd() {
    var $sHeart = $("#sHeart");
    var $sThunder = $("#sThunder");
    $result = $("#result");

    $heart1.on("click", function (e) {
        $sHeart.append('<img src="../images/touch_heart.png" height="100" width="100"/>'); //append로 이미지 하나씩 추가
        heartcount++;
        heart += 50;
        e.stopPropagation(); //이벤트 버블링을 막는다.
        console.log(heartcount);//확인용

        $(".sector3").show();
        $(".sector4").show();
        $(".sector5").show();

        if (heartcount == 6) {
            $result.html("성공!!! 하트 " + heart + "개 획득!");
            finishModal();
        }
    });

    $heart2.on("click", function (e) {
        $sHeart.append('<img src="../images/touch_heart.png" height="100" width="100"/>');
        heartcount++;
        heart += 30;
        console.log(heartcount);//확인용
        e.stopPropagation();

        $(".sector3").show();
        $(".sector4").show();
        $(".sector5").show();

        if (heartcount == 6) {
            finishModal();
            $result.html("성공!!! 하트 " + heart + "개 획득!");
        }
    });

    $dogbody.on("click", function () {
        $sThunder.append('<img src="../images/touch_false.png" height="100" width="100"/>'); //자식은 이벤트 안먹는다.(버블링)
        thundercount++;

        $(".sector3").hide();
        $(".sector4").hide();
        $(".sector5").hide();

        if (thundercount == 6) {
            $result.text("실패하셨습니다.ㅠㅠ 하트를 획득하지 못하셨습니다.");
            finishModal();
        }
    });

    // console.log(heartcount); 왜 전역변수인데 0이 나오지?
}

function finishModal() {
    $finishModal = $(".finishModal");
    $finishModal.show();
    $("#background").css("opacity", 0.5);
    clearInterval(timer);

    // 나가기 클릭시 마이홈으로 넘어가는 부분
    $("#exit").on("click", function () {
        location.href = "myHomeMain.html?heart=" + (beforeHeart + heart) + "&dogName=" + dogName;
    });
}

function dogImageChange() {
    console.log(dogName);
    if (dogName == "jein") {
        $dogbody.css("background-image", "url(../images/basic_jein.png)");
        $(".sector1").css("left", "650px");
        $(".sector2").css("left", "700px");
    }
    else if (dogName == "serhyun")
        $dogbody.css("background-image", "url(../images/basic_serhyun.png)");
    else if (dogName == "clover")
        $dogbody.css("background-image", "url(../images/basic_clover.png)");
    else if (dogName == "homil")
        $dogbody.css("background-image", "url(../images/basic_homil.png)");
}