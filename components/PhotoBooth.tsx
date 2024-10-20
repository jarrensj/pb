'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Copy, Download } from 'lucide-react'
import Image from 'next/image'

export default function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)

  useEffect(() => {
    if (cameraActive) {
      startCamera()
      setImage(null)
    } else {
      stopCamera()
    }
  }, [cameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const takePicture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/png')
        setImage(imageDataUrl)
        setCameraActive(false)
      }
    }
  }

  const copyImage = async () => {
    if (image) {
      try {
        const blob = await fetch(image).then(res => res.blob())
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ])
      } catch (err) {
        console.error('Failed to copy image:', err)
      }
    }
  }

  const downloadImage = () => {
    if (image) {
      const link = document.createElement('a')
      link.href = image
      link.download = 'image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : image ? (
              <Image
                src={image}
                alt="Preview"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            {cameraActive ? (
              <Button onClick={takePicture}>Take Picture</Button>
            ) : (
              <Button onClick={() => setCameraActive(true)}>
                {image ? 'Take New Photo' : 'Start Camera'}
              </Button>
            )}
            {image && (
              <>
                <Button onClick={copyImage}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadImage}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
    </Card>
  )
}
