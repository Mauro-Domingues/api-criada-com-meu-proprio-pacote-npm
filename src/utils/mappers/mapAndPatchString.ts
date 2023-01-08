import mapAndPatchAttribute from './mapAndPatchAttribute';

/**
 * PATCH AND INSERT -> Recebe como parâmetro uma entidade e um objeto, mapeia o objeto e retorna a entidade com as propriedades corrigidas. Considera propriedades não pertencentes ao tipo da entidade mas valores vazios são descartados.
 * @param oldAttributes string
 * @param newAttributes Object
 * @returns Promise: string
 */
export default async function mapAndPatchStringify<Type>(
  oldAttributes: string,
  newAttributes: Type,
): Promise<string> {
  const patchedAttributes = await mapAndPatchAttribute(
    JSON.parse(oldAttributes),
    newAttributes,
  );
  return JSON.stringify(patchedAttributes);
}
