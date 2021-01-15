//게임들이 끝나고 넘어온 데이터를 받아오는 부분
var uri = location.href;
var values = uri.split("?");
var nameValue = values[1].split("&");

var heartValue = nameValue[0].split("=");
var heart = 0;
heart += parseInt(heartValue[1]);
console.log(heart);
var nameValue = nameValue[1].split("=");
var dogName = nameValue[1];

// if(value[1] != null) {
//   var heartValue = value[1].split("=");
//   heart += parseInt(heartValue[1]);
// }else{
//   heart=100;
// }

var $dog = null;
var $dogFace = null;
var $modal = null;
var $yesBtn = null;
var $noBtn = null;
var $ask = null;
var $anwerModal = null;
var $total = 0;

var moveTimer = null;
var eventTimer = null;
var answerModal = null;

var year = 0;
var month = 0;
var snack = "";
var wake = "";

$(document).ready(function () {
  /* 게임 후 dogName 구분 */
  // giveDog()
  init();
  initEvent();
  /* 버튼 이벤트 */
  $("#miniGame").click(function () {
    $("#boxset").show();
    gameIn();
  });

  /* 미니게임선택창 닫기 */
  $("#exit").click(function () {
    $("#boxset").hide();
  });
});

function initEvent() {
  selectDog();
  randomMove();
  randomEvent();
  clickTV();
  nextDay();
  setDate();
}

function init() {
  year = 2021;
  month = 1;

  $date = $("#date");
  $bubbleImg = $("#bubble");
  $yesBtn = $("#yes");
  $noBtn = $("#no");
  $comBtn = $(".comBtn");
  $ask = $("#ask");
  $dog = $("#dog");
  $dogFace = $("#dog [data-name=" + dogName + "]");
  $total = $("#text");
  $motion = $("#motion");
  $answerModal = $(".answerModal");
  $modal = $(".modal");
  $dog.css({ left: 700, top: 300 }); //강아지 초기위치 설정
  $total.text(heart); //초기 하트값 1000 표시
}

// function giveDog() {
//   var nameurl = $(location).attr("search");
//   var url_arr = nameurl.split("=");
//   var arr_lenght = url_arr.lenght;

//   console.log(url_arr);
//   dogName = url_arr[1];

//   return dogName;
// }

//강아지 한마리 선택
function selectDog() {
  $("#dog :not([data-name=" + dogName + "])").addClass("hidden");
  $("#dog[data-name=" + dogName + "]").removeClass("hidden");
  // return dogName;
}

// 강아지 랜덤 위치이동
function randomMove() {
  moveTimer = setInterval(function () {
    var place = parseInt(Math.random() * 3 + 1);

    switch (place) {
      //왼쪽
      case 1:
        setLocation($(".location1"));
        break;

      //중간
      case 2:
        setLocation($(".location2"));
        break;

      //오른쪽
      case 3:
        setLocation($(".location3"));
        break;
    }
  }, 7000);
}

//위치 선정 함수
function setLocation(location) {
  if ($("#dog [data-name=" + dogName + "]")) {
    $dog.find($("[data-name=" + dogName + "]")).appendTo(location);
  }

  var x = parseInt(location.css("width")) - parseInt($dog.css("width"));
  var y = parseInt(location.css("height")) - parseInt($dog.css("height"));

  x = parseInt(Math.random() * x);
  y = parseInt(Math.random() * y);

  $(".location img").appendTo(location).css({ left: x, top: y });
}

function setDate() {
  if (month <= 12 && year < 2022) {
    $date.text(year + "년 " + month++ + "월");
  } else if (month > 12) {
    year += 1;
    month = 1;
  } else {
    $date.text("🌈행복하게 잘 살았답니다");
  }
}

//달 클릭시 다음날로
function nextDay() {
  $("#sleep").click(function () {
    maskshow();
    gotoSleep();
    clearInterval(moveTimer);
    clearInterval(eventTimer);
    setDate();
    openLoading($(".day_loading"), 6000);

    setTimeout(function () {
      basicFace();
      randomMove();
      randomEvent();
      $("#mask").hide()
    }, 6000);
  });
}

//랜덤으로 강아지 표정이 변하면
function randomEvent() {
  eventTimer = setInterval(function () {
    var face = Math.floor(Math.random() * 2);
    if (face == 0) {
      sleepyFace();
      nap();
    } else {
      angryFace();
      badMood();
    }
  }, 10000);
}

// getDog메서드로 강아지 이름을 받아 이미지 설정
function angryFace() {
  $dogFace.attr("src", "../images/angry_" + dogName + ".png");
  $dogFace.off().on("click");
}

function sleepyFace() {
  $dogFace.attr("src", "../images/sleep_" + dogName + ".png");
  $dogFace.off().on("click");
}

function basicFace() {
  $dogFace.attr("src", "../images/basic_" + dogName + ".png");
  $dogFace.off("click");
}

function nap() {
  wake = "낮잠중인 강아지🐶💤 깨우시겠어요?";
  $dogFace.off().on("click", function () {
    openModal(wake);
    sleepyFace();
    clearInterval(moveTimer);
    clearInterval(eventTimer);
  });
}

