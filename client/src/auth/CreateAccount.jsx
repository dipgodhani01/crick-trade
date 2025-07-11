import { useState } from "react";
import Formfields from "../components/common/Formfields";
import { createAccountFields } from "../data";
import logo from "../assets/icon2.png";

function CreateAccount() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted successfully", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white md:rounded-md md:shadow-xl md:mt-4">
      <div className="pb-4">
        <img src={logo} alt="logo" className="mx-auto" />
        <h2 className="text-center font-medium text-xl">
          Your Cricket Auction Journey Starts Here
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        {createAccountFields.map((field, index) => (
          <Formfields
            key={index}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
        <div className="flex items-center mb-4">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={handleChange}
            className="accent-black w-4 h-4 focus:ring-black cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm text-gray-800 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="" className="text-blue-700">
          Reset your password
        </a>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-black/70 text-white rounded hover:bg-black transition-all duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;
