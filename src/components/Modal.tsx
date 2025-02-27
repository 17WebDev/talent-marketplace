import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

interface ModalProperties {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function Modal({
  open,
  onClose,
  children,
  title,
}: ModalProperties) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className='relative z-10' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity' />
        </TransitionChild>
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center text-center sm:items-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <DialogPanel className='relative bg-white rounded-lg p-8 max-w-xl w-full sm:my-6'>
                <XMarkIcon
                  className='absolute right-6 top-6 h-5 w-5 cursor-pointer hover:text-gray-500 transition-colors'
                  onClick={onClose}
                />
                {title && (
                  <DialogTitle
                    as='h2'
                    className='text-left text-2xl font-bold mb-6'
                  >
                    {title}
                  </DialogTitle>
                )}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
