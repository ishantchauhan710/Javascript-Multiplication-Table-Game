var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;


// When start/reset button clicked
document.getElementById("startreset").onclick = function () {
    // If we are playing
    if(playing==true) {
        // Reload page
        location.reload();
    } 
     // If we are not playing
    else {
        playing=true;
        // Set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML = score;
        
        // Show countdown box
        show("timeremaining");
        
        timeRemaining = 60;
        
        hide("gameover")
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        // Change button text to reset
     document.getElementById("startreset").innerHTML = "Reset Game";
        
        // Start countdown
        startCountdown();
        
        // generate a new Q&A
        generateQA();
        
        
    }
    
}

for(i=1; i<5; i++) {
    document.getElementById("box"+i).onclick = function() {
    if(playing==true) {
        if(this.innerHTML == correctAnswer) {
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            hide("wrong")
            show("correct")
            setTimeout(function() {
                hide("correct");
            },1000);
            generateQA();
        } else {
            // Wrong Answer
                hide("correct")
            show("wrong")
            setTimeout(function() {
                hide("wrong");
            },1000);
        }
    }
    
}
}






function startCountdown() {
    action = setInterval(function(){
        timeRemaining -= 1;
         document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        if(timeRemaining==0) {
            // Game Over
            stopCountdown();
            
            show("gameover");
             document.getElementById("gameover").innerHTML = "<p>GAME OVER!</p><p>Your score is " + score + "</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
            
            
            
        }
        
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function hide(Id) {
 document.getElementById(Id).style.display="none";
}

function show(Id) {
 document.getElementById(Id).style.display="block";
}

function generateQA() {
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    
    //Fill other boxes
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++) {
        if(i!=correctPosition) {
            var wrongAnswer;
            
            do {
            
            wrongAnswer = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
                
            } while(answers.indexOf(wrongAnswer)>-1);
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
    
    
}

