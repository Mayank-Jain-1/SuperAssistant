const mongoconnect = require("./connect/mongo");
mongoconnect().then(res => console.log(res));


// axios
//    .post(
//       "https://api.openai.com/v1/audio/transcriptions",
//       {
//          model: model,
//          file: fs.createReadStream(filepath),
//       },
//       {
//          headers: {
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//             "Content-Type": `multipart/form-data`,
//          },
//       }
//    )
//    .then((res) => {
//       const transcript = res.data.text;
//       console.log(transcript);
//    })
//    .catch((err) => {
//       console.log(err);
// });
