import { NextResponse } from 'next/server';
export async function PUT(request: Request) {
    /**
     * Cannot fully implement due to walrus aggregator/publisher being down
     * qdr_tech @ 2024-10-20 4:30pm
     */
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