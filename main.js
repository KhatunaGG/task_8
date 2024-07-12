const http = require("http");
const url = require("url");
const axios = require("axios");
const { readData, writeData } = require("./utils");

// Create a server that responds to several paths:
// /html should return any HTML code.
// /api should return an object such as animals, users, etc.
// /time should return the current time in ISO string format.
// Any other request should return "Not Found".

// const getUsers = async () => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     const data = response.data;

//     await writeData("data.json", data);
//   } catch (er) {
//     console.log(er);
//   }
// };

// const server = http.createServer(async (req, res) => {
//   const newUrl = url.parse(req.url);

//   if (newUrl.pathname === "/html") {
//     res.setHeader("content-type", "text/html");
//     res.write(`
//                 <!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Document</title>
//                 </head>
//                 <body>
//                      <img src="https://pixels.com/images/HomepageProductPoster.jpg" alt="">
//                 </body>
//                 </html>
//     `);
//     return res.end();

//   } else if (newUrl.pathname === "/api") {
//     const usersData = await readData("data.json");
//     res.setHeader("content-type", "application/json");
//     res.write(usersData);
//     return res.end();

//   } else if (newUrl.pathname === "/time") {
//     res.setHeader("content-type", "application/json");
//     res.write(JSON.stringify(new Date().toISOString()));
//     return res.end();
//   }else {
//     res.setHeader('content-type', 'application/json')
//     res.write(JSON.stringify({status: '404', message: 'Not found'}))
//     return res.end()
//   }
// });

// server.listen(3005, () => {
//   console.log("Server is running on port http://localhost:3005");
// });

// Create another server with two methods:
// /movie that returns a random movie title, genre, director, and year.
// /number that returns a random number between 1 and 1000, and check if
// the random number is 111, 222, 333, 444, ... 999, then return "You win the jackpot!"
// or something similar.

const server = http.createServer(async (req, res) => {
  const newUrl = url.parse(req.url, true);

  if (newUrl.pathname === "/movie") {
    const movieData = await readData("moviedata.json");
    const parseData = JSON.parse(movieData);
    const newData = [];
    parseData.map((el) =>
      newData.push({ title: el.title, year: el.year, category: el.category })
    );
    const randomeMovieNumber = Math.floor(Math.random() * newData.length);
    const randomMovie = newData[randomeMovieNumber];

    res.setHeader("content-type", "application/json");
    res.write(JSON.stringify(randomMovie));
    return res.end();
  } else if (newUrl.pathname === "/number") {
    const randomNumber = Math.floor(Math.random() * 1000);
    const newRandomNum = randomNumber.toString().split("");

    let isEqual = true;
    let firstNum = newRandomNum[0];
    for (let num of newRandomNum) {
      if (num !== firstNum) {
        isEqual = false;
        break;
      }
    }

    if (isEqual) {
      res.setHeader("content-type", "application/json");
      res.write(
        JSON.stringify({
          'Random number': randomNumber,
          message: "You win the jackpot!",
        })
      );
      return res.end();
    } else {
      res.setHeader("content-type", "application/json");
      res.write(
        JSON.stringify({ 'Random number': randomNumber, massege: "Try one more time" })
      );
      return res.end();
    }
  }
});

server.listen(3004, () => {
  console.log("Server is running on port http://localhost:3004");
});
