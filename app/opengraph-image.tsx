import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'College Directory';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#3b82f6',
            marginBottom: 40,
          }}
        >
          College Directory
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#4b5563',
          }}
        >
          Find Colleges and Courses
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 