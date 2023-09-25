// const axios = require("axios");
// //const imagen_default = require("../images/image_default.jpg");

// async function getDrivers() {
//   const apiUrl = "http://localhost:5000/db.json";

//   const drivers = await axios.get(`${apiUrl}/drivers`);
//   const allDrivers = drivers.map((driver) => {
//     return {
//       id: driver.id,
//       forename: driver.name.forename,
//       surname: driver.name.surname,
//       description: driver.description,
//       image: driver.image.url
//         ? driver.image.url
//         : "https://img.freepik.com/foto-gratis/coche-deportivo-brillante-conduciendo-pista-deportiva-iluminada-ia-generativa_188544-53590.jpg",
//       nationality: driver.nationality,
//       dob: driver.dob,
//     };
//   });
//   return allDrivers;
// }
// module.exports = getDrivers;
