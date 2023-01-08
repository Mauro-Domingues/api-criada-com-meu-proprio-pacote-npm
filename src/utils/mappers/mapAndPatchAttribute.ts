/**
 * PATCH OBJECT -> Recebe como parâmetro uma entidade e um objeto, mapeia o objeto e retorna a entidade com as propriedades corrigidas. Propriedades vazias ou não pertencentes ao tipo da entidade são descartadas.
 * @param oldAttributes Entity
 * @param newAttributes Object
 * @returns Promise: Entity
 */
export default async function mapAndPatchAttribute<Entity, DTO>(
  oldAttributes: Entity,
  newAttributes: DTO,
): Promise<Entity> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patchedAttributes: any = oldAttributes;
  // eslint-disable-next-line no-restricted-syntax
  for (const attribute in newAttributes) {
    if (newAttributes[attribute]) {
      // eslint-disable-next-line no-prototype-builtins
      if (oldAttributes?.hasOwnProperty(attribute)) {
        // eslint-disable-next-line no-param-reassign
        patchedAttributes[attribute] = newAttributes[attribute];
      }
    }
  }
  return patchedAttributes;
}
