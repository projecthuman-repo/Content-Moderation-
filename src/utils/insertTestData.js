const mongoose = require('mongoose');
const Report = require('../models/Report'); // Adjust the path as necessary

require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  const insertTestData = async () => {
    try {
      const minimalData = {
        documentID: "12345",
        requestDetails: {},
        reportedContent: {},
        reportedUser: {},
        reason: "Test reason",
        moderationOutcome: "",
        status: "pending"
      };
      const report = new Report(minimalData);
      await report.save();
      console.log("Minimal test data inserted successfully!");
    } catch (error) {
      console.error("Failed to insert minimal test data:", error);
    } finally {
      mongoose.disconnect();
    }
  };
  
  insertTestData();
  

insertTestData();