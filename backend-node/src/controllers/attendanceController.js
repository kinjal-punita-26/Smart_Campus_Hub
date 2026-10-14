const Attendance = require('../models/Attendance');

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
const getAttendance = async (req, res) => {
    try {
        let query = {};
        // If Student, only see their own attendance. Admin/Faculty see all.
        if (req.user.role === 'Student') {
            query.student = req.user._id;
        }

        const attendance = await Attendance.find(query)
            .populate('student', 'name email')
            .populate('faculty', 'name')
            .sort('-date');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit batch attendance
// @route   POST /api/attendance
// @access  Private (Faculty, Admin)
const submitAttendance = async (req, res) => {
    try {
        const { subject, date, records } = req.body;
        // records shape: [{ student: id, status: 'Present' }]
        const bulkOps = records.map(record => ({
            insertOne: {
                document: {
                    subject,
                    date,
                    student: record.student,
                    status: record.status,
                    faculty: req.user._id
                }
            }
        }));

        const attendance = await Attendance.bulkWrite(bulkOps);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAttendance, submitAttendance };
