Dropzone.autoDiscover = false;
$(document).ready(() => {
    new Dropzone('#upload', {
        url: '/upload',
        maxFilesize: 100, // MB
        maxFiles: 10,
        autoProcessQueue: true,
        uploadMultiple: true,
        paramName: 'fileData',
        method: 'post',
        parallelUploads: 10
    })
});
