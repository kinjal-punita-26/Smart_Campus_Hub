// @desc    Calculate SGPA by proxying the Java Microservice
// @route   POST /api/calc/sgpa
// @access  Private (All Roles)
const calculateSGPA = async (req, res) => {
    try {
        const { courses } = req.body;

        // Use native fetch to call the local Java Spring Boot Service
        const response = await fetch('http://localhost:8080/api/calculate/sgpa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courses })
        });

        if (!response.ok) {
            throw new Error(`Java Service Returned an Error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        if (error.message.includes('ECONNREFUSED') || error.code === 'ECONNREFUSED') {
            res.status(503).json({
                message: 'Java Calculation Microservice is currently offline. Please run the Spring Boot application on port 8080.'
            });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { calculateSGPA };
