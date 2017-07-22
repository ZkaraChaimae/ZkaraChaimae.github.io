$(function() {
    /********************    game time variable       **************/
    var time =120;
    /********************    game score variable      **************/
    var score = 0;
    var countScoreKas = 0;
    var kasScore = 0;
    var kas3amer = 0;
    /******************** berads number  ***************************/
    // var beradNumber = 3;
    var beradId = 0;
    // var lastActivated = 0;
    var beradIsActive = 0;
    /*********************** passing between vues *****************/
    var div1 = document.getElementById('begincontent');
    var div2 = document.getElementById('gamecontent');
    var div3 = document.getElementById('endcontent');

    // var next = document.getElementById('helloGame');
    var end = document.getElementById('endGame');

    div1.style.display = 'block';
    div2.style.display = 'none';
    div3.style.display = 'none';
    /**** play after shoosing tea */
    $('#helloGame').click( function() {
        div1.style.display = 'none';
        div2.style.display = 'block';
        div3.style.display = 'none';
        setTimeout(startGame, 3000);
        setTimeout(countTime, 3000);
        setTimeout(function(){
            time = 120;
        },3000);

    });

    /** play before shoosing tea  */
    $('#douz').click(function() {
        div1.style.display = 'none';
        div2.style.display = 'block';
        div3.style.display = 'none';
        setTimeout(startGame, 3000);
        setTimeout(countTime, 3000);
        setTimeout(function(){
            time = 120;
            document.getElementById('timeValue').innerHTML = time;
        },3000);

    });
    /*** game over */
    end.addEventListener("click", function() {
        div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'block';
        flyingWords();
        time = 0;
        document.getElementById('timeValue').innerHTML = time;
        $('#endGame').css("display","none");
        $('#replay').css("display","block");
        clearInterval(stopCount);
    });
    $('#replay').click(function() {
        div1.style.display = 'none';
        div2.style.display = 'block';
        div3.style.display = 'none';
        /*********** set values of variables : score, time etc... */
        time = 120;
        score = 0;
        countScoreKas = 0;
        kasScore = 0;
        kas3amer = 0;
        beradId = 0;
        beradIsActive = 0;
        document.getElementById('scoreValue').innerHTML = score;
        document.getElementById('siniaValue').innerHTML = kasScore;
        document.getElementById('kasValue').innerHTML = kas3amer;
        $('.finalScore').html(0);
        document.getElementById('timeValue').innerHTML = time;
        $('#replay').css("display","none");
        $('#endGame').css("display","block");

        setTimeout(startGame, 3000);
        setTimeout(countTime, 3000);
        setTimeout(function(){
            time = 120;
            document.getElementById('timeValue').innerHTML = time;
        },3000);
    });

    /********************    text welcome flying      **************/
    var flyingWords = function() {
        setTimeout(function() {
            $('.text-welcome-fly').removeClass('hidden');

        }, 500);
    }
    flyingWords();
    /**************** random time for berad  ********************/

    var activateBerad = function(id) {
        var thisAtay = document.querySelector("#atay" + id);
        var thisBerad = document.querySelector("#berad" + id);
        if (thisBerad.classList.contains('toRotate')) {

            thisBerad.classList.remove('toRotate');
            thisAtay.classList.add('atay');
            beradIsActive = 0;

        } else {

            thisBerad.classList.add('toRotate');
            thisAtay.classList.remove('atay');
            beradIsActive = id;
        }
    }


    function randomizator(a, b) {
        return Math.floor(Math.random() * b) + a;
    }

/************ function start game **********/
    function startGame() {
        if (!beradIsActive) {
            beradId = randomizator(1, 3);
            // if (beradId != lastActivated)

        }
        if(time){
            activateBerad(beradId);
            setTimeout(startGame, randomizator(1000, 2000));
        }else{
                if(beradIsActive){
                activateBerad(beradId);
            }
            div1.style.display = 'none';
            div2.style.display = 'none';
            div3.style.display = 'block';
            flyingWords();
            time = 0;
            document.getElementById('timeValue').innerHTML = time;
            $('#endGame').css("display","none");
            $('#replay').css("display","block");
            clearInterval(stopCount);
        }
            

    }
/***************** function count time ******************/
     var stopCount;
    function countTime() {
        stopCount = setInterval(function(){
            if(time)
            time--;
            document.getElementById('timeValue').innerHTML = time;
        },1000);
    }
/******************* score counting ********************/

    setInterval(function() {
        if (beradIsActive != 0) {
            var thisAtay = document.querySelector("#atay" + beradIsActive);
            var offesetKas = document.querySelector("#player").offsetLeft;
            if (offesetKas + 2 <= thisAtay.offsetLeft && thisAtay.offsetLeft <= offesetKas + 80) {
                score+=4;
                countScoreKas+= beradIsActive;
                kas3amer = countScoreKas/4;
                if(25 <= countScoreKas && countScoreKas <= 50){
                    $("#player").attr('src','photos/p1.png');
                }else
                    if(50 <= countScoreKas && countScoreKas <= 100){
                        $("#player").attr('src','photos/p2.png');
                    }else
                        if(100 <= countScoreKas && countScoreKas <= 150){
                            $("#player").attr('src','photos/p3.png');
                        }else
                            if(200 <= countScoreKas && countScoreKas <= 250){
                                $("#player").attr('src','photos/p4.png');
                            }else
                                if(250 <= countScoreKas && countScoreKas <= 300){
                                    $("#player").attr('src','photos/p5.png');
                                }else
                                    if(350 <= countScoreKas && countScoreKas <= 400){
                                        $("#player").attr('src','photos/p6.png');
                                    }else
                                        if(400 <= countScoreKas){
                                            $("#player").attr('src','photos/p0.png');
                                            countScoreKas = 0;
                                            kasScore++;
                                        }
                document.getElementById('scoreValue').innerHTML = score;
                document.getElementById('siniaValue').innerHTML = kasScore;
                document.getElementById('kasValue').innerHTML = kas3amer;
                $('.finalScore').html(score + kasScore * 50);

            }
            else{

                if(score)
                score--;
                document.getElementById('scoreValue').innerHTML = score;
                $('.finalScore').html(score + kasScore * 50);
            }

        }
    }, 50);

    /*
   
    */
    /**************** event keyboard moving the cup *****************/
    var x = 80;
    $(document).keydown(function(e) {
        //alert(e.keyCode);
        var position = $("#player").position();
        //width of the div containing the cup
        var width = $("#gamecontent").width();
        switch (e.keyCode) {
            case 37: //left
                if (x >= 80) {
                    $("#player").css('left', position.left - 20 + 'px');
                    x = x - 19;
                }
                break;

            case 39: //right
                if (x <= width -80) {
                    $("#player").css('left', position.left + 20 + 'px');
                    x = x + 19;
                }
                break;
        }
    });
});


