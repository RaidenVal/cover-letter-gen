import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[980px] px-6 py-24">
        <div className="max-w-[640px]">
          <h1 className="text-[56px] font-medium font-serif leading-[1.10]">
            Your stories, their job.
            <br />
            One perfect letter.
          </h1>
          <p className="mt-6 text-[20px] text-[#5e5d59] leading-[1.60]">
            Write stories about your best work. Paste a job description. Get a
            tailored cover letter that matches your experience to what they need.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/stories"
              className="inline-flex items-center rounded-lg bg-[#c96442] px-6 py-3 text-[15px] font-medium text-[#faf9f5] shadow-[#c96442_0px_0px_0px_0px,#c96442_0px_0px_0px_1px] transition-colors hover:bg-[#b8593b]"
            >
              Write Your Stories
            </Link>
            <Link
              href="/generate"
              className="inline-flex items-center rounded-lg bg-[#e8e6dc] px-6 py-3 text-[15px] font-medium text-[#4d4c48] shadow-[#e8e6dc_0px_0px_0px_0px,#d1cfc5_0px_0px_0px_1px] transition-colors hover:bg-[#dedad0]"
            >
              Generate a Letter
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f0eee6]">
        <div className="mx-auto max-w-[980px] px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c96442]/10 text-[#c96442]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="mt-4 text-[22px] font-medium font-serif">Write Stories</h3>
              <p className="mt-2 text-[#5e5d59] leading-[1.60]">
                Capture your best work moments using the STAR format. Each story
                becomes a reusable building block for future applications.
              </p>
            </div>

            <div className="rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c96442]/10 text-[#c96442]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-[22px] font-medium font-serif">Smart Matching</h3>
              <p className="mt-2 text-[#5e5d59] leading-[1.60]">
                Paste a job description. The system extracts key requirements and
                picks the 2-3 stories that best demonstrate what they need.
              </p>
            </div>

            <div className="rounded-xl border border-[#f0eee6] bg-[#faf9f5] p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c96442]/10 text-[#c96442]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-[22px] font-medium font-serif">Export Ready</h3>
              <p className="mt-2 text-[#5e5d59] leading-[1.60]">
                Edit the generated letter, then export as a properly formatted
                one-page PDF or Word document. Newsreader font included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
