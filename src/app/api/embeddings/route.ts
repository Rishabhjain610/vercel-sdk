import { ollama } from 'ollama-ai-provider-v2';
import { embed,embedMany,cosineSimilarity} from 'ai';
import { NextResponse } from 'next/server';

// const { text } = await generateText({
//   model: ollama('qwen3:4b'),
//   providerOptions: { ollama: { think: true } },
//   prompt:
//     'Write a vegetarian lasagna recipe for 4 people, but really think about it',
// });
export async function POST(request: Request) {
  try {
    const model = "nomic-embed-text:latest";
    const query = "ingrediant of tomato sauce"
    const documents = [
      "A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape.",
      "The sun is a star located at the center of our solar system, composed mainly of hydrogen and helium.",
      "Making a perfect tomato pasta sauce requires fresh garlic, olive oil, and sweet basil leaves.",
      "React is a popular JavaScript library developed by Facebook for building dynamic user interfaces."
    ];

    // 1. Embed the search query
    const { embedding: queryEmbedding } = await embed({
      model: ollama.textEmbeddingModel(model),
      value: query,
    });

    // 2. Embed all the documents in the array
    const { embeddings: docEmbeddings } = await embedMany({
      model: ollama.textEmbeddingModel(model),
      values: documents,
    });

    // 3. Compute cosine similarities and rank them
    const results = documents.map((doc, index) => {
      const docEmbedding = docEmbeddings[index];
      const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
      return { document: doc, similarity };
    });

    // Sort by similarity score descending (highest similarity first)
    results.sort((a, b) => b.similarity - a.similarity);

    console.log(`[Semantic Search] Ran query: "${query}" across ${documents.length} docs`);
    return NextResponse.json({ results, query, model });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}