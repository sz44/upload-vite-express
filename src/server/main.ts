import express from "express";
import path from "path";
import ViteExpress from "vite-express";
import fileupload from "express-fileupload";

const app = express();

app.use(fileupload());

app.get("/v", (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'vanilla', 'index.html'));
});
app.get("/upload", (req, res) => {
  res.send("upload to this route");
})

app.post("/upload", (req, res) => {
  console.log(req.files);
  res.status(200).send({ message : "upload successful" });
  let myFile = req.files?.img as fileupload.UploadedFile;
  // let fileName = req.files?.img.
  myFile.name;
  // console.log(fileName);
//   const path = __dirname + '/images/' + fileName;
//   const image = req.files?.myFile;

//   image.mv(path, (error) => {
//     if (error) {
//       console.error(error)
//       res.writeHead(500, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify({ status: 'error', message: error }))
//       return
//     }

//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     })
//     res.end(JSON.stringify({ status: 'success', path: '/img/houses/' + fileName }))
//   })
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
