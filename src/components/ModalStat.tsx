export interface IModalStat {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function ModalStat({ text, icon: Icon }: IModalStat) {
  return (
    <div className='flex items-start gap-2'>
      <Icon className='size-5 text-gray-500 shrink-0' />
      <p className='text-sm text-gray-600 text-left'>{text}</p>
    </div>
  );
}
