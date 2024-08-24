import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Ref } from 'react';

import { Control, FieldValues, Path, useController } from 'react-hook-form';

interface MyFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  description?: string;
  type?: string;
  textArea?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  className?: string;
  valueAsNumber?: boolean;
  float?: boolean;
  disabled?: boolean;
  rows?: number;
  ref?: Ref<HTMLTextAreaElement | HTMLInputElement>;
}

function MyFormField<T extends FieldValues>({
  control,
  placeholder,
  description,
  name,
  type = 'text',
  label,
  suffix,
  prefix,
  textArea,
  className,
  valueAsNumber = false,
  float = false,
  disabled,
  rows,
  ref,
}: MyFormFieldProps<T>) {
  const { field } = useController({ name, control });
  const onChange = async (event: any) => {
    if (event.target.files?.[0]) {
      field.onChange(event.target.files[0]);
    }
    if (valueAsNumber) {
      if (float) {
        const output = parseFloat(event.target.value);
        return field.onChange(output);
      }
      const output = parseInt(event.target.value, 10);
      return field.onChange(output);
    } else {
      return field.onChange(event.target.value);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              {textArea ? (
                <Textarea
                  className="resize-none"
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={rows}
                  onChange={onChange}
                  ref={ref as Ref<HTMLTextAreaElement>} // Type casting for textarea
                />
              ) : type === 'file' ? (
                <Input
                  className={className}
                  suffix={suffix}
                  prefix={prefix}
                  type={type}
                  onChange={onChange}
                  placeholder={placeholder}
                  disabled={disabled}
                  ref={ref as Ref<HTMLInputElement>} // Type casting for file input
                />
              ) : (
                <Input
                  className={className}
                  suffix={suffix}
                  prefix={prefix}
                  type={type}
                  step={float ? 2 : 1}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                  ref={ref as Ref<HTMLInputElement>} // Type casting for standard input
                  onChange={onChange}
                />
              )}
            </div>
          </FormControl>
          {description && (
            <FormDescription className="mt-4">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default MyFormField;
