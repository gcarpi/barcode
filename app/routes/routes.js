'use strict';

module.exports = (app, base64Img, fs, cryptoRandomString) => {

  app.get('/barcode', (req, res) => {

    res.render('barcode', {

      title: 'Barcode Test',
      layout: 'barcode',
      template: 'barcode'

    });

  });

  app.post('/send-barcode', (req, res) => {

    let path = 'public/src/img';
    let barcodeImageName = cryptoRandomString(30);

    base64Img.img(req.body.img, path, barcodeImageName, (err, filepath) => {

      if (err) console.log(err);

      else {

        let exec = require('child_process').exec;

        let child = exec(`java -jar zxing.jar ${filepath}`, (error, stdout, stderr) => {

            if (error !== null) {

              console.log("Error:  " + error);

            } else {

              console.log(stdout);

              // let result = stdout
              //   .substring(stdout.indexOf("Raw result:"), stdout.indexOf("Parsed result:"))
              //   .split(':')[1]
              //   .replace(/\n/g, '');
              // 
              // res.send(JSON.stringify({
              // 
              //   barcode: result
              // 
              // }));

            }

            // fs.unlink(path + '/' + barcodeImageName + '.jpg', (err) => {
            // 
            //   err ? console.error(`Error: ${err}`) : console.log('File has been Deleted');
            // 
            // });

          }

        );

      }

    });

  });

}