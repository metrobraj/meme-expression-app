//the brain of our operation
//const is constant, that creates the variable
//document refers to the html webpage as an object
//getelementbyid is a function that searches thru html file, finds the elements we need to find
const webcamElement = document.getElementById("webcam");
const memework = document.getElementById("memedisplay");
//this is for the green skeleton lines on ur hand which look cool ig
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
//this is our hands instance, an ai object - hand tracking engine
const hands = new Hands({
    //this will redirect to the link when mediapipe needs extra model data and stuff
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
//this confirms precision of our ai detector
hands.setOptions({
    //the ai tracks a maximum of 1 hand at a time, this keeps performance better, since processing power isnt wasted on looking for a second hand
    maxNumHands: 1,
    //model complexity is basically 0 or 1, where
    //zero is fastest, while 1 is full/accurate. we'll get better precision with 1
    modelComplexity: 1,
    //ranges from 0-1. this defines how confident the ai must be on a range of 0-100%
    //the ai must be 50% confident that it detects the hand
    minDetectionConfidence: 0.5,
    //this sets the confidence required to keep tracking the hand
    minTrackingConfidence: 0.5
});
//we create a function that mediapipe calls when it finishes analyzes a frame of the webcam stream
//the results is an object provided by mediapipe, that contains all data in the frame
hands.onResults((results) => {
    //results.multiHandLandmarks is an array that holds the detected hands. if no hand, this will be empty. the length > 0 means more than 0 hand is detected
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if(results.multiHandLandmarks && results.multiHandLandmarks.length>0){
        //since maxNumHands is 1, we'll use the first hand in array which is [0]
        const landmarks = results.multiHandLandmarks[0];

        // drawing the green lines
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: '#00FF00',
            lineWidth: 1
        });

        // drawing the joint dots
        drawLandmarks(canvasCtx, landmarks, {
            color: '#ff0000',
            lineWidth: 0.5,
            radius: 2
        });
        //we use another helper function detect, which we will use to analyze our 21 landmarks.
        //detect(landmarks);
        //temporary test
        //console.log("Hand detected!", landmarks);
    } else{
        //if no hand's visible, we'll use this
        memework.src = "assets/default stare.jpg"
    }
    canvasCtx.restore();
});
//finally, we make the tracking real
function detect(landmarks){
    //this will grab the landmarks of our index fingers tip and knuckle
    const indextip = landmarks[8];
    const indexknuckle = landmarks[6];
    //this will grab landmarks of middle finger tip and knuckle
    const middletip = landmarks[12];
    const middleknuckle = landmarks[10];
    //we check if index finger is extended up and middle finger is down
    const indexup = indextip.y<indexknuckle.y;
    const middledown = middletip.y>middleknuckle.y;


    if(indexup && middledown){
        memework.src = "assets/nerd.jpg";
    }
    else if(indextip.y>middletip.y && indexknuckle.y>middleknuckle.y){
        memework.src= "assets/freedom.jpg";
    }
    else{
        memework.src = "assets/default stare.jpg";
    }

}

//we now link our webcam stream
//async means the js pauses till webcam perms are allowed without crashing the site.
async function webcamreq(){
    //our safety net
    try{
        //this gains access to hardware, video:true means we only need video, await means to wait till perms are granted
        const stream = await navigator.mediaDevices.getUserMedia({video:true});
        //stream holds live cam data

        webcamElement.srcObject = stream;
        //the mediapipe cam loop begins here
        const camera = new Camera(webcamElement, {
            onFrame: async() => {
                await hands.send({ image:webcamElement});
            },
            width:640,
            height:480
        });
        await camera.start();
    } catch(error){
        console.error("Oops! we could not access your webcam. Maybe you forgot to give permission?\nWhat went wrong?", error);
    }
}
webcamreq();