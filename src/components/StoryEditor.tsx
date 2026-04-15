"use client";

import { useState, useEffect } from "react";
import type { Story } from "@/types";
import { generateId, saveStory } from "@/lib/storage";

interface StoryEditorProps {
  story?: Story | null;
  onSave: () => void;
  onClose: () => void;
}

export default function StoryEditor({ story, onSave, onClose }: StoryEditorProps) {
  const [title, setTitle] = useState("");
  const [situation, setSituation] = useState("");
  const [task, setTask] = useState("");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");

  useEffect(function populateFromExisting() {
    if (story) {
      setTitle(story.title);
      setSituation(story.situation);
      setTask(story.task);
      setAction(story.action);
      setResult(story.result);
    }
  }, [story]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const now = Date.now();
    const storyData: Story = {
      id: story?.id || generateId(),
      title,
      situation,
      task,
      action,
      result,
      createdAt: story?.createdAt || now,
      updatedAt: now,
    };
    saveStory(storyData);
    onSave();
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-[#e8e6dc] bg-white px-3.5 py-2.5 text-[17px] leading-[1.60] placeholder:text-[#87867f] focus:outline-none focus:ring-2 focus:ring-[#3898ec]";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#141413]/30 p-4 pt-16">
      <div className="w-full max-w-[720px] rounded-2xl border border-[#f0eee6] bg-[#faf9f5] p-8 shadow-[rgba(0,0,0,0.05)_0px_4px_24px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-medium font-serif leading-[1.14]">
            {story ? "Edit Story" : "New Story"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#87867f] transition-colors hover:bg-[#e8e6dc] hover:text-[#4d4c48]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#5e5d59]">Title</label>
            <input
              required
              value={title}
              onChange={function updateTitle(e) { setTitle(e.target.value); }}
              placeholder="e.g. Led Cross-Team Migration to Microservices"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5e5d59]">Situation</label>
            <textarea
              required
              rows={3}
              value={situation}
              onChange={function updateSituation(e) { setSituation(e.target.value); }}
              placeholder="What was the context or challenge?"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5e5d59]">Task</label>
            <textarea
              required
              rows={2}
              value={task}
              onChange={function updateTask(e) { setTask(e.target.value); }}
              placeholder="What was your specific responsibility?"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5e5d59]">Action</label>
            <textarea
              required
              rows={3}
              value={action}
              onChange={function updateAction(e) { setAction(e.target.value); }}
              placeholder="What did you do? Be specific about your contributions."
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5e5d59]">Result</label>
            <textarea
              required
              rows={2}
              value={result}
              onChange={function updateResult(e) { setResult(e.target.value); }}
              placeholder="What was the outcome? Include metrics if possible."
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-[#e8e6dc] px-5 py-2.5 text-[15px] font-medium text-[#4d4c48] shadow-[#e8e6dc_0px_0px_0px_0px,#d1cfc5_0px_0px_0px_1px] transition-colors hover:bg-[#dedad0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#c96442] px-5 py-2.5 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors hover:bg-[#b8593b]"
            >
              {story ? "Update Story" : "Save Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
