import { NextRequest, NextResponse } from "next/server";

interface GenerationInput {
  title?: string;
  keywords: string[];
  focusKeyword?: string;
  wordCount?: number;
  tone?: string;
  targetAudience?: string;
  category?: string;
  imageContext?: string;
}

interface GeneratedContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string;
  tags: string[];
  seo_score: number;
  seo_analysis: string;
}

async function generateWithClaude(input: GenerationInput): Promise<GeneratedContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  const wordCountTarget = input.wordCount || 600;
  const tone = input.tone || "professional";
  const audience = input.targetAudience || "general travelers";

  const prompt = `You are an expert SEO content writer for Royal Phuket City Hotel, a prestigious 4-star hotel in Phuket Old Town, Thailand. Generate a complete blog post based on the following inputs.

INPUTS:
- Title: ${input.title || "Generate an SEO-optimized title"}
- Keywords: ${input.keywords.join(", ")}
- Focus Keyword: ${input.focusKeyword || input.keywords[0] || "Phuket hotel"}
- Category: ${input.category || "General"}
- Image Context: ${input.imageContext || "None provided"}

REQUIREMENTS:
- Write in ${tone} tone for ${audience} audience
- Target word count: approximately ${wordCountTarget} words
- Naturally incorporate all SEO keywords with proper density (1-2% for focus keyword)
- Include compelling H2 and H3 headings for structure
- Write engaging, informative content that provides value to readers
- Include a call-to-action where appropriate
- Mention Royal Phuket City Hotel naturally where relevant

OUTPUT FORMAT (respond with ONLY valid JSON, no markdown):
{
  "title": "SEO-optimized title (50-60 characters ideal)",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "2-3 sentence compelling excerpt for blog listings (max 160 characters)",
  "content": "Full blog content in HTML format with <h2>, <h3>, <p>, <ul>, <li> tags. Make it well-structured and engaging.",
  "meta_description": "Compelling meta description with focus keyword (max 155 characters)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seo_score": 85,
  "seo_analysis": "Brief 1-2 sentence analysis of SEO optimization"
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Claude API error:", error);
    throw new Error("Failed to generate content with Claude");
  }

  const data = await response.json();
  const content = data.content[0].text;

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    return JSON.parse(jsonMatch[0]);
  } catch {
    console.error("Failed to parse Claude response:", content);
    throw new Error("Failed to parse generated content");
  }
}

async function generateWithOpenAI(input: GenerationInput): Promise<GeneratedContent> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const wordCountTarget = input.wordCount || 600;
  const tone = input.tone || "professional";
  const audience = input.targetAudience || "general travelers";

  const prompt = `You are an expert SEO content writer for Royal Phuket City Hotel, a prestigious 4-star hotel in Phuket Old Town, Thailand. Generate a complete blog post based on the following inputs.

INPUTS:
- Title: ${input.title || "Generate an SEO-optimized title"}
- Keywords: ${input.keywords.join(", ")}
- Focus Keyword: ${input.focusKeyword || input.keywords[0] || "Phuket hotel"}
- Category: ${input.category || "General"}
- Image Context: ${input.imageContext || "None provided"}

REQUIREMENTS:
- Write in ${tone} tone for ${audience} audience
- Target word count: approximately ${wordCountTarget} words
- Naturally incorporate all SEO keywords with proper density (1-2% for focus keyword)
- Include compelling H2 and H3 headings for structure
- Write engaging, informative content that provides value to readers
- Include a call-to-action where appropriate
- Mention Royal Phuket City Hotel naturally where relevant

Respond with ONLY valid JSON in this exact format:
{
  "title": "SEO-optimized title (50-60 characters ideal)",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "2-3 sentence compelling excerpt for blog listings (max 160 characters)",
  "content": "Full blog content in HTML format with <h2>, <h3>, <p>, <ul>, <li> tags. Make it well-structured and engaging.",
  "meta_description": "Compelling meta description with focus keyword (max 155 characters)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seo_score": 85,
  "seo_analysis": "Brief 1-2 sentence analysis of SEO optimization"
}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert SEO content writer. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate content with OpenAI");
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    return JSON.parse(jsonMatch[0]);
  } catch {
    console.error("Failed to parse OpenAI response:", content);
    throw new Error("Failed to parse generated content");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      keywords = [],
      focusKeyword,
      wordCount,
      tone,
      targetAudience,
      category,
      imageContext,
      provider = "claude",
    } = body;

    if (keywords.length === 0 && !title && !imageContext) {
      return NextResponse.json(
        { error: "At least one of: keywords, title, or image context is required" },
        { status: 400 }
      );
    }

    const input: GenerationInput = {
      title,
      keywords: keywords.length > 0 ? keywords : [title || "Phuket hotel"],
      focusKeyword,
      wordCount,
      tone,
      targetAudience,
      category,
      imageContext,
    };

    let generated: GeneratedContent;

    if (provider === "openai" && process.env.OPENAI_API_KEY) {
      generated = await generateWithOpenAI(input);
    } else if (process.env.ANTHROPIC_API_KEY) {
      generated = await generateWithClaude(input);
    } else if (process.env.OPENAI_API_KEY) {
      generated = await generateWithOpenAI(input);
    } else {
      return NextResponse.json(
        { error: "No AI API key configured. Please set ANTHROPIC_API_KEY or OPENAI_API_KEY." },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      generated,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate content" },
      { status: 500 }
    );
  }
}
