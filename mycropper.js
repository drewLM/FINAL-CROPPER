var width = 1;
var height = 1;
const image = document.getElementById('image');

let wallpaper = new Cropper(image, {
    viewMode: 1,
    aspectRatio: width/height,
    dragMode: 'move',
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

cropperInit();

function cropperInit(){
  wallpaper = new Cropper(image, {
    viewMode: 1,
    aspectRatio: width/height,
    dragMode: 'move',
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
}

function cropperDestory() {
  wallpaper.Cropper.destroy(); 
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
        refreshCropper();

        let url = data.updateImageURL;
        wallpaper.replace(url);
        
    }
}


