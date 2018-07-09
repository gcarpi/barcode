'use strict';

module.exports = (app, fs, cryptoRandomString, jimp) => {

  // Render the test page
  app.get('/barcode', (req, res) => {

    res.render('barcode', {

      title: 'Barcode',
      layout: 'barcode',
      template: 'barcode'

    });

  });

  // Get the barcode from the API
  app.post('/send-barcode', (req, res) => {

    // Folder and file name
    let $file = 'public/src/img/' + cryptoRandomString(30) + '.jpg';

    // Get the image in base64
    let image = req.body.img.replace(/^data:image\/\w+;base64,/, "");

    // Create a buffer with the image
    let buffer = new Buffer(image, 'base64');

    // Get barcode from API
    function getBarcode() {

      let exec = require('child_process').exec;

      let child = exec(`java -jar zxing.jar ${$file}`, (error, stdout, stderr) => {
          console.log(stdout);
          let result = stdout.replace(/\n/g, '');
          let obj = {};

          if (result.match('result')) {

            result = stdout
              .substring(stdout.indexOf("Raw result:"), stdout.indexOf("Parsed result:"))
              .split(':')[1]
              .replace(/\n/g, '');

            obj = {
              statusCode: '200',
              barcode: result
            }

            res.send(JSON.stringify(obj));

            destroyImage();

          } else {

            obj = {
              statusCode: '404'
            }

            res.send(JSON.stringify(obj));

            destroyImage();

          }

        }

      );

    }

    function destroyImage() {

      fs.unlink($file, (err) => {

        err ? console.error(`Error: ${err}`) : console.log('File has been Deleted');

      });

    }
    // Use JIMP to crop the exactly barcode from image
    jimp.read(buffer)
      .then(resp => resp.crop(0, 234, 1024, 300).write($file)) // Crop and save the image
      .then(() => getBarcode()) // Get barcode from API
      .catch(err => console.error(err));

  });

}
