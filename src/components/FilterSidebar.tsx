const FilterSidebar = () => {
  return (
    <div className={`w-64 flex-shrink-0 block`}>
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <h2 className='text-lg font-semibold mb-4'>Filters</h2>

        {/* Role Filter */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Role</h3>
          <div className='space-y-2'>
            {[
              'Frontend Engineer',
              'Backend Engineer',
              'AI Engineer',
              'Product Manager',
              'QA Engineer',
            ].map((role) => (
              <label key={role} className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{role}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Tech Stack</h3>
          <div className='space-y-2'>
            {['React', 'Node.js', 'Python'].map((tech) => (
              <label key={tech} className='flex items-center'>
                <input
                  type='checkbox'
                  className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <span className='ml-2 text-sm text-gray-600'>{tech}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
