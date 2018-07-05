window.onload = () => {

  Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
  });

  Webcam.attach('#my_camera');

};

function take_snapshot() {

  let $input = document.getElementById('result');

  Webcam.snap((data_uri) => {

    fetch('/send-barcode', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          img: data_uri
        })
      })
      .then(response => response.json())
      .then(data => $input.value = data.barcode);

  });

}
