
const imageURL = './car.jpeg';
let vehiclePromise;
// let anprPromise;
let baseModel = "lite_mobilenet_v2";

const image = document.getElementById('image');
      image.src = imageURL;

const runButton = document.getElementById('run');
runButton.onclick = async () => {
  var vehicle_model;
  cocoSsd.load({ modelUrl: './anprplatedetectorV2/model.json' }).then((model) => {
    vehicle_model = model;

    const c = document.getElementById("canvas");
    const context = c.getContext("2d");

    var result;
    vehicle_model.detect(image).then((result) => {
      // console.log(result);
      var truckFilter;
      truckFilter = result.filter((r) => r.class == "person");
      
  
  var sourceX = 150;
  var sourceY = 0;
  var sourceWidth = 687;
  var sourceHeight = 687;
  var destY = result[0].bbox[0];
  var destX = result[0].bbox[2];
  var destWidth = result[0].bbox[1];
  var destHeight = result[0].bbox[3];


  context.drawImage(image, 0, 0);
  context.font = '10px Arial';

  console.log('number of detections: ', result.length);
  for (let i = 0; i < result.length; i++) {
    context.beginPath();
    context.rect(...result[i].bbox);
    // context.stroke();
    // context.clip();
    context.lineWidth = 1;
    context.strokeStyle = 'blue';
    context.fillStyle = 'blue';
    context.stroke();
 
    context.fillText(
        result[i].score.toFixed(3) + ' ' + result[i].class, result[i].bbox[0],
        result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
  }

});
});
}
window.onerror = function (error, url, line) {
  createLog(error + " Line - " + line, "error");
  //createLog(error+' URL:'+url+' L:'+line);
};
