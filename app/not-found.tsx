import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-navy-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
