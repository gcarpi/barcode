'use strict';

module.exports = function(app, queryString, render, sender, axios, multipart, FormData, base64ToImage) {

  app.get('/barcode', (req, res) => {

    res.render('barcode', {
      title: 'Barcode Test',
      layout: 'barcode',
      template: 'barcode'
    })

  });

  app.post('/send-barcode', (req, res) => {

    var base64Str = req.body.img;
    
    var path = 'public/src/img';
    
    var optionalObj = {
      'fileName': 'barcode',
      'type': 'jpeg'
    };
    
    base64ToImage(base64Str, path, optionalObj);
    
    fs.writeFile(path, new Buffer(base64Str, "base64"), function(err) {
    
      if (err) console.log('Error:' + err);
    
      else {
    
        console.log('The file has been saved!');
    
      }
    
    });
    
    
    // var exec = require('child_process').exec;
    // 
    // var child = exec(`java -jar ./zxing.jar ${req.params.img}`,
    // 
    //   function(error, stdout, stderr) {
    // 
    //     console.log('Output -> ' + stdout);
    // 
    //     if (error !== null) {
    // 
    //       console.log("Error -> " + error);
    // 
    //     }
    // 
    //   });

  });

}