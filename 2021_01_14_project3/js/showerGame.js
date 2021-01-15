//앞의 화면에서 전송한 데이터를 가져온다.

    var decode = decodeURI(location.href); 
    var values = decode.split("?"); 
    var nameValue = values[1].split("&");
    var heartValue = nameValue[0].split("=");
    var beforeHeart = parseInt(heartValue[1]); 
    var dogValue = nameValue[1].split("=");
    var dogName = dogValue[1];

    var timerID = null;
    var $dog_img = null;
    var $doshower = null;

    $(document).ready(function () {
        $dog_img = $("#dog_img")
        $doshower = $("#doshower")
        $duck = $("#duck")

        moveDog();
        doShower();
        donotshower();
        dogImageChange();
    });

    //강아지 움직이기
    function moveDog() {
        var step = 10;
        // 강아지 눌러서 움직이기
        $dog_img.click(function () {
            var timerID = null
            if (timerID == null) {
                timerID = setInterval(function () {
                    var x = $("#dog_img").position().left + step;
                    if (x >= 950) {
                        x = 950;
                        step = -10;

                        dogImageChange();
                        // $("#dog_img").attr("src", "images/basic_jein.png");
                    } else if (x < 200) {
                        x = 200;
                        step = 10;
                        dogImageChange2();
                        // $("#dog_img").attr("src", "images/jein2.png");
                    }
                    $dog_img.css("left", x)
                }, 50)
            } else {
                clearInterval(timerID)
            }
        })
    }

    //2. 샤워하기
    function doShower() {
        var step = 50;
        // 오리 자동 움직이기
        $("#doshower").click(function () {
            if (timerID == null) {
                $("#doshower").css({
                    backgroundColor: "black",
                    color: "white"
                }).html("멈춤");
                timerID = setInterval(function () {
                    var x = $("#duck").position().left + step;
                    if (x >= 1300) {
                        x = 1300;
                        step = -50;
                    } else if (x < 170) {
                        x = 170;
                        step = 50;
                    }
                    $("#duck").css("left", x)
                }, 25)
            } else {
                $("#doshower").css({
                    backgroundColor: "white",
                    color: "black"
                }).html("샤워하기");
                clearInterval(timerID)
                timerID = null;
            }
        })

        //샤워 -멈췄을때 적정범위좌표값
        var count = 0;
        //버튼
        $("#doshower").click(function (e) {
            var $score = $("#score");
            var offsetX = $("#duck").position().left;
            // var offsetX = e.pageX - $("#duck").offset().left;
            var strInfo = "offertX = " + offsetX;
            console.log(strInfo)

            if (offsetX >= 670 && offsetX < 900) {
                count++;
                $score.html(10 * count);

                swal.fire({
                    icon: 'success', // Alert 타입 
                    text: '적정 온도에요♡ 목욕을 성공하였어요', // Alert 내용
                })

                $("#duck").css("left", 171);

                if (count == 5) {
                    swal.fire({
                        icon: 'success', // Alert 타입 
                        text: '-----성공! 하트 200개 획득!-----', // Alert 내용
                    }).then(function () {
                        location.href = "myHomeMain.html?heart="+(beforeHeart+200) +"&dogName="+ dogName;  //끝나면 앞에서 넘어온 하트점수에 획득 하트 더해서 데이터 넘겨주기
                    })
                }
            }
            else if (offsetX <= 1385 && offsetX >= 900) {
                swal.fire({
                    icon: 'warning', // Alert 타입 
                    text: '너무 뜨거워요♨ 물온도는 낮추어 주세요', // Alert 내용
                })
                $("#duck").css("left", 171);
            }
            else if (offsetX < 670 && offsetX > 180) {
                $score.html(10 * count);
                swal.fire({
                    icon: 'warning', // Alert 타입 
                    text: '너무 차가워요 물온도는 높여 주세요', // Alert 내용
                })
                $("#duck").css("left", 171);
            }
        })
    }

    // 게임설명 모달
    function donotshower() {
        document.getElementById("modal_btn").onclick = function () {
            document.getElementById("modal").style.display = "block";
        }
        document.getElementById("modal_colse_btn").onclick = function () {
            document.getElementById("modal").style.display = "none";
        }
    }

    //강아지 이미지 체인지
    function dogImageChange() {
        if (dogName == "clover")
            $dog_img.attr("src", "../images/basic_clover.png")
        else if (dogName == "homil")
            $dog_img.attr("src", "../images/basic_homil(2).png")
        else if (dogName == "jein")
            $dog_img.attr("src", "../images/basic_jein.png")
        else if (dogName == "serhyun")
            $dog_img.attr("src", "../images/basic_serhyun(2).png")
    };

    function dogImageChange2() {
        if (dogName == "clover")
            $dog_img.attr("src", "../images/basic_clover(2).png")
        else if (dogName == "homil")
            $dog_img.attr("src", "../images/basic_homil.png")
        else if (dogName == "jein")
            $dog_img.attr("src", "../images/basic_jein(2).png")
        else if (dogName == "serhyun")
            $dog_img.attr("src", "../images/basic_serhyun.png")
    };