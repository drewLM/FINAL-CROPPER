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
    });
}

const conpressFigure = {
  maxSize: 150,
  maxWidth: 300,
  maxHeight: 300
}

$cropBtn.on('click', function cropCanvas(){
  $("#img-cropped").empty();
  const cropCVS = $image.cropper("getCroppedCanvas", {  });
  let  base64Crop = cropCVS.toDataURL('image/jpeg',0.5);
  let img = new Image()
  img.src = base64Crop
  img.onload = function () {
    const originWidth = this.width
    const originHeight = this.height
    const maxSize = conpressFigure.maxSize
    const maxWidth = conpressFigure.maxWidth
    const maxHeight = conpressFigure.maxHeight
    let targetWidth = originWidth
    let targetHeight = originHeight
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        targetWidth = maxWidth
        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
      } else {
        targetHeight = maxHeight
        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
      }
  }
  let canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  let context = canvas.getContext('2d')
  context.drawImage(img, 0, 0, canvas.width, canvas.height)
  let compressRatio = 100
    let newImg
    do {
      compressRatio -= 2
      newImg = canvas.toDataURL("image/jpeg", compressRatio / 100)
    } while (Math.round(0.75 * newImg.length / 1000) > maxSize)
      console.log(newImg)
      window.parent.postMessage(newImg, "*");
}


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



