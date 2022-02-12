const config = {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: '4h',
    port: process.env.PORT || 4000,
    mongoDbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/social_app_db',
};

export default config;
