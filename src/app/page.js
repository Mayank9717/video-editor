export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-fuchsia-100 justify-center p-24">
      <a
        href="/editor"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <p className="text-center font-bold text-fuchsia-500">Quickreel</p>
        <h2 className={`mb-3 text-2xl font-semibold text-black`}>
          Go To Editor{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
      </a>
    </main>
  );
}
