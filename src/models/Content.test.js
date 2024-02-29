const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Content = require('../models/Content'); // Update the path as necessary

describe('Content Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('create & save content successfully', async () => {
    const postData = { title: 'Test Post', body: 'This is a test post.', author: new mongoose.Types.ObjectId() };
    const validContent = new Content(postData);
    const savedContent = await validContent.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedContent._id).toBeDefined();
    expect(savedContent.title).toBe(postData.title);
  });

  // Add more tests as needed
});