//낮잠 자라
function gotoSleep() {
  $dogFace.attr("src", "../images/sleep_" + dogName + ".png");
}

// 강아지 기분 안좋을 때
function badMood() {
  snack = "간식을 주시겠어요?🦴";
  $dogFace.off().on("click", function () {
    openModal(snack);
    basicFace();
  });
}

//랜덤이벤트 모달창 띄우기
function openModal(value) {
  $modal.removeClass("hidden");
  $ask.text(value);

  switch (value) {
    //낮잠자는 강아지를 깨울 것인지
    case wake:
      controlBtn();

      //클릭이벤트 중복 방지를 위해 off on
      $yesBtn.off().on("click", function () {
        basicFace();
        annoyed();
        minusHeart(100);
        closeAnswer();
        randomMove();
        randomEvent();
      });

      $noBtn.off().on("click", function () {
        $dogFace.off("click");
        gotoSleep();
        plusHeart(100);

        //5초동안 자고 깨기
        setTimeout(function () {
          basicFace();
          randomMove();
          randomEvent();
        }, 5000);
      });
      break;

    //간식을 줄 것인지
    case snack:
      controlBtn();

      $yesBtn.off().on("click", function () {
        plusHeart(100);
      });
      $noBtn.off().on("click", function () {
        sad();
        closeAnswer();
        minusHeart(100);
      });
      break;

    //광고를 볼 것인지
    case answer:
      $yesBtn.addClass("hidden");
      $comBtn.removeClass("hidden");

      $comBtn.off().on("click", function () {
        plusHeart(100);
        openLoading($(".tv_loading"), 2000);
        clearInterval(moveTimer);
        clearInterval(eventTimer);

        setTimeout(function () {
          openCommercial();
        }, 3000);
      });

      $noBtn.off().on("click", function () {
        $modal.addClass("hidden");
      });
      break;

    //빅이벤트 페이지이동
    case bigEvent:
      controlBtn();
      $modal.removeClass("hidden");
      $ask.text(bigEvent);

      $yesBtn.off().on("click", function () {
        window.open("https://blog.naver.com/suannai94");
        plusHeart(300);
      });

      $noBtn.off().on("click", function () {
        $modal.addClass("hidden");
      });
      break;
  }
}

//강아지 반응
function sad() {
  $answerModal.removeClass("hidden");
  $("#answer").text("강아지가 슬퍼해요 💧하트 -100!");
}

function annoyed() {
  $answerModal.removeClass("hidden");
  $("#answer").text("강아지가 짜증내요 🐶💢 하트 -100!");
}

function closeAnswer() {
  $answerModal.on("click", function () {
    $answerModal.addClass("hidden");
  });
}

//tv에 있는 하트를 클릭하면
function clickTV() {
  answer = "광고 보고 하트 얻고!🎮";
  bigEvent = "⭐️BIG EVENT⭐️ 클릭시 하트 300개!";

  $("#motion").on("click", function () {
    var ranNum = parseInt(Math.random() * 2);

    if (ranNum === 0) {
      openModal(answer);
    } else if (ranNum === 1) {
      openModal(bigEvent);
    }
  });
}

//tv,달 로딩창
function openLoading(whichone, startTime) {
  whichone.removeClass("hidden");

  setTimeout(function () {
    whichone.addClass("hidden");
  }, startTime);
}

//광고비디오 모달창 띄우기
function openCommercial() {
  $(".comModal").removeClass("hidden");
  getRandomVideo();
  $(".comModal")
    .off()
    .on("click", function () {
      $(".comModal").addClass("hidden");
      randomMove();
      randomEvent();
    });
}

//광고 비디오 랜덤으로 가져오기
function getRandomVideo() {
  var ranNum = parseInt(Math.random() * 3 + 1);
  $("#videos").attr("src", "../videos/Puppy" + ranNum + ".mp4");
}

//버튼 hide show
function controlBtn() {
  $yesBtn.removeClass("hidden");
  $comBtn.addClass("hidden");
}

//하트 증가 감소
function plusHeart(score) {
  $modal.addClass("hidden");
  heart += score;
  $total.text(heart);
}

function minusHeart(score) {
  $modal.addClass("hidden");
  heart -= score;
  $total.text(heart);
}

//다음 게임창으로 넘어가는 부분
function gameIn() {
  $("#touch").on("click", function () {
    location.href = "touchTouch.html?heart=" + heart + "&dogName=" + dogName;
  });
  $("#walk").on("click", function () {
    location.href = "dogRace.html?heart=" + heart + "&dogName=" + dogName;
  });
  $("#shower").on("click", function () {
    location.href = "showerGame.html?heart=" + heart + "&dogName=" + dogName;
  });
  $("#eat").on("click", function () {
    location.href = "eatGame.html?heart=" + heart + "&dogName=" + dogName;
  });
}

function maskshow(){
  var maskHeight = $(document).height();
  var maskWidth = $(window).width();            
  $('#mask').css({'width' : maskWidth, 'height' : maskHeight});
  $("#mask").fadeTo( "slow", 0.5 )
}
