'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Copy, Download, XCircle, Check } from 'lucide-react'
import Image from 'next/image'
import Draggable from 'react-draggable'
import ConnectWallet from './ConnectWallet'
import { useAccount, useEnsName } from 'wagmi'

const overlayImages = [
  { id: 1, src: '/NounsBlackGlasses.png', name: 'Black Glasses' },
  { id: 2, src: '/NounsWatermelonGlasses.png', name: 'Watermelon Glasses' },
]

interface Overlay {
  id: number
  src?: string
  text?: string
  position: { x: number; y: number }
}

export default function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [overlays, setOverlays] = useState<Overlay[]>([])
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [downloadFeedback, setDownloadFeedback] = useState(false)

  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

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

  useEffect(() => {
    if (canvasRef.current && image) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        // clear canvas
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        const img = new window.Image()
        img.src = image
        img.onload = () => {
          // main image
          if (canvasRef.current) {
            context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
          }

          // apply overlays
          overlays.forEach((overlay) => {
            if (overlay.src) {
              const overlayImg = new window.Image()
              overlayImg.src = overlay.src
              overlayImg.onload = () => {
                context.drawImage(overlayImg, overlay.position.x, overlay.position.y, 64, 64)
              }
            } else if (overlay.text) {
              context.font = '20px'
              context.fillStyle = 'white'
              context.fillText(overlay.text, overlay.position.x, overlay.position.y)
            }
          })
        }
      }
    }
  }, [image, overlays])

  const addOverlay = (src?: string, text?: string) => {
    setOverlays([...overlays, { id: Date.now(), src, text, position: { x: 0, y: 0 } }])
  }

  const removeOverlay = (id: number) => {
    setOverlays(overlays.filter(overlay => overlay.id !== id))
  }

  const copyImage = async () => {
    if (image) {
      await copyToClipboard()
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2000)
    }
  }

  const copyToClipboard = async () => {
    const newImageData = canvasRef.current!.toDataURL('image/png')
    try {
      const blob = await fetch(newImageData).then(res => res.blob())
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
    } catch (err) {
      console.error('Failed to copy image:', err)
    }
  }

  const downloadImage = () => {
    if (image) {
      downloadFromCanvas()
      setDownloadFeedback(true)
      setTimeout(() => setDownloadFeedback(false), 2000)
    }
  }

  const downloadFromCanvas = () => {
    const newImageData = canvasRef.current!.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = newImageData
    link.download = 'image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative flex flex-col md:flex-row items-start gap-4 p-4">
      <ConnectWallet />

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
              
              {overlays.map((overlay) => (
                <Draggable
                  key={overlay.id}
                  position={overlay.position}
                  onStop={(e, data) => {
                    const updatedOverlays = overlays.map(o =>
                      o.id === overlay.id ? { ...o, position: { x: data.x, y: data.y } } : o
                    )
                    setOverlays(updatedOverlays)
                  }}
                  bounds="parent"
                >
                  <div className="absolute cursor-move">
                    {overlay.src ? (
                      <Image src={overlay.src} alt={`Overlay ${overlay.id}`} width={64} height={64} />
                    ) : (
                      <div style={{ color: 'white', fontSize: '20px' }}>{overlay.text}</div>
                    )}
                  </div>
                </Draggable>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {cameraActive ? (
                <Button onClick={takePicture}>Take Picture</Button>
              ) : (
                <Button onClick={() => setCameraActive(true)}>
                  {image ? 'Take New Photo' : 'Start Camera'}
                </Button>
              )}
              {image && (
                <>
                  <Button onClick={copyImage} className="relative">
                    {copyFeedback ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {copyFeedback ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button onClick={downloadImage} className="relative">
                    {downloadFeedback ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {downloadFeedback ? 'Downloaded!' : 'Download'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {image && (
        <Card className="mt-4 md:mt-0">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Overlays</h2>
            <div className="grid grid-cols-2 gap-2">
              {overlayImages.map(overlay => (
                <Button
                  key={overlay.id}
                  variant="outline"
                  className="w-full h-16 p-2"
                  onClick={() => addOverlay(overlay.src)}
                >
                  <Image src={overlay.src} alt={overlay.name} width={48} height={48} />
                </Button>
              ))}
              {ensName && (
                <Button
                  variant="outline"
                  className="w-full h-16 p-2"
                  onClick={() => addOverlay(undefined, ensName)}
                >
                  {ensName} 
                </Button>
              )}
            </div>
            <h2 className="text-lg font-semibold mt-4 mb-2">Current Overlays</h2>
            <div className="space-y-2">
              {overlays.map((overlay) => (
                <div key={overlay.id} className="flex items-center justify-between">
                  <span>{overlay.src ? overlay.src.split('/').pop() : overlay.text}</span>
                  <Button variant="ghost" onClick={() => removeOverlay(overlay.id)}>
                    <XCircle className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
    </div>
  )
}
