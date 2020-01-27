
window.onload = function () {

  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

  file.onchange = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    // find the canvas element
    var canvas = document.getElementById("canvas");

    // sizeing the canvas
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;

    // create a drawing object
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 512;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);


    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2; // set the bar width
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2.8; // set the bar height

        var r = barHeight + (250 * (i / bufferLength));
        var g = 0 * (i / bufferLength);
        var b = 0;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 3; // set space between bars        
      }

    }

    audio.play();
    renderFrame();
  };
};

// file choosen
let inputFile = document.getElementById('thefile');
let fileNameField = document.getElementById('file-name');

inputFile.addEventListener('change', function (event) {
  let uploadedFileName = event.target.files[0].name;
  fileNameField.textContent = uploadedFileName;
});

