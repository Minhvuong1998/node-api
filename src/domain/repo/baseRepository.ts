import { Conllections } from '../model';
import toNumber from 'lodash/toNumber';
import isNumber from 'lodash/isNumber';

export default abstract class BaseRepository {
  public readonly db: Conllections;
  protected readonly commonExclude: string[] = [
    'created_by',
    'updated_by'
  ];
  protected readonly extraExclude: string[] = [
    'created_by',
    'updated_by',
    'createdAt',
    'created_at',
    'updatedAt',
    'updated_at',
    'deleted_at',
    'deletedAt',
    'deleted_by'
  ];

  constructor(db: Conllections) {
    this.db = db;
  }

  protected setOffsetLimit() {
    //
  }

  protected notFoundError(
    result: [number, any[]] | number | null | any,
    errorStr: string
  ) {
    if (
      result === null ||
      (result instanceof Array && result[0] === 0) ||
      (typeof result === 'number' && result === 0)
    ) {
      throw new Error(errorStr);
    }
  }

  protected convertDataToNumberArr(
    data: any[] | string | number
  ) {
    if (!(data instanceof Array)) {
      data = [data];
    }
    const newData = [];
    for (const item of data) {
      newData.push(toNumber(item));
    }
    return newData;
  }

  protected number(data?: string | number) {
    const num = toNumber(data);
    return isNumber(num) ? num : false;
  }
}
