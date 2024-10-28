const $image = $('#image');

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
