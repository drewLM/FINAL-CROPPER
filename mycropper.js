var width = 1;
var height = 1;


const image = document.getElementById('image');
const wallpaper = new Cropper(image, {
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

function updateCropperImage(url) {
  wallpaper.replace(url);
}


document.getElementById('cropImageBtn').addEventListener('click', function cropCanvas () {
    
    var canvas = wallpaper.getCroppedCanvas({
        Width: 256,
        Height: 256,
        });
    
        
    const canvasURL = canvas.toDataURL('image/jpeg');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0,0,imageWidth, imageHeight);
    const buffer = imageData.data.buffer;  

    
    document.getElementById('output').src = canvasURL;


  });
 
  window.onmessage = e => {
    let {data} = e;
    if(data.toUpdateImageURL) {
        width = data.widthupdate;
        height = data.heightupdate;

        let url = data.updateImageURL;
        updateCropperImage(url);
        
    }
}
