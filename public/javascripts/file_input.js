let textField = document.querySelector('.file_text');
let fileInput = document.querySelector('input[type="file"]');


fileInput.addEventListener('change', function(e){

    let imageName =  e.target.value;
    imageName = imageName.replace('C:\\fakepath\\', "");
    if(imageName == '') imageName = "No image selected";
    textField.innerHTML = imageName;
});