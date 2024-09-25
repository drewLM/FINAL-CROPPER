var width = 1;
var height = 10;

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

document.getElementById('cropImageBtn').addEventListener('click', function () {
    
    var canvas = cropper.getCroppedCanvas({
        Width: 256,
        Height: 256,
        }).toDataURL('image/png');

    document.getElementById('output').src = canvas;
    canvas.toBlob(function (blob) {
      var formData = new FormData();

      $.ajax('https://github.com/drewLM/FINAL-CROPPER/tree/15c26929813380de5e5ebbce7e3c6725ac796ba2/croppedImgs', {
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success() {
          console.log('Upload success');
          cropperDestory();
        },
        error() {
          console.log('Upload error');
          refreshCropper();
        },
      });
    }, 'image/png');


});
