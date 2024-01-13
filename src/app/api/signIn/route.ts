import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/api/db/dbConnect';
import bcrypt from 'bcrypt';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest, res: NextResponse) {
  const generateToken = (userId: string) => {
    const accessToken = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET as string, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  };

  try {
    await dbConnect();
    const { id, password } = await req.json();

    const userDB = await User.findOne({ id });

    const comparePassword = await bcrypt.compare(password, userDB.password);

    if (comparePassword) {
      const token = generateToken(id);
      return NextResponse.json({ message: '로그인 되었습니다.', token: token }, { status: 200 });
    } else {
      return NextResponse.json({ message: '아이디와 비밀번호를 확인해주세요.' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: '아이디와 비밀번호를 확인해주세요' }, { status: 500 });
  }
}
