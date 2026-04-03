import type { GenerateConceptInput, ConceptResult } from "@/types/concept";

export async function generateConceptWithOpenAI(
  _input: GenerateConceptInput
): Promise<ConceptResult> {
  throw new Error("OpenAI integration is not connected yet.");
}
