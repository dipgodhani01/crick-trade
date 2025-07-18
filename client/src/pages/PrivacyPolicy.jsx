import { privacyData } from "../data/privacy";

function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      {privacyData.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            {section.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PrivacyPolicy;
