import Load from '@/utils/Load';
import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
// import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
// import { set as AITSet } from 'zero-element-global/lib/actionItemType';
import { set as APIConfig } from 'zero-element-global/lib/APIConfig';

APIConfig({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,

  'REQUEST_FIELD_current': 'pageNum',
  'REQUEST_FIELD_pageSize': 'pageSize',
  'REQUEST_FIELD_field': 'field',
  'REQUEST_FIELD_order': 'order',

  'RESPONSE_FIELD_current': 'current',
  'RESPONSE_FIELD_pageSize': 'size',
  'RESPONSE_FIELD_total': 'total',
  'RESPONSE_FIELD_records': 'records',
  'RESPONSE_FIELD_PID': 'pid',
});


LayoutSet({
  'Empty': ({ children }) => children,
});

CSet({
  BaseForm: Load('container/Form/BaseForm'),
});

// LASet({
// });

FITSet({
  hidden: Load('formItemType/Hidden'),
  plain: Load('formItemType/Plain'),
  input: Load('formItemType/Input'),
  number: Load('formItemType/Number'),
  radio: Load('formItemType/Radio'),
  password: Load('formItemType/Password'),
  tags: Load('formItemType/Tags'),
  'text-area': Load('formItemType/TextArea'),
  'search-input': Load('formItemType/SearchInput'),
  'search-select': Load('formItemType/SearchSelect'),
  'search-tree': Load('formItemType/SearchTree'),
  'upload-image': Load('formItemType/UploadImage'),
});

// AITSet({
// });