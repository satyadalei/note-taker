const allowedOrigins = [process.env.CROSS_ORIGIN1]; // Add other allowed origins if needed

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, success?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      const error = new Error('Not allowed by CORS');
      callback(error);
    }
  },
  credentials: true, // Optional, allows sending cookies with requests
};

export {corsOptions}