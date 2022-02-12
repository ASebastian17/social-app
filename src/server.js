import mongoose from 'mongoose';

import config from '../config/config.js';
import app from './app.js';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(config.port, () => console.log(`Server running on port: ${config.port}`));
