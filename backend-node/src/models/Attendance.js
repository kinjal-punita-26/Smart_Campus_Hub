const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
