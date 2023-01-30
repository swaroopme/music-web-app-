song1="";
song1Status="";
song2="";
song2Status="";
leftWristY=0;
rightWristY=0;
leftWristX=0;
rightWristX=0;
scoreLeftWrist=0;
scoreRightWrist=0;


function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet is loaded");
}


function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);

        song2.stop();

        if(song1Status=="false"){
            song1.play();

            document.getElementById("song").innerHTML="Song1"
        }
    }

    if(scoreRightWrist>0.2){
        circle(RightWristX,RightWristY,20);

        song1.stop();

        if(song2Status=="false"){
            song2.play();

            document.getElementById("song").innerHTML="Song2"
        }
    }



    }

    function gotPoses(results){
        if(results.length>0){
            console.log(results);
        
            scoreLeftWrist=results[0].pose.keypoints[9].score;

            leftWristY=results[0].pose.leftWrist.y;
            rightWristY=results[0].pose.rightWrist.y;

            leftWristX=results[0].pose.leftWrist.x;
            rightWristX=results[0].pose.rightWrist.x;
        
        }
    }