const image = document.getElementById('image');

window.onmessage = e => {
    let {data} = e;
    if(data.toUpdateImageURL) {
        let width = data.widthupdate;
        let height = data.heightupdate;
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

        let url = data.updateImageURL;
        wallpaper.replace(url);
        
    }
}