/********************* animate images animate.css *******************/
function animationHover(element, animation){
element = $(element);
element.hover(
    function() {
        element.addClass('animated ' + animation);        
    },
    function(){
        //wait for animation to finish before removing classes
        window.setTimeout( function(){
            element.removeClass('animated ' + animation);
        }, 2000);         
    });
}
function animationClick(element, animation){
element = $(element);
element.click(
    function() {
        element.addClass('animated ' + animation);        
        //wait for animation to finish before removing classes
        window.setTimeout( function(){
            element.removeClass('animated ' + animation);
        }, 2000);         

    });
 }
function animation(element, animation){
element = $(element);
 element.addClass('animated ' + animation);        
//wait for animation to finish before removing classes
window.setTimeout( function(){
    element.removeClass('animated ' + animation);
}, 2000);  
 }

$(document).ready(function(){
    $('.toAnimate').each(function() {
        animationClick(this, 'hinge');
    });
});

/************* first vue ************************/
$('#stockUser').click(function(){
    
    if( document.querySelector('input').value != ''){
        $('#welcomeBerad').each(function() {
        animation(this, 'hinge');
        setTimeout(function(){
            $('#welcomeBerad').css('display','none');
        },2000)
        });
        $('.shakeMe').each(function() {
            animation(this, 'shake');
        });
        document.getElementById('playerValue').innerHTML = document.querySelector('input').value;
        setTimeout(function(){
            $('#load').css('display','block');
            $('#load').each(function() {
            animation(this, 'shake');
            });
            setTimeout(function(){
                $('#load').each(function() {
                animation(this, 'bounce');
                });
            } ,2000);
            setTimeout(function(){
                $('#eddekka').css('display','none');
                $('#l3eb').css('display','block');
                $('.text-welcome-fly').addClass('hidden');
            },4000);
        },2000);
    }else{
        alert('Gul smitk b3da !');
    }

});
/*********** second vue *******************/
$('#correct1').click(function(){
   $('.step1').css('display','none');
   $('.step2').css('display','block');
});
$('#correct2').click(function(){
   $('.step2').css('display','none');
   $('.step3').css('display','block');
});
$('#correct3').click(function(){
   $('.step3').css('display','none');
   $('.step4').css('display','block');
});
$('#correct4').click(function(){
   $('.step4').css('display','none');
   $('.stepF').css('display','block');
});
$('#correctF').click(function(){
   $('.stepF').css('display','none');
   $('#ameratay').css('display','none');
   $('#douz').css('display','none');
   $('#helloGame').css('display','block');
});