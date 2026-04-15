"use client";

import { useState, useEffect } from "react";
import type { Story } from "@/types";
import { getStories, deleteStory } from "@/lib/storage";
import StoryCard from "@/components/StoryCard";
import StoryEditor from "@/components/StoryEditor";

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  useEffect(function loadStories() {
    setStories(getStories());
  }, []);

  function refreshStories() {
    setStories(getStories());
  }

  function handleNewStory() {
    setEditingStory(null);
    setEditorOpen(true);
  }

  function handleEditStory(story: Story) {
    setEditingStory(story);
    setEditorOpen(true);
  }

  function handleDeleteStory(id: string) {
    deleteStory(id);
    refreshStories();
  }

  function handleEditorSave() {
    setEditorOpen(false);
    setEditingStory(null);
    refreshStories();
  }

  function handleEditorClose() {
    setEditorOpen(false);
    setEditingStory(null);
  }

  const storyCount = stories.length;
  const needMore = storyCount < 5;

  return (
    <div className="mx-auto w-full max-w-[980px] px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[40px] font-medium font-serif leading-[1.10]">
            Your Stories
          </h1>
          <p className="mt-2 text-[17px] text-[#5e5d59] leading-[1.60]">
            {storyCount} {storyCount === 1 ? "story" : "stories"} written
            {needMore && (
              <span className="text-[#b53333]">
                {" "}
                (need at least 5 to generate a cover letter)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleNewStory}
          className="rounded-lg bg-[#c96442] px-5 py-2.5 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors hover:bg-[#b8593b]"
        >
          New Story
        </button>
      </div>

      {storyCount === 0 ? (
        <div className="mt-16 rounded-2xl border border-[#f0eee6] bg-[#faf9f5] p-16 text-center shadow-[rgba(0,0,0,0.05)_0px_4px_24px]">
          <p className="text-[22px] font-medium font-serif text-[#141413]">No stories yet</p>
          <p className="mt-2 text-[#87867f]">
            Start by writing about a time you solved a problem, led a project, or
            delivered results.
          </p>
          <button
            onClick={handleNewStory}
            className="mt-6 rounded-lg bg-[#c96442] px-5 py-2.5 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors hover:bg-[#b8593b]"
          >
            Write Your First Story
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {stories.map(function renderStory(story) {
            return (
              <StoryCard
                key={story.id}
                story={story}
                onEdit={handleEditStory}
                onDelete={handleDeleteStory}
              />
            );
          })}
        </div>
      )}

      {editorOpen && (
        <StoryEditor
          story={editingStory}
          onSave={handleEditorSave}
          onClose={handleEditorClose}
        />
      )}
    </div>
  );
}
