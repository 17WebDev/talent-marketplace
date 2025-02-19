export default function PillSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='mt-4 space-y-2'>
      <h4 className='text-xs font-medium text-left text-gray-600'>{title}</h4>
      <div className='flex flex-wrap gap-2'>{children}</div>
    </div>
  );
}
