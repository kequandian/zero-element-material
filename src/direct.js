import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as FITSet } from 'zero-element-global/lib/formItemType';


import BaseForm from '@/container/Form/BaseForm';

import Plain from '@/formItemType/Plain';
import Input from '@/formItemType/Input';
import SearchInput from '@/formItemType/SearchInput';
import SearchSelect from '@/formItemType/SearchSelect';

LayoutSet({
  'Empty': ({ children }) => children,
});

CSet({
  BaseForm,
});

FITSet({
  'plain': Plain,
  'input': Input,
  'search-input': SearchInput,
  'search-select': SearchSelect,
});