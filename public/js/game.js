
var cssClasses = ['fade-in', 'zoom-out', 'rotate-in-center', 'bounce-top', 'roll-in-left', 'flicker-in-1', 'rotate-in-diag-1', 'rotate-in-tl',
                'slide-in-elliptic-bottom-bck', 'shake-bl']

var image = document.getElementById("question")
var getNewImage = function(){

    let ids = sessionStorage.getItem('IDs')

    if(ids.length == 0){
        window.location.href = '/';
    }

    let listID = ids.split(',').map(function(item) {
        return parseInt(item);
    });

    let item = listID[Math.floor(Math.random()*listID.length)];

    let repeate = sessionStorage.getItem('repeate')
    if(repeate == 'true'){
        let index = listID.indexOf(item);
        if (index !== -1) {
            listID.splice(index, 1);
        }
    }
    
    sessionStorage.setItem('IDs', listID)

    $.ajax({
        url: '/getNewImage',
        type: 'POST',
        dataType: 'json',
        data: {
           id: item
        }
    }).done(function(result) {
        image.setAttribute('src', '/images/' + result.data.link)
        let item = cssClasses[Math.floor(Math.random()*cssClasses.length)];
        image.setAttribute('class', item)
    })

}
var sound1 = new Audio("/music/play1.mp3");

var btnButton = document.getElementById('playCard')
const progress = document.querySelector('.progress-done');
btnButton.addEventListener("click", function(e){
    //getNewImage()
    sound1.currentTime = 0
    sound1.play();
    image.setAttribute('class', '');
    let i = 1
    let lock = setInterval(()=>{
        progress.style.width = i*10 + '%';
        progress.style.opacity = 1;
        progress.innerHTML = i*10 + '%'
        i += 1
    }, 1000)

    setTimeout(() => { clearInterval(lock); getNewImage()}, 10000);
});

const open = document.getElementById('btnCircle')
const modal_container = document.getElementById('modal_container')
const close = document.getElementById('btnClose')

open.addEventListener('click', ()=>{
    modal_container.classList.add('show')
})

close.addEventListener('click', ()=>{
    modal_container.classList.remove('show')
})

const exit = document.getElementById("btnExit")
exit.addEventListener('click', function(){
    window.location.href = "/";
})

/* ===================================== */
   // Create new wheel object specifying the parameters at creation time.
var theWheel = new Winwheel({
    'numSegments'  : 10,     // Specify number of segments.
    'outerRadius'  : 120,   // Set outer radius so wheel fits inside the background.
    'textFontSize' : 10,    // Set font size as desired.
    'segments'     :        // Define segments including colour and text.
    [
    {'fillStyle' : '#F4BFBF', 'text' : 'Number 1'},
    {'fillStyle' : '#81B214', 'text' : 'Number 2'},
    {'fillStyle' : '#827397', 'text' : 'Number 3'},
    {'fillStyle' : '#F9B208', 'text' : 'Number 4'},
    {'fillStyle' : '#C2DED1', 'text' : 'Number 5'},
    {'fillStyle' : '#CDC2AE', 'text' : 'Number 6'},
    {'fillStyle' : '#440047', 'text' : 'Number 7'},
    {'fillStyle' : '#92B4EC', 'text' : 'Number 8'},
    {'fillStyle' : '#FFD24C', 'text' : 'Number 9'},
    {'fillStyle' : '#F47C7C', 'text' : 'Number 10'},
    {'fillStyle' : '#242F9B', 'text' : 'Number 11'},
    {'fillStyle' : '#FF2442', 'text' : 'Number 12'},
    {'fillStyle' : '#00FFAB', 'text' : 'Number 13'},
    {'fillStyle' : '#4B8673', 'text' : 'Number 14'},
    {'fillStyle' : '#FF06B7', 'text' : 'Number 15'},
    {'fillStyle' : '#EEEEEE', 'text' : 'Number 16'},
    {'fillStyle' : '#CAD315', 'text' : 'Number 17'},
    {'fillStyle' : '#A760FF', 'text' : 'Number 18'},
    {'fillStyle' : '#235952', 'text' : 'Number 19'},
    {'fillStyle' : '#F9CEEE', 'text' : 'Number 20'},
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 15,
        'spins'    : 8,
        'callbackFinished' : alertPrize,
        'callbackSound'    : playSound,   // Function to call when the tick sound is to be triggered.
        'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
    },
    'pins' :
    {
        'number' : 16   // Number of pins. They space evenly around the wheel.
    }
});

