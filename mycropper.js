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


 
  window.onmessage = e => {
    let {data} = e;
    if(data.toUpdateImageURL) {
        width = data.widthupdate;
        height = data.heightupdate;
        wallpaper.destroy();
        wallpaper = new Cropper (image, {
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
          center: false,})

        let url = data.updateImageURL;
        wallpaper.replace(url);
        
    }
}


