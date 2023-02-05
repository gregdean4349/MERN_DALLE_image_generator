const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleSurpriseMe,
  isSurpriseMe,
  handleChange,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            onClick={handleSurpriseMe}
            type="button"
            className="rounded-[5px] bg-[#ececf1] py-1 px-2 text-xs font-semibold text-black"
          >
            Surprise Me
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-[#6469ff] focus:ring-[#6469ff]"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  )
}

export default FormField
