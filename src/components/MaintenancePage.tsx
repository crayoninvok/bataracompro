export default function MaintenancePage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-[#1FBFB8] mb-4">
            404
          </h1>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1FBFB8]/20 mb-6">
            <span className="text-4xl">🔧</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Website Under Maintenance
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            We&apos;re currently performing some updates to improve your experience.
          </p>
          <p className="text-lg text-gray-400">
            Please check back soon. We apologize for any inconvenience.
          </p>
        </div>

        <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-300 text-sm">
            <strong className="text-white">PT. Batara Dharma Persada</strong>
            <br />
            We&apos;ll be back shortly!
          </p>
        </div>
      </div>
    </div>
  );
}

