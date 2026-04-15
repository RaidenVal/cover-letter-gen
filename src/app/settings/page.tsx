"use client";

import { useState, useEffect } from "react";
import FileUploader from "@/components/FileUploader";
import type { Settings, CVData } from "@/types";
import { getSettings, saveSettings, getCVData, saveCVData } from "@/lib/storage";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    llmProvider: "claude",
    apiKey: "",
  });
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [cvParsing, setCvParsing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(function loadFromStorage() {
    const storedSettings = getSettings();
    if (storedSettings) {
      setSettings(storedSettings);
    }
    const storedCV = getCVData();
    if (storedCV) {
      setCvData(storedCV);
    }
  }, []);

  function handleProviderChange(provider: "claude" | "openai" | "gemini") {
    const updated = { ...settings, llmProvider: provider };
    setSettings(updated);
    saveSettings(updated);
    flashSaved();
  }

  function handleApiKeyChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updated = { ...settings, apiKey: e.target.value };
    setSettings(updated);
  }

  function handleApiKeySave() {
    saveSettings(settings);
    flashSaved();
  }

  function flashSaved() {
    setSaved(true);
    setTimeout(function clearSaved() {
      setSaved(false);
    }, 2000);
  }

  async function handleCVUpload(file: File) {
    setCvParsing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to parse CV");
      }
      const parsed: CVData = await response.json();
      parsed.fileName = file.name;
      parsed.uploadedAt = Date.now();
      saveCVData(parsed);
      setCvData(parsed);
    } catch {
      alert("Failed to parse CV. Please try a different file.");
    } finally {
      setCvParsing(false);
    }
  }

  function providerButtonClass(provider: string) {
    if (settings.llmProvider === provider) {
      return "rounded-lg bg-[#c96442] px-5 py-2.5 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors";
    }
    return "rounded-lg bg-[#e8e6dc] px-5 py-2.5 text-[15px] font-medium text-[#4d4c48] shadow-[#e8e6dc_0px_0px_0px_0px,#d1cfc5_0px_0px_0px_1px] transition-colors hover:bg-[#dedad0]";
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-6 py-16">
      <h1 className="text-[40px] font-medium font-serif leading-[1.10]">
        Settings
      </h1>
      <p className="mt-2 text-[17px] text-[#5e5d59] leading-[1.60]">
        Configure your LLM provider and upload your CV.
      </p>

      <section className="mt-12">
        <h2 className="text-[22px] font-medium font-serif">LLM Provider</h2>
        <div className="mt-4 flex gap-3">
          <button
            onClick={function selectClaude() { handleProviderChange("claude"); }}
            className={providerButtonClass("claude")}
          >
            Claude
          </button>
          <button
            onClick={function selectOpenai() { handleProviderChange("openai"); }}
            className={providerButtonClass("openai")}
          >
            OpenAI
          </button>
          <button
            onClick={function selectGemini() { handleProviderChange("gemini"); }}
            className={providerButtonClass("gemini")}
          >
            Gemini (Free)
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-[22px] font-medium font-serif">API Key</h2>
        <p className="mt-1 text-sm text-[#5e5d59]">
          Your key is stored locally in your browser and never sent to any server except the LLM provider.
          {settings.llmProvider === "gemini" && (
            <span className="block mt-1 text-[#c96442]">
              Gemini offers a free API key with generous limits. Get yours at aistudio.google.com.
            </span>
          )}
        </p>
        <div className="mt-4 flex gap-3">
          <input
            type="password"
            value={settings.apiKey}
            onChange={handleApiKeyChange}
            placeholder={
              settings.llmProvider === "claude"
                ? "sk-ant-..."
                : settings.llmProvider === "openai"
                  ? "sk-..."
                  : "AIza..."
            }
            className="flex-1 rounded-xl border border-[#e8e6dc] bg-white px-3.5 py-2.5 text-[17px] placeholder:text-[#87867f] focus:outline-none focus:ring-2 focus:ring-[#3898ec]"
          />
          <button
            onClick={handleApiKeySave}
            className="rounded-lg bg-[#c96442] px-5 py-2.5 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors hover:bg-[#b8593b]"
          >
            Save
          </button>
        </div>
        {saved && (
          <p className="mt-2 text-sm font-medium text-[#c96442]">
            Saved successfully.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-[22px] font-medium font-serif">CV / Resume</h2>
        <p className="mt-1 text-sm text-[#5e5d59]">
          Upload your CV so the generator can use your full work experience when writing your cover letter.
        </p>
        <div className="mt-4">
          {cvParsing ? (
            <div className="rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-8 text-center text-[#5e5d59]">
              Parsing your CV...
            </div>
          ) : (
            <FileUploader
              accept=".pdf,.docx,.doc"
              onFileSelect={handleCVUpload}
              label="Upload your CV (PDF or Word)"
              currentFileName={cvData?.fileName}
            />
          )}
        </div>

        {cvData && (
          <p className="mt-4 text-sm font-medium text-[#c96442]">
            CV uploaded: {cvData.fileName}
          </p>
        )}
      </section>
    </div>
  );
}
