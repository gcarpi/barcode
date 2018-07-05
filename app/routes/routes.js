'use strict';

module.exports = (app, fs, cryptoRandomString, jimp) => {

  app.get('/barcode', (req, res) => {

    res.render('barcode', {

      title: 'Barcode Test',
      layout: 'barcode',
      template: 'barcode'

    });

  });

  app.post('/send-barcode', (req, res) => {

    let $file = 'public/src/img/' + cryptoRandomString(30) + '.jpg';

    let image = req.body.img.replace(/^data:image\/\w+;base64,/, "");
    let buffer = new Buffer(image, 'base64');


    jimp.read(buffer)
      .then(resp => {

        return resp.crop(0, 234, 1024, 300).write($file)

      })
      .then(() => {

        let exec = require('child_process').exec;

        let child = exec(`java -jar zxing.jar ${$file}`, (error, stdout, stderr) => {

            if (error !== null) {

              console.log("Error:  " + error);

            } else {

              let dataStringify = JSON.stringify(stdout.replace('\n', ''));
              // let dataJSON = JSON.parse(dataStringify);
              
              console.log(dataStringify);

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

            // fs.unlink($file, (err) => {
            // 
            //   err ? console.error(`Error: ${err}`) : console.log('File has been Deleted');
            // 
            // });

          }

        );

      })
      .catch(err => {
        console.error(err)
      });


  });

}