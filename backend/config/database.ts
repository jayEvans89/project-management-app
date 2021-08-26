
import Mongoose from 'mongoose';

let database: Mongoose.Connection;

export const databaseConnect = () => {
  const uri = 'mongodb://localhost:27017/projectManagementApp';

  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once('open', async () => {
    console.log('Connected to database');
  });

  database.on('error', () => {
    console.log('Error connecting to database');
  });

  return
};

export const databaseDisconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();
};
