import { ComponentProps, FC, forwardRef } from 'react';
import cn from 'classnames';

type InputProps = ComponentProps<'input'> & {
  label: string;
  error?: string | undefined;
  className?: string;
};

const Input: FC<InputProps> = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="block text-gray-700">{label}</label>
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300',
          className
        )}
        {...props}
      />
      {error && <div className="text-sm text-red-400">{error}</div>}
    </div>
  );
});

export default Input;
