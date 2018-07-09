(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])