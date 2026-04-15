"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { JDAnalysis, MatchedStory, CVData, CoverLetter } from "@/types";
import { getStories, getSettings, getCVData, saveLetter, generateId } from "@/lib/storage";
import CoverLetterEditor from "@/components/CoverLetterEditor";
import ExportButtons from "@/components/ExportButtons";

type GenerationStep = "idle" | "analyzing" | "matching" | "generating" | "done" | "error";

export default function GeneratePage() {
  const [ready, setReady] = useState<{ stories: boolean; settings: boolean; cv: boolean }>({
    stories: false,
    settings: false,
    cv: false,
  });
  const [jobDescription, setJobDescription] = useState("");
  const [step, setStep] = useState<GenerationStep>("idle");
  const [error, setError] = useState("");
  const [editedHtml, setEditedHtml] = useState("");
  const [result, setResult] = useState<{
    content: string;
    jdAnalysis: JDAnalysis;
    matchedStories: MatchedStory[];
  } | null>(null);

  useEffect(function checkReadiness() {
    const stories = getStories();
    const settings = getSettings();
    const cv = getCVData();
    setReady({
      stories: stories.length >= 5,
      settings: !!settings?.apiKey,
      cv: !!cv,
    });
  }, []);

  const allReady = ready.stories && ready.settings && ready.cv;
  const isGenerating = step === "analyzing" || step === "matching" || step === "generating";

  async function handleGenerate() {
    if (!jobDescription.trim()) return;

    const settings = getSettings();
    const stories = getStories();
    const cvData = getCVData();

    if (!settings?.apiKey || !cvData) return;

    setError("");
    setResult(null);
    setStep("analyzing");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: jobDescription.trim(),
          stories,
          cvData,
          provider: settings.llmProvider,
          apiKey: settings.apiKey,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await response.json();

      setResult(data);
      setEditedHtml(textToHtml(data.content));
      setStep("done");

      const letter: CoverLetter = {
        id: generateId(),
        content: data.content,
        jdAnalysis: data.jdAnalysis,
        matchedStories: data.matchedStories,
        cvData: cvData as CVData,
        createdAt: Date.now(),
      };
      saveLetter(letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Check your API key and try again.");
      setStep("error");
    }
  }

  function stepLabel(s: GenerationStep): string {
    switch (s) {
      case "analyzing":
        return "Analyzing job description...";
      case "matching":
        return "Matching your stories...";
      case "generating":
        return "Writing your cover letter...";
      default:
        return "";
    }
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-6 py-16">
      <h1 className="text-[40px] font-medium font-serif leading-[1.10]">
        Generate Cover Letter
      </h1>
      <p className="mt-2 text-[17px] text-[#5e5d59] leading-[1.60]">
        Paste a job description to generate a tailored cover letter from your stories.
      </p>

      {!allReady && (
        <div className="mt-8 rounded-xl border border-[#c96442]/20 bg-[#c96442]/5 p-6">
          <h3 className="text-lg font-medium font-serif text-[#c96442]">Before you can generate</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className={ready.settings ? "text-[#5e5d59]" : "text-[#b53333]"}>
                {ready.settings ? "Done" : "Missing"}
              </span>
              <span>
                API key configured.{" "}
                {!ready.settings && (
                  <Link href="/settings" className="font-medium text-[#c96442] hover:underline">
                    Go to Settings
                  </Link>
                )}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className={ready.cv ? "text-[#5e5d59]" : "text-[#b53333]"}>
                {ready.cv ? "Done" : "Missing"}
              </span>
              <span>
                CV uploaded.{" "}
                {!ready.cv && (
                  <Link href="/settings" className="font-medium text-[#c96442] hover:underline">
                    Go to Settings
                  </Link>
                )}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className={ready.stories ? "text-[#5e5d59]" : "text-[#b53333]"}>
                {ready.stories ? "Done" : "Missing"}
              </span>
              <span>
                At least 5 stories written.{" "}
                {!ready.stories && (
                  <Link href="/stories" className="font-medium text-[#c96442] hover:underline">
                    Go to Stories
                  </Link>
                )}
              </span>
            </li>
          </ul>
        </div>
      )}

      <div className="mt-8">
        <label className="block text-[22px] font-medium font-serif">Job Description</label>
        <p className="mt-1 text-sm text-[#5e5d59]">
          Paste the full job description below.
        </p>
        <textarea
          disabled={!allReady || isGenerating}
          rows={12}
          value={jobDescription}
          onChange={function updateJD(e) { setJobDescription(e.target.value); }}
          placeholder={
            allReady
              ? "Paste the job description here..."
              : "Complete the setup steps above first."
          }
          className="mt-4 w-full rounded-xl border border-[#e8e6dc] bg-white px-4 py-3 text-[17px] leading-[1.60] placeholder:text-[#87867f] focus:outline-none focus:ring-2 focus:ring-[#3898ec] disabled:cursor-not-allowed disabled:bg-[#f0eee6] disabled:text-[#87867f]"
        />
        <div className="mt-4 flex items-center justify-end gap-4">
          {isGenerating && (
            <span className="text-sm text-[#5e5d59] animate-pulse">
              {stepLabel(step)}
            </span>
          )}
          <button
            disabled={!allReady || isGenerating || !jobDescription.trim()}
            onClick={handleGenerate}
            className="rounded-lg bg-[#c96442] px-6 py-3 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors hover:bg-[#b8593b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-[#b53333]/20 bg-[#b53333]/5 p-4">
          <p className="text-sm text-[#b53333]">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-10">
          <div className="rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-medium font-serif">
                {result.jdAnalysis.roleTitle}
                {result.jdAnalysis.companyName && ` at ${result.jdAnalysis.companyName}`}
              </h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {result.jdAnalysis.requiredSkills.map(function renderSkill(skill) {
                return (
                  <span
                    key={skill}
                    className="rounded-lg bg-[#e8e6dc] px-3 py-0.5 text-xs font-medium text-[#4d4c48]"
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          {result.matchedStories.length > 0 && (
            <div className="mt-4 rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-6">
              <h3 className="text-lg font-medium font-serif">Matched Stories</h3>
              <div className="mt-3 space-y-3">
                {result.matchedStories.map(function renderMatch(match) {
                  return (
                    <div key={match.story.id} className="border-t border-[#f0eee6] pt-3 first:border-0 first:pt-0">
                      <p className="font-medium text-[#141413]">{match.story.title}</p>
                      <p className="mt-1 text-sm text-[#5e5d59]">{match.relevance}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {match.matchedSkills.map(function renderMatchedSkill(skill) {
                          return (
                            <span key={skill} className="rounded-lg bg-[#c96442]/10 px-2 py-0.5 text-xs text-[#c96442]">
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-4">
            <CoverLetterEditor
              content={result.content}
              onChange={setEditedHtml}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <ExportButtons
              html={editedHtml}
              cvData={getCVData()!}
              jdAnalysis={result.jdAnalysis}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function textToHtml(text: string): string {
  return text
    .split("\n\n")
    .map((para) => `<p>${para.replace(/\n/g, "<br>")}</p>`)
    .join("");
}
