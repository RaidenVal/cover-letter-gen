# Cover Letter Generator

Generate tailored cover letters by matching your real work experiences to job descriptions. Write your stories once, reuse them for every application.

## How it works

1. **Write stories** about your work using the STAR format (Situation, Task, Action, Result). Tag each story with the skills it demonstrates.
2. **Upload your CV** (PDF or Word). The app extracts your name, email, phone, and LinkedIn.
3. **Paste a job description**. The system extracts the company name, role, required skills, and culture fit.
4. **Generate**. The AI picks the 2-3 stories most relevant to the job and weaves them into a one-page cover letter.
5. **Edit and export**. Tweak the letter in the rich text editor, then download as PDF or Word.

Your data stays in your browser (localStorage). The only external call is to the LLM provider you choose.

## Prerequisites

You need two things installed on your computer:

### 1. Node.js (version 18 or higher)

Go to [nodejs.org](https://nodejs.org) and download the **LTS** version. Run the installer and follow the prompts.

To check it worked, open a terminal and run:

```
node --version
```

You should see something like `v20.x.x` or higher.

### 2. An API key (pick one)

The app supports three LLM providers. You only need one.

| Provider | Cost | How to get a key |
|----------|------|------------------|
| **Claude** (Anthropic) | Paid | Go to [console.anthropic.com](https://console.anthropic.com), create an account, go to API Keys, create a new key |
| **OpenAI** (GPT-4o) | Paid | Go to [platform.openai.com](https://platform.openai.com), create an account, go to API Keys, create a new key |
| **Gemini** (Google) | Free | Go to [aistudio.google.com](https://aistudio.google.com), sign in with Google, click "Get API key" |

Gemini is recommended if you want to try the app without paying for an API.

## Download and run

Open a terminal and run these commands one at a time:

```bash
git clone https://github.com/RaidenVal/cover-letter-gen.git
cd cover-letter-gen
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

If you do not have git installed, you can download the project as a ZIP from the [GitHub page](https://github.com/RaidenVal/cover-letter-gen) (click the green "Code" button, then "Download ZIP"). Unzip it, open a terminal in that folder, and run `npm install` then `npm run dev`.

## First-time setup

1. Go to **Settings**. Select your LLM provider and paste your API key.
2. Upload your CV (PDF or Word). The app will extract your contact details.
3. Go to **Stories** and write at least 5 stories. Each story should describe a specific situation where you demonstrated a skill. Use the STAR format:
   - **Situation**: What was the context?
   - **Task**: What was your responsibility?
   - **Action**: What did you do?
   - **Result**: What was the outcome?
4. Tag each story with relevant skills (e.g. "leadership", "python", "project management").

## Generating a cover letter

1. Go to **Generate**.
2. Paste the full job description.
3. Click **Generate Cover Letter**. The system will:
   - Analyze the job description for required skills and company values
   - Match your stories to the requirements
   - Write a tailored cover letter using your best-matching stories
4. Edit the letter in the rich text editor if needed.
5. Click **Export PDF** or **Export Word** to download.

## Tech stack

- Next.js 15, TypeScript, Tailwind CSS v4
- Newsreader font (Google Fonts)
- Tiptap rich text editor
- jsPDF (PDF export), docx (Word export)
- mammoth (Word CV parsing), pdf-parse (PDF CV parsing)
- Claude API, OpenAI API, Google Generative AI API

## Troubleshooting

**"npm install" fails**
Make sure you have Node.js 18+ installed. Run `node --version` to check.

**Port 3000 is already in use**
Run `npm run dev -- --port 3001` to use a different port.

**API key not working**
Double-check that you copied the full key. Claude keys start with `sk-ant-`, OpenAI keys start with `sk-`, Gemini keys start with `AIza`.

**CV parsing fails**
Make sure the file is a .pdf, .docx, or .doc file. Scanned PDFs (images of text) are not supported.

## License

MIT
