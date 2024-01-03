import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../../models/User';
import dbConnect from '@/app/api/db/dbConnect';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const { id, password, email } = await req.json();

    // bcrypt 비밀번호 암호화
    const hash = bcrypt.hashSync(password, 10);

    const newUser = new User({
      id,
      email,
      password: hash,
      date: new Date(),
    });

    // DB에 저장
    newUser.save();

    return NextResponse.json({ message: '회원가입 완료되었습니다.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: '회원가입 실패하였습니다.' }, { status: 500 });
  }
}
