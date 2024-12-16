import { Textarea } from "@headlessui/react";
import { useState } from "react";
import "./App.css";

import { writeText } from "@tauri-apps/plugin-clipboard-manager";

function App() {
  const [templates, setTemplates] = useState<string[]>([]);
  const [newTemplate, setNewTemplate] = useState("");

  const addTemplate = () => {
    if (newTemplate.trim()) {
      setTemplates([...templates, newTemplate]);
      setNewTemplate("");
    }
  };

  const copyToClipboard = async (template: string) => {
    await writeText(template);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Pasty</h1>

      <div className="flex gap-2 mb-4">
        <Textarea
          className="border border-gray-300 rounded-md p-2 w-72 h-32 resize-none"
          placeholder="Enter your template"
          value={newTemplate}
          onChange={(e) => setNewTemplate(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={addTemplate}
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md">
        {templates.length === 0 ? (
          <p className="text-gray-500">Nothing yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {templates.map((template, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border border-gray-300 rounded-md"
              >
                <span className="whitespace-pre-wrap break-words">
                  {template}
                </span>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => copyToClipboard(template)}
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
