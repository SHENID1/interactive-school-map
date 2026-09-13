const whitelist = (process.env.CORS_ORIGIN_WHITELIST || process.env.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    optionSuccessStatus: 200,
};

export default corsOptions;
