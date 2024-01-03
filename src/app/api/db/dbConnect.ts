import mongoose from 'mongoose';

const dbConnect = async () => {
  const MONGODB_URL = `${process.env.NEXT_PUBLIC_MONGODB_URI}`;

  try {
    const opts: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(MONGODB_URL, opts);
  } catch (error) {
    throw new Error('SDB Connect Error');
  }
};

export default dbConnect;
