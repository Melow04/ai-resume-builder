import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const TIMEOUT_MS = 30000;

// Simple helper to add variety to prompts without changing output constraints
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function buildBulletPrompt(text: string) {
  const templates = [
    'Rephrase the following resume bullet to maximize impact using specific numbers and outcomes. Start with a strong action verb. Keep it to one concise sentence (≤ 28 words). Avoid first‑person and filler.',
    "Transform this bullet using the 'Did X by Y, resulting in Z' pattern. Prefer concrete metrics (%, $, #). Keep it tight and scannable in a single line.",
    'Rewrite as a high‑impact bullet focused on business value. Emphasize measurable results (speed, quality, scale, or savings). One line only; precise verbs; no fluff.',
    'Polish this bullet with a mini CAR frame (Challenge → Action → Result) compressed into one sentence. Quantify impact wherever possible; be specific and punchy.'
  ];
  const tones = [
    'crisp and confident',
    'executive and results‑oriented',
    'technical yet plain‑English',
    'data‑driven and impactful'
  ];
  const emphases = [
    'results and business impact',
    'performance and scalability',
    'quality and reliability',
    'speed and efficiency',
    'customer value and usability',
    'operational efficiency and cost savings'
  ];

  return (
    `${pick(templates)}\n` +
    `Tone: ${pick(tones)}. Emphasis: ${pick(emphases)}.\n` +
    `Return ONLY the single improved bullet, with no quotes or extra commentary.\n\n` +
    `${text}`
  );
}

function buildSummaryPrompt(text: string) {
  const templates = [
    'Refine this professional summary into 2–3 polished sentences (about 40–60 words). Lead with role and key strengths, then quantify scope and signature outcomes. No lists, keep it fluid.',
    'Rewrite as a concise executive summary: who you are, what you are great at, and the impact you deliver. Use confident, concrete language. Limit to 2–3 sentences.',
    'Craft a compelling resume summary highlighting technical breadth and business results. Prefer metrics and relevant domains. Keep it 2–3 sentences—concise and skimmable.'
  ];
  const tones = [
    'confident and professional',
    'executive and succinct',
    'clear and energetic'
  ];
  const emphases = [
    'measurable outcomes',
    'leadership and collaboration',
    'innovation and delivery speed',
    'scalability and reliability'
  ];

  return (
    `${pick(templates)}\n` +
    `Tone: ${pick(tones)}. Emphasis: ${pick(emphases)}.\n` +
    `Return ONLY the improved summary text (no quotes, headings, or commentary).\n\n` +
    `${text}`
  );
}

function buildGenerateBulletsPrompt(text: string) {
  const templates = [
    'From the job description, write exactly 3 resume bullets tailored to the role. Start each with a strong past‑tense action verb; include specific metrics and outcomes. Each bullet ≤ 28 words.',
    'Generate three quantifiable resume bullets aligned to the responsibilities. Focus on impact, scope, and results; prefer %, $, and # where plausible. Keep each bullet concise and scannable.',
    'Produce 3 CAR‑style bullets (Challenge, Action, Result) compressed into one line each. Emphasize business value and measurable gains; avoid vague language.'
  ];
  const tones = [
    'confident and concise',
    'executive and impact‑focused',
    'technical but plain‑spoken'
  ];
  const emphases = [
    'outcomes and customer value',
    'speed and efficiency',
    'quality and reliability',
    'scale and performance',
    'cost savings'
  ];

  return (
    `${pick(templates)}\n` +
    `Tone: ${pick(tones)}. Emphasis: ${pick(emphases)}.\n` +
    `Output formatting: return ONLY the three bullets, one per line, no numbering or markdown, no extra text.\n\n` +
    `${text}`
  );
}

function buildSkillsPrompt(text: string) {
  const templates = [
    'Rewrite this skills list to be ATS‑friendly, modern, and role‑relevant. Prefer canonical names (e.g., React, Node.js, PostgreSQL). Remove redundancies and weak, generic items. Limit to the strongest skills.',
    'Curate and polish this skills inventory: merge synonyms, use industry‑standard terms, and keep only credible strengths. Optimize for screening keywords.',
    'Refactor the skills into a sharp, recruiter‑ready list using compact, canonical labels. Remove junior/soft/obvious items unless distinctive.'
  ];
  const tones = [
    'succinct and technical',
    'modern and industry‑standard',
    'concise and ATS‑optimized'
  ];

  return (
    `${pick(templates)}\n` +
    `Tone: ${pick(tones)}.\n` +
    `Return format: ONLY a single comma‑separated list of skills (one line, no headings, no categories, no bullets, no extra text).\n\n` +
    `${text}`
  );
}

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    let prompt = '';
    switch(type) {
      case 'bullet':
        prompt = buildBulletPrompt(text);
        break;
      case 'summary':
        prompt = buildSummaryPrompt(text);
        break;
      case 'generate-bullets':
        prompt = buildGenerateBulletsPrompt(text);
        break;
      case 'skills':
        prompt = buildSkillsPrompt(text);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        );
    }

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);

    if (!response || typeof response === 'string') {
      throw new Error('Invalid response');
    }

    const improvedText =
      response &&
      Array.isArray((response as unknown as { candidates: unknown[] }).candidates) &&
      ((response as unknown as { candidates: { content: { parts: { text?: string }[] } }[] }).candidates[0]?.content?.parts[0]?.text?.trim())
        ? (response as unknown as { candidates: { content: { parts: { text?: string }[] } }[] }).candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? text
        : text;

    return NextResponse.json({ improvedText });  } catch (error: unknown) {
    console.error('AI Error:', error);

    if (typeof error === 'object' && error !== null && 'message' in error) {
      const message = (error as { message?: string }).message;
      if (message === 'timeout') {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 408 }
        );
      }
      if (message?.includes('quota')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }
    return NextResponse.json(
      { error: 'Failed to improve text. Please try again.' },
      { status: 500 }
    );
  }
}