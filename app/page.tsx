import PhotoBooth from "../components/PhotoBooth";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Photo Booth 📷
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Capture moments and add fun, overlays to your photos such as Noun glasses and your ENS.
                </p>
                <p>
                  See all photos taken at the event at the <a href="/gallery" className="text-blue-600 hover:underline">event gallery page</a>.
                </p>
          </div>
        </div>
        <div className="w-full mx-automax-w-4xl">
        <PhotoBooth />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          made with love
        </a>
      </footer>
    </div>
  );
}
