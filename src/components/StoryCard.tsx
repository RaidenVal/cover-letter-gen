"use client";

import type { Story } from "@/types";

interface StoryCardProps {
  story: Story;
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
}

export default function StoryCard({ story, onEdit, onDelete }: StoryCardProps) {
  return (
    <div className="rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-6 shadow-[rgba(0,0,0,0.05)_0px_4px_24px]">
      <div className="flex items-start justify-between">
        <h3 className="text-[22px] font-medium font-serif leading-[1.25]">{story.title}</h3>
        <div className="ml-4 flex shrink-0 gap-1">
          <button
            onClick={function editStory() { onEdit(story); }}
            className="rounded-lg p-1.5 text-[#87867f] transition-colors hover:bg-[#e8e6dc] hover:text-[#4d4c48]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={function confirmDelete() {
              if (window.confirm("Delete this story?")) {
                onDelete(story.id);
              }
            }}
            className="rounded-lg p-1.5 text-[#87867f] transition-colors hover:bg-[#b53333]/10 hover:text-[#b53333]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {story.date && (
        <p className="mt-1 text-sm text-[#87867f]">{story.date}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {story.tags.map(function renderTag(tag) {
          return (
            <span
              key={tag}
              className="rounded-lg bg-[#e8e6dc] px-3 py-0.5 text-xs font-medium text-[#4d4c48]"
            >
              {tag}
            </span>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 text-sm text-[#5e5d59] leading-[1.60]">
        <p>
          <span className="font-medium text-[#141413]">Situation: </span>
          {story.situation}
        </p>
        <p>
          <span className="font-medium text-[#141413]">Task: </span>
          {story.task}
        </p>
        <p>
          <span className="font-medium text-[#141413]">Action: </span>
          {story.action}
        </p>
        <p>
          <span className="font-medium text-[#141413]">Result: </span>
          {story.result}
        </p>
      </div>
    </div>
  );
}
