import {Spinner} from '@nextui-org/react';

const ScreenLoader = () => {
  return (
    <div className="absolute inset-0 z-[999] grid h-screen max-h-screen place-items-center bg-gray-600/30">
      <Spinner />
    </div>
  );
};

export default ScreenLoader;
