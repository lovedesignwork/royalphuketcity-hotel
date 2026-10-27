/** Build accessible contents links from trusted CMS headings. */
export function countArticleWords(content: string) {
  return content.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, " ")
    .replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").split(/\s+/).filter(Boolean).length;
}

export function prepareArticleContent(content: string) {
  const headings: { id: string; title: string }[] = [];
  const html = content.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, (_match, text: string) => {
    const title = text.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
    const id = `section-${headings.length + 1}`;
    headings.push({ id, title });
    return `<h2 id="${id}">${text}</h2>`;
  });
  return { html, headings };
}

/** The CMS Events category includes both business events and weddings. */
export function articleTopic(post: { slug: string; tags?: string[]; blog_categories?: { slug?: string } }) {
  const terms = `${post.slug} ${(post.tags || []).join(" ")}`.toLowerCase();
  if (/wedding|bridal|ceremon/.test(terms)) return "weddings";
  if (/meeting|conference|corporate|launch|gala|mice/.test(terms)) return "business-events";
  return post.blog_categories?.slug || "travel";
}

/** Keep publication timestamps private while retaining server-side ordering. */
export function publicArticle<T extends { published_at?: unknown; updated_at?: unknown; created_at?: unknown; scheduled_at?: unknown }>(post: T) {
  const { published_at, updated_at, created_at, scheduled_at, ...publicFields } = post;
  void published_at; void updated_at; void created_at; void scheduled_at;
  return publicFields;
}
