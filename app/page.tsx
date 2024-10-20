import PhotoBooth from "../components/PhotoBooth";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <main className="flex-grow flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-col gap-8 items-center sm:items-start max-w-4xl w-full">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Transform Your Photos with Noun Overlays
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Capture moments and add fun, descriptive noun overlays to your
                photos in real-time.
              </p>
            </div>
          </div>
          <div className="w-full mx-auto max-w-4xl">
            <PhotoBooth />
          </div>
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-row items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          <div className="flex w-full flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center mx-auto text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 Photobooth App. All rights reserved.
            </p>
            <p className="text-center mx-auto text-sm text-muted-foreground">
              Capture moments, create memories
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
