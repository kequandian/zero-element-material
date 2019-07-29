import { set as LayoutSet } from 'zero-element-global/lib/layout';
import { set as CSet } from 'zero-element-global/lib/container';
import { set as FITSet } from 'zero-element-global/lib/formItemType';


import BaseForm from '@/container/Form/BaseForm';

import Hidden from '@/formItemType/Hidden';
import Plain from '@/formItemType/Plain';
import Input from '@/formItemType/Input';
import Radio from '@/formItemType/Radio';
import Password from '@/formItemType/Password';
import Tags from '@/formItemType/Tags';
import SearchInput from '@/formItemType/SearchInput';
import SearchSelect from '@/formItemType/SearchSelect';
import SearchTree from './formItemType/SearchTree';

LayoutSet({
  'Empty': ({ children }) => children,
});

CSet({
  BaseForm,
});

FITSet({
  'hidden': Hidden,
  'plain': Plain,
  'input': Input,
  'radio': Radio,
  'password': Password,
  'tags': Tags,
  'search-input': SearchInput,
  'search-select': SearchSelect,
  'search-tree': SearchTree,
});