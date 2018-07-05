(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = () => {
  
  Webcam.set({
    
    // screen width
    width: 1024,
    height: 768,

    // device capture size
    width: 1024,
    height: 768,
    
    // about image
    image_format: 'jpeg',
    jpeg_quality: 90
    
  });

  Webcam.attach('#barcode-camera');

  document.getElementById('barcode-button').addEventListener('click', () => {
  
    take_snapshot();
  
  });

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
},{}]},{},[1])