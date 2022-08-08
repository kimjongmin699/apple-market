interface TextAreaProps {
  label?: string
  name?: string
  [key: string]: any
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="mt-3 shadow-lg w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
        rows={4}
        {...register}
        {...rest}
      />
    </div>
  )
}
