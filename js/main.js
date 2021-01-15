$(document).ready(function(){

    var name = ""
    
    /* 메인 이미지  */
    $("#mainImg").fadeIn( 2000 )

    /* 메뉴 */
    $("#companion").click(function(){
        $("#mainImg").hide()
        $("#lookView").fadeIn( 2000 )
    })

    /* 입양카드 클릭이벤트 : 팝업창 생성관련 이벤트 */
    $(".btn").click(function(){
        name = this.value
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();            
        $('#mask').css({'width' : maskWidth, 'height' : maskHeight});
        $("#mask").fadeTo( "slow", 0.5 )
        $(".companionView").show()
    }) 

    $("#comclose").click(function(){ 
        $("#viewMenu").hide()
        $("#mask").hide()
        $(location).attr("href", "myHomeMain.html?heart=100"+"&name="+(name));
    })


    /* click event */
    $(".privacy").click(function(){
        document.body.classList.toggle('flipped')
    })


    /* 게임 이벤트 */
    $("#gameStart").click(function(){
        $("#world").hide()
        $("#game").show()				
    })



})


function maskshow(){
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();            
    $('#mask').css({'width' : maskWidth, 'height' : maskHeight});
    $("#mask").fadeTo( "slow", 0.5 )

}

function findhome() {
    new daum.Postcode({
        oncomplete: function(data) {

            var addr = '';
            var extraAddr = ''; 

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else { 
                addr = data.jibunAddress;
            }

         
            if(data.userSelectedType === 'R'){

                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }

                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();

        }
    }).open();
}