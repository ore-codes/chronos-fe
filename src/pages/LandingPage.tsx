function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 pt-36 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="animate-fade-in mb-4 text-4xl font-bold md:text-6xl">
            Stay Ahead of Time with <span className="text-yellow-300">Chronos</span>
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Your personalized news aggregator for real-time updates.
          </p>
          <a
            href="#features"
            className="rounded-lg bg-yellow-300 px-6 py-3 font-bold text-black transition-all duration-300 hover:bg-yellow-400"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
              <h3 className="mb-2 text-xl font-bold">Customizable News Feed</h3>
              <p>Choose your favorite sources, topics, and authors for a tailored experience.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
              <h3 className="mb-2 text-xl font-bold">Real-Time Updates</h3>
              <p>Stay informed with up-to-the-minute news from trusted sources.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105">
              <h3 className="mb-2 text-xl font-bold">Mobile-Optimized</h3>
              <p>Seamlessly access news across all your devices with responsive design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-6">Subscribe to our newsletter to never miss an update.</p>
          <form className="flex flex-col justify-center gap-4 md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg px-4 py-2 focus:outline-none md:w-auto"
            />
            <button
              type="submit"
              className="rounded-lg bg-yellow-300 px-6 py-2 font-bold text-black transition-all duration-300 hover:bg-yellow-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-gray-400">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Chronos. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="hover:text-white">
              About
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
