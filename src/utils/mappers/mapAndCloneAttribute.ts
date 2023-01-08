import IObjectDTO from '@dtos/IObjectDTO';

/**
 * CLONE VALUES -> Recebe como parâmetro um array de string e outro objeto do tipo { [key: string]: string }, retorna um array de objetos com o mesmo valor, é útil para consultas find WHERE + OR.
 * @param params string[]
 * @param attribute IObjectDTO
 * @returns Promise: IObjectDTO[]
 */
export default async function mapAndCloneAttribute(
  params: string[],
  attribute: IObjectDTO,
): Promise<IObjectDTO[]> {
  const objectArray: IObjectDTO[] = [];
  params.forEach(param => {
    objectArray.push({
      [param]: attribute.id,
    });
  });

  return objectArray;
}
