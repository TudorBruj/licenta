import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get('file');
  if (!file)
    return NextResponse.json({ error: 'No files received!' }, { status: 400 });
  if (typeof file === 'string')
    return NextResponse.json(
      { error: 'Unexpected payload type "string"!' },
      { status: 400 }
    );

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(' ', '_');

  try {
    await writeFile(
      path.join(process.cwd(), 'public', 'images', 'uploads', filename),
      buffer
    );
    return NextResponse.json(
      { message: 'Upload was successful!' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal error!' }, { status: 500 });
  }
}
