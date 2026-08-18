const db = require('../db');

function getAllConsultations(callback) {
  db.all("SELECT * FROM consultations", [], callback);
}

function createConsultation(patient_id, date, description, callback) {
  db.run(
    "INSERT INTO consultations (patient_id, date, description) VALUES (?, ?, ?)",
    [patient_id, date, description],
    function (err) {
      callback(err, { id: this.lastID, patient_id, date, description });
    }
  );
}

module.exports = { getAllConsultations, createConsultation };
