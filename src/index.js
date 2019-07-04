import Load from '@/utils/Load';
import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
// import { set as LASet } from 'zero-element-global/lib/listAction';
import { set as FITSet } from 'zero-element-global/lib/formItemType';
// import { set as AITSet } from 'zero-element-global/lib/actionItemType';


LayoutSet({
  'Empty': ({ children }) => children,
});

CSet({
  BaseForm: Load('container/Form/BaseForm'),
});

// LASet({
// });

FITSet({
  plain: Load('formItemType/Plain'),
  input: Load('formItemType/Input'),
  'search-input': Load('formItemType/SearchInput'),
  'search-select': Load('formItemType/SearchSelect'),
});

// AITSet({
// });