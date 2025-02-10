import { stats } from '../data/Stats';

export default function HeroSection() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        Find Elite Engineering Talent with AI-Powered Matching
      </h1>
      <p className='text-xl text-gray-600'>
        Connect with pre-vetted engineers, developers, and tech leaders who
        match your exact requirements.
      </p>
      <div className='grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto'>
        {stats.map((stat) => (
          <div key={stat.value}>
            <div className='text-3xl font-bold text-indigo-600'>
              {stat.value}
            </div>
            <div className='text-gray-600'>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
