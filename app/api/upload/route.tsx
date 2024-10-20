import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  console.log('API route called: /api/upload');
  try {
    const blob = await request.blob();
    console.log(blob);
    return NextResponse.json({ message: 'Image upload route hit successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ message: 'Error uploading image' }, { status: 500 });
  }
}