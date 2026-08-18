const db = require('../db');

function getAllPatients(callback) {
  db.all("SELECT * FROM patients", [], callback);
}

function createPatient(name, age, contact, callback) {
  db.run(
    "INSERT INTO patients (name, age, contact) VALUES (?, ?, ?)",
    [name, age, contact],
    function (err) {
      callback(err, { id: this.lastID, name, age, contact });
    }
  );
}

function getConsultationsByPatient(patientId, callback) {
  db.all(
    "SELECT * FROM consultations WHERE patient_id = ?",
    [patientId],
    callback
  );
}

module.exports = { getAllPatients, createPatient, getConsultationsByPatient };
