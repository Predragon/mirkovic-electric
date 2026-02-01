function StarIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function ColoredGoogleIcon({ className }: { className?: string }): JSX.Element {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

interface Review {
  text: string
  author: string
  location: string
}

const reviews: Review[] = [
  {
    text: "Lenny was very thorough and caught issues that other electricians missed. His communication was excellent throughout the entire process. Highly recommend!",
    author: "Sarah M.",
    location: "Palo Alto"
  },
  {
    text: "Excellent work on our EV charger installation. Completed on time and under budget. Mirkovic Electric charged $900 compared to $3,000 from another contractor for the same job!",
    author: "Michael T.",
    location: "San Jose"
  },
  {
    text: "Very organized and thorough. Lenny doesn't cut corners and does things the right way. He worked professionally with the city inspector to ensure everything was done correctly.",
    author: "Jennifer L.",
    location: "Menlo Park"
  }
]

function StarRating({ count, size = 'w-5 h-5' }: { count: number; size?: string }): JSX.Element {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }, (_, i) => (
        <StarIcon key={i} className={`${size} text-yellow-400 fill-current`} />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }): JSX.Element {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex gap-1 mb-3">
        <StarRating count={5} />
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed">
        "{review.text}"
      </p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div>
          <p className="font-semibold text-navy-700">{review.author}</p>
          <p className="text-sm text-gray-500">{review.location}</p>
        </div>
        <GoogleIcon className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  )
}

export default function CustomerReviews(): JSX.Element {
  return (
    <section className="py-16 bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="text-accent-500 font-semibold mb-2 tracking-wide uppercase text-sm">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <StarRating count={5} size="w-6 h-6" />
            <span className="text-gray-600 font-semibold">5.0 out of 5</span>
          </div>
          <p className="text-gray-500">Based on 24 Google reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://g.page/r/CSx7SMmOvAtIEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 hover:border-accent-500 rounded-lg font-semibold text-gray-700 hover:text-accent-600 transition-all hover:shadow-lg"
          >
            <ColoredGoogleIcon className="w-6 h-6" />
            See All 24 Reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
