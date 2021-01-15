 //1.앞의 화면에서 전송한 데이터를 가져온다.(location)
 var decode = decodeURI(location.href); 
 var values = decode.split("?"); 
 var nameValue = values[1].split("&");
 var heartValue = nameValue[0].split("=");
 var beforeHeart = parseInt(heartValue[1]); 
 var dogValue = nameValue[1].split("=");
 var dogName = dogValue[1];

 var $dog1 = null;
 var $dog2 = null;
 var $dog3 = null;
 var $dog4 = null;
 var $dogs = null;
 var timer = null;
 var $myDog = null;
 var $heartScore = null;
 var minus = 0;

 $(document).ready(function () {
     $dog1 = $("#dog1");
     $dog2 = $("#dog2");
     $dog3 = $("#dog3");
     $dog4 = $("#dog4");
     $heartScore = $("#heartScore");
     $heartScore.html(beforeHeart);
     startGame();
 });

 function startGame() {
     $("#start").click(function () {
         $(".informModal").hide();
         $(".panel").css('opacity', 1);
         dogMove();
     });
 }

 function dogMove() {
     //선택된 강아지 이동 조작(클릭시 앞으로100씩 이동,하트점수 10씩 차감)
     $(".cheerUp").on("click", function (event) {
         dogChange();
         var step = 100;
         newLeft = $myDog.position().left - step;
         $myDog.css("left", newLeft);
         beforeHeart -= 10;
         $heartScore.html(beforeHeart);
     });
     //console.log(newLeft); //오류 왜냐 아직 newLeft가 안생김=>중요!=>이벤트함수안의 변수는 전역변수로 쓸 수 없다.
     
     //선택 안된 강아지들의 자동 이동
     timer = setInterval(function () {
         dogStepChange();
         checkGoleDog();
     }, 500);
 }

 function dogChange() {
     $myDog = null;
     if (dogName == "jein") {
         $myDog = $dog1;
     }
     else if (dogName == "serhyun") {
         $myDog = $dog2;
     }
     else if (dogName == "clover") {
         $myDog = $dog3;
     }
     else if (dogName == "homil") {
         $myDog = $dog4;
     }
 }

 function dogStepChange() {
     var step1 = parseInt(Math.random() * 100);
     var step2 = parseInt(Math.random() * 100);
     var step3 = parseInt(Math.random() * 100);
     var step4 = parseInt(Math.random() * 100);

     if (dogName == "jein") {
         step1 = 30;
         $("#line1").css("border", "4px solid blue");
         $("#dog1").css("color", "blue");
     }
     else if (dogName == "serhyun") {
         step2 = 30;
         $("#line2").css("border", "4px solid blue");
         $("#dog2").css("color", "blue");
     }
     else if (dogName == "clover") {
         step3 = 30;
         $("#line3").css("border", "4px solid blue");
         $("#dog3").css("color", "blue");
     }
     else if (dogName == "homil") {
         step4 = 30;
         $("#line4").css("border", "4px solid blue");
         $("#dog4").css("color", "blue");
     }

     var newLeft1 = $dog1.position().left - step1;
     var newLeft2 = $dog2.position().left - step2;
     var newLeft3 = $dog3.position().left - step3;
     var newLeft4 = $dog4.position().left - step4;

     $dog1.css("left", newLeft1);
     $dog2.css("left", newLeft2);
     $dog3.css("left", newLeft3);
     $dog4.css("left", newLeft4);
 }

 var endPosition = null;
 var goleDogList = [];

 function checkGoleDog() {
     $dogs = $(".dogs");
     for (var i = 0; i < $dogs.length; i++) {
         position = $dogs.eq(i).position().left;
         // alert(position);
         endPosition = $(".bar").position().left + 20;
         if (position <= endPosition) { //도착지점과 변화되는 위치를 비교하여 도착한 강아지 판단
             goleDogList.push({
                 line: (i + 1),  //몇번 라인주자인지
                 position: position
             }) //2차원 배열  
         }
     }
     if (goleDogList.length > 0) {
         goleDogList.sort(function (a, b) {   //위치를 가지고 내림차순
             return b.position - a.position;
         });
         finishModal();
     }
 }

 function finishModal() {
     dogChange();
     $finishModal = $(".finishModal");

     if (endPosition >= $myDog.position().left) {
         $("#result").html("[ " + dogName + " 우승!! ] <br/>하트100개 획득!!");
     } else {
         // $finishModal.css("height", 90);
         $("#result").html("[ 우승: " + goleDogList[1].line + "번 강아지! ]"
             + "<br/>아쉽네요.ㅠㅠ 다음엔 더 잘 할 수 있을 거에요.");
     }

     $finishModal.show();
     $(".panel").css("opacity", 0.5);
     clearInterval(timer); //인터벌을 푼다.
     $(".cheerUp").off("click"); //클릭 이벤트 함수 바인딩을 푼다.

     // 나가기 클릭시 마이홈으로 넘어가는 부분
     $("#exit").on("click", function () {
         location.href = "myHomeMain.html?heart="+(beforeHeart+100)+"&dogName="+ dogName;
     });
 }