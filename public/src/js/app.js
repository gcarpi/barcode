window.onload = () => {

  Webcam.set({
    width: 1024,
    height: 768,
    image_format: 'jpeg',
    jpeg_quality: 90
  });

  Webcam.attach('#barcode-camera');

  // document.getElementById('barcode-button').addEventListener('click', () => {
  // 
  //   take_snapshot();
  // 
  // });

};

function take_snapshot() {

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
      .then(data => alert(data.barcode));

  });

}