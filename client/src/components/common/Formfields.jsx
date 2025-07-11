import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Formfields = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options = [],
  placeholder = "",
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Select {label}</option>
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "password":
        return (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              placeholder={placeholder}
              className="w-full px-2 py-1.5 pr-10 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-800"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            <p className="text-sm mt-1 text-orange-500">
              Your password should contain at least 8 characters.
            </p>
          </div>
        );

      case "file":
        return (
          <>
            <input
              type="file"
              name={name}
              onChange={onChange}
              required={required}
              className="w-full py-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </>
        );

      default:
        return (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              placeholder={placeholder}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </>
        );
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
      )}
      {renderInput()}
    </div>
  );
};

export default Formfields;
