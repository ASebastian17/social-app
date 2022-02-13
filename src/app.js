import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/', authRoutes);
app.use('/api/', userRoutes);
app.use('/api/', postRoutes);

// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Not found'})
// });

export default app;
