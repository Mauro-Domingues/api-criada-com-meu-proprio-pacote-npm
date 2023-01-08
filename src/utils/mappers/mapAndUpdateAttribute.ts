/**
 * PUT OBJECT -> Recebe como parâmetro uma entidade e um objeto, mapeia o objeto e retorna a entidade com as propriedades atualizadas. Considera valores vazios enviados mas propriedades não pertencentes ao tipo da entidade são descartadas.
 * @param oldAttributes Entity
 * @param newAttributes Object
 * @returns Promise: Entity
 */
export default async function mapAndUpdateAttribute<Entity, DTO>(
  oldAttributes: Entity,
  newAttributes: DTO,
): Promise<Entity> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedAttributes: any = oldAttributes;
  // eslint-disable-next-line no-restricted-syntax
  for (const attribute in newAttributes) {
    // eslint-disable-next-line no-prototype-builtins
    if (oldAttributes?.hasOwnProperty(attribute)) {
      updatedAttributes[attribute] = newAttributes[attribute];
    }
  }
  return updatedAttributes;
}
