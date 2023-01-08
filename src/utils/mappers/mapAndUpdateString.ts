import mapAndUpdateAttribute from './mapAndUpdateAttribute';

/**
 * PUT STRINGIFIED OBJECT -> Recebe como parâmetro um objeto em formato de string e outro objeto, converte, mapeia, e retorna o objeto em formato de string com as propriedades atualizadas. Considera valores vazios enviados, mas as propriedades que não pertencem ao tipo de entidade são descartadas.
 * @param oldAttributes string
 * @param newAttributes Object
 * @returns Promise: string
 */
export default async function mapAndUpdateStringify<Type>(
  oldAttributes: string,
  newAttributes: Type,
): Promise<string> {
  const updatedAttributes = await mapAndUpdateAttribute(
    JSON.parse(oldAttributes),
    newAttributes,
  );
  return JSON.stringify(updatedAttributes);
}