// -----------------------------------------------------------------
// This function is called when the segment under the prize pointer changes
// we can play a small tick sound here like you would expect on real prizewheels.
// -----------------------------------------------------------------
var audio = new Audio('/music/tick.mp3');  // Create audio object and load tick.mp3 file.

function playSound()
{
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters
// note the indicated segment is passed in as a parmeter as 99% of the time you will want to know this to inform the user of their prize.
// -------------------------------------------------------
function alertPrize(indicatedSegment)
{
    // Do basic alert of the segment text.
    // You would probably want to do something more interesting with this information.
    alert("You have won " + indicatedSegment.text);
}

// =======================================================================================================================
// Code below for the power controls etc which is entirely optional. You can spin the wheel simply by
// calling theWheel.startAnimation();
// =======================================================================================================================
var wheelPower    = 0;
var wheelSpinning = false;

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    resetWheel()
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false)
    {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        theWheel.animation.spins = 15;

        // // Disable the spin button so can't click again while wheel is spinning.
        // document.getElementById('spin_button').src       = "spin_off.png";
        // document.getElementById('spin_button').className = "";

        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;

    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    // document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
    // document.getElementById('pw2').className = "";
    // document.getElementById('pw3').className = "";

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

var number = document.getElementById("number")
number.addEventListener('change', (e)=>{
    theWheel = new Winwheel({
        'numSegments'  : parseInt(e.target.value),     // Specify number of segments.
        'outerRadius'  : 120,   // Set outer radius so wheel fits inside the background.
        'textFontSize' : 10,    // Set font size as desired.
        'segments'     :        // Define segments including colour and text.
        [
            {'fillStyle' : '#F4BFBF', 'text' : 'Number 1'},
            {'fillStyle' : '#81B214', 'text' : 'Number 2'},
            {'fillStyle' : '#827397', 'text' : 'Number 3'},
            {'fillStyle' : '#F9B208', 'text' : 'Number 4'},
            {'fillStyle' : '#C2DED1', 'text' : 'Number 5'},
            {'fillStyle' : '#CDC2AE', 'text' : 'Number 6'},
            {'fillStyle' : '#440047', 'text' : 'Number 7'},
            {'fillStyle' : '#92B4EC', 'text' : 'Number 8'},
            {'fillStyle' : '#FFD24C', 'text' : 'Number 9'},
            {'fillStyle' : '#F47C7C', 'text' : 'Number 10'},
            {'fillStyle' : '#242F9B', 'text' : 'Number 11'},
            {'fillStyle' : '#FF2442', 'text' : 'Number 12'},
            {'fillStyle' : '#00FFAB', 'text' : 'Number 13'},
            {'fillStyle' : '#4B8673', 'text' : 'Number 14'},
            {'fillStyle' : '#FF06B7', 'text' : 'Number 15'},
            {'fillStyle' : '#EEEEEE', 'text' : 'Number 16'},
            {'fillStyle' : '#CAD315', 'text' : 'Number 17'},
            {'fillStyle' : '#A760FF', 'text' : 'Number 18'},
            {'fillStyle' : '#235952', 'text' : 'Number 19'},
            {'fillStyle' : '#F9CEEE', 'text' : 'Number 20'},
        ],
        'animation' :           // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 15,
            'spins'    : 8,
            'callbackFinished' : alertPrize,
            'callbackSound'    : playSound,   // Function to call when the tick sound is to be triggered.
            'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
        },
        'pins' :
        {
            'number' : 16   // Number of pins. They space evenly around the wheel.
        }
    });
})

var play = document.getElementById('btnPlay')

play.addEventListener('click', function(){
    startSpin();
})
