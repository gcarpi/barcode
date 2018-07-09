Webcam.on('live', function() {

  var i = 0;

  setTimeout(function() {

    take_snapshot();

  }, 3000);

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
        .then(data => {

          if (data.statusCode == 200) {

            document.getElementById("barcode-container").remove();
            document.getElementById("barcode-result").style.display = 'block';
            document.getElementById("result").value = data.barcode;

            stop_snapping();

          } else if (data.statusCode == 404 && i < 10) {

            i++;
            take_snapshot();

          } else if (i === 10) {

            alert('Tentativas esgotadas');

          }

        });

    });

  }

  function stop_snapping() {

    Webcam.reset();

  }

});
