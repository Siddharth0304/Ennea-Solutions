//Main Page Title card

export default function Hero({title="Test",description="Desc"}) {
  return (
    <section className="bg-indigo-700 py-20 mb-4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div className="text-center">
            <h1
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              {/* Using Props to handle the title */}
              {title}
            </h1>
            <p className="my-4 text-xl text-white">
              {/* Using Props to handle the description */}
              {description}
            </p>
          </div>
        </div>
      </section>
  )
}
