import { Transition, TransitionChild, Dialog } from '@headlessui/react';
import { Fragment } from 'react';

interface ModalProperties {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Modal({ open, setOpen, children }: ModalProperties) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className='relative z-10' onClose={setOpen}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40 backdrop-blur transition-opacity' />
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
              {children}
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
