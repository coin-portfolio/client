import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../../models/User';
import dbConnect from '../../db/dbConnect';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const id = await req.json();
    const users = await User.findOne({ id });
    if (!users) {
      return NextResponse.json(
        {
          message: '사용가능한 아이디입니다.',
        },
        {
          status: 200,
        },
      );
    } else {
      return NextResponse.json(
        {
          message: '이미 사용중인 아이디입니다.',
        },
        {
          status: 403,
        },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.statusText }, { status: 500 });
  }
}
