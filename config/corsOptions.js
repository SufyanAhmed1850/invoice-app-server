const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://devv-invoice.vercel.app",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

export default corsOptions;
