import { Conllections } from '../model';
import BaseRepository from './baseRepository';
import { types } from '../../factory';
import isEmpty from 'lodash/isEmpty';

export default class AuthRepository extends BaseRepository {
  public readonly model: Conllections['User'];
  constructor(db: Conllections) {
    super(db);
    this.model = db.User;
  }

  public async search(params: types.User.searchParams) {
    const conditionsSearch: any = {};
    if (params.name) {
      conditionsSearch.name = {
        $regex: params.name,
        $options: 'g'
      };
    }

    if (params.email) {
      conditionsSearch.email = {
        $regex: params.email,
        $options: 'g'
      };
    }

    if (params.disableFlag) {
      conditionsSearch.disableFlag = {
        $in: this.convertDataToNumberArr(params.disableFlag)
      };
    }
    if (params.authority) {
      conditionsSearch.authority = {
        $in: this.convertDataToNumberArr(params.authority)
      };
    }
    const pipeline = [];
    if (!isEmpty(conditionsSearch)) {
      pipeline.push({
        $match: conditionsSearch
      });
    }
    pipeline.push(
      {
        $facet: {
          data: [
            {
              $project: {
                id: '$_id',
                _id: false,
                name: true,
                email: true,
                authority: true,
                disableFlag: true
              }
            },
            {
              $sort: {
                id: 1
              }
            },
            {
              $skip: this.number(params.skip) || 0
            },
            {
              $limit: 50
            }
          ],
          totalCount: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ]
        }
      },
      {
        $addFields: {
          totalCount: {
            $ifNull: [
              { $arrayElemAt: ['$totalCount.count', 0] },
              0
            ]
            // $cond: {
            //   if: { $eq: ['$data', []] },
            //   then: 0,
            //   else: {
            //     $arrayElemAt: ['$totalCount', 0]
            //   }
            // }
          }
        }
      }
    );
    const users = await this.model.aggregate(pipeline);
    return users;
  }
}
