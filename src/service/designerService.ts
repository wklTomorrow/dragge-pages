import { httpClient } from '@src/utils/httpClient';
import { BRICK } from '../types';

export default {
  getDesignerSchemaByType(type: string) {
    return httpClient
      .get(
        `/conan-config/api/schema/search?pageSize=10000&current=1&pageSize=20&bizKey=${[
          BRICK,
          type,
        ].join('-')}`
      )
      .then((res: any) => {
        try {
          return JSON.parse(res?.list?.[0]?.schemaJson || '{}') || '';
        } catch (e) {
          console.log(e);
        }
        return '';
      });
  },
};
