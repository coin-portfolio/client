import dbConnect from '@/app/api/db/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import EmailAuth from '../../../../../../models/EmailAuth';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const { authNumber } = await req.json();

    //  클라이언트와 같은 인증번호 db에서 찾기
    const authNumbers = await EmailAuth.findOne({ authNumber });
    // 현재시간
    const now = new Date();
    if (now > authNumbers.date) {
      await EmailAuth.deleteOne({ authNumber });
      return NextResponse.json({ message: '인증시간이 만료되었습니다.' }, { status: 400 });
    }
    if (authNumbers && authNumbers.email) {
      await EmailAuth.deleteOne({ authNumber });
      return NextResponse.json({ message: '메일 인증에 성공했습니다.' }, { status: 200 });
    }
    if (!authNumbers) {
      return NextResponse.json({ message: '인증번호가 틀렸습니다.' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: '메일인증실패(SERVER ERROR)' }, { status: 500 });
  }
}
