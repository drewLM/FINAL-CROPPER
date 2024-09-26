

var width = 1;
var height = 1;


const image = document.getElementById('image');
const cropper = new Cropper(image, {
    viewMode: 1,
    dragMode: 'move',
    aspectRatio: width / height,
    autoCropArea: 1,
    restore: false,
    center: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
    zoomable: false,
    background: false,
    guides: false,
    center: false,
});

function reloadCropper () {
  cropper.replace(url);
}


document.getElementById('cropImageBtn').addEventListener('click', function cropCanvas () {
    
    var canvas = cropper.getCroppedCanvas({
        Width: 256,
        Height: 256,
        });
    
        
    const canvasURL = canvas.toDataURL('image/jpeg');


    
    document.getElementById('output').src = canvasURL;


  });
 
  window.onmessage = e => {
    let {data} = e;
    if(data.toUpdateImageURL) {
        width = data.widthupdate;
        height = data.heightupdate;

        let url = data.updateImageURL;
        reloadCropper(url);
        
    
    }
}
