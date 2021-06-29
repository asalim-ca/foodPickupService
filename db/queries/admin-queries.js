const db = require('../db');

const findAdminbyEmail = (email) => {
  return db.query('SELECT * FROM admins WHERE email = $1;', [email])
    .then((response) => {
        return response.rows[0];
    });
};

const findAdminbyId = (id) => {
  return db.query('SELECT * FROM admins WHERE id = $1;', [id])
    .then((response) => {
        return response.rows[0];
    });
};
module.exports = {
  findAdminbyEmail,
  findAdminbyId
};
