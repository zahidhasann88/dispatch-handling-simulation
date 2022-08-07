const Sequelize = require('sequelize');

//local
const PGHOST = "localhost";
const PGDATABASE = "signal_dispatch_handler";
const PGUSER = "postgres";
const PGPASSWORD = "15Nov1998";

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
  define: {
    timestamps: false,
  },
  // logging: (...msg) => console.log(msg),
});

// // heroku
// const HEROKU_DATABASE_URL =
//     'postgres://xdizqtwlqqejgp:5ec63913d6f457c3af86187215596812f4b41f4299d9fbd27b580df0504a4339@ec2-18-214-134-226.compute-1.amazonaws.com:5432/d6k137b9135j9b';

// const sequelize = new Sequelize(HEROKU_DATABASE_URL, {
//     logging: false, // Loging disabled
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         },
//     },
// });

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
