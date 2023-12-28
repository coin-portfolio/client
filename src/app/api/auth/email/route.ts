import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '../../../../config/email';
import dbConnect from '../../db/dbConnect';
import EmailAuth from '../../../../../models/EmailAuth';

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    // 클라이언트에서 받아 온 이메일
    const email = await req.json();

    const reEmail = await EmailAuth.findOne({ email: email });
    // 인증번호를 다시 전송하거나 재요청 했을때 그 전 인증번호 정보 삭제
    if (reEmail) {
      EmailAuth.deleteOne({ email: email });
    }

    // 랜덤인증번호
    const authNumber = Math.floor(100000 + Math.random() * 900000);

    // 만료시간 설정
    const expiresInMinutes = 5;
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    // 메일정보
    const mailData = {
      from: process.env.NEXT_PUBLIC_NODE_MAILER_ID,
      to: email,
      subject: 'coinMoa 인증번호 입니다.',
      html: `<strong>인증번호는 ${authNumber} 입니다.</strong>`,
    };

    // 이메일 검사
    if (isValidEmail(email)) {
      // 데이터베이스에 저장할 정보
      const emailAuth = new EmailAuth({
        email: email,
        authNumber: authNumber,
        date: expiresAt,
      });

      emailAuth.save();

      await transporter.sendMail(mailData);
      transporter.close();
    } else {
      return NextResponse.json({ message: '이메일 형식이 아닙니다.' }, { status: 400 });
    }
    return NextResponse.json({ message: '메일 전송에 성공했습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '메일 전송에 실패했습니다.(SERVER ERROR)' }, { status: 500 });
  }
}
