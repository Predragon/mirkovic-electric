export default function ServicesLoading() {
  return (
    <div className="py-16">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
