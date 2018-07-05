'use strict';

module.exports = function(app, base64Img) {

  app.get('/barcode', (req, res) => {

    res.render('barcode', {
      title: 'Barcode Test',
      layout: 'barcode',
      template: 'barcode'
    })

  });

  app.post('/send-barcode', (req, res) => {

    base64Img.img(req.body.img, './public/src/img', 'temp-barcode-img', function(err, filepath) {

      if (err) console.log(err);

      else {
        console.log(filepath);
        let exec = require('child_process').exec;

        let child = exec(`java -jar zxing.jar ${filepath}`,

          function(error, stdout, stderr) {
            
            if (error !== null) {

              console.log("Error -> " + error);

            } else {
              console.log(stdout);
              
              let result = stdout
                .substring(stdout.indexOf("Raw result:"), stdout.indexOf("Parsed result:"))
                .split(':')[1]
                .replace(/\n/g, '');
              
              res.send(JSON.stringify({
              
                barcode: result
              
              }));

            }

          }

        );

      }

    });

  });

}
