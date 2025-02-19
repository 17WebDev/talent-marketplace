import { stats } from '../data/Stats';

export default function HeroSection() {
  return (
    <div className='max-w-7xl mx-auto space-y-12 lg:space-y-16 px-4 sm:px-6 lg:px-8 py-12 text-center'>
      <div className='space-y-4'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
          Find Elite Engineering Talent with AI-Powered Matching
        </h1>
        <p className='text-lg sm:text-xl text-gray-600'>
          Connect with pre-vetted engineers, developers, and tech leaders who
          match your exact requirements.
        </p>
      </div>
      <div className='grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto'>
        {stats.map((stat) => (
          <div key={stat.value}>
            <div className='text-2xl sm:text-3xl font-bold text-indigo-600'>
              {stat.value}
            </div>
            <div className='max-sm:text-sm text-gray-600'>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
