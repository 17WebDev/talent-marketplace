export default function Header({
  setShowForm,
  hasAccess,
}: {
  setShowForm: (value: boolean) => void;
  hasAccess: boolean;
}) {
  return (
    <header className='bg-white border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <span className='text-indigo-600 text-xl font-bold'>
              Talent Marketplace
            </span>
          </div>
          {!hasAccess && (
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setShowForm(true)}
                className='bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-700'
              >
                Explore Talent Pool
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
