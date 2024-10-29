const $image = $('#image');
const $cropBtn =  $('#cropImageBtn');
const $uploadBtn = $('#uploadImageBtn');
const $imageCropped = $('#img-cropped');

let imageHeight = height;
let imageWidth = width;

var width = 1;
var height = 1;

$image.cropper.setDefaults({
viewMode: 1,
dragMode: 'move',
autoCropArea: 1,
restore: false,
center: false,
cropBoxMovable: false,
cropBoxResizable: false,
toggleDragModeOnDblclick: false,
zoomable: false,
background:false,
guides: false,
center: false,
});

cropperInit();

function cropperInit() {
    $image.cropper({
    aspectRatio: width/height,
    crop: function(event) {
      canvas = $image.cropper("getCroppedCanvas", {
      }); 
    }
    });
}

$cropBtn.on('click', function cropCanvas(){
  $("#img-cropped").empty();
  $imageCropped.append(canvas);
});

$uploadBtn.on('click', function cropCanvas(){
  var croppedcanvas = $image.cropper("getCroppedCanvas").toDataURL("image/png",0.5);
  window.parent.postMessage(croppedcanvas, "*");
  console.log(croppedcanvas);
});

function cropperDestory() {
  $image.cropper("destroy"); 
}


function updateCropperImage(url) {
  $image.attr("src" , url);
  refreshCropper();
}

function refreshCropper() {
  cropperDestory();
  cropperInit();
}


window.onmessage = e => {
  let {data} = e;
  if(data.toUpdateImageURL) {
      width = data.widthupdate;
      height = data.heightupdate;

      let url = data.updateImageURL;
      updateCropperImage(url);
      
  
  }
}



