import { set as LayoutSet } from 'zero-element/lib/config/layout';
import { set as CSet } from 'zero-element/lib/config/container';
import { set as FITSet } from 'zero-element/lib/config/formItemType';


import BaseForm from '@/container/Form/BaseForm';

import Hidden from '@/formItemType/Hidden';
import Plain from '@/formItemType/Plain';
import Input from '@/formItemType/Input';
import InputNumber from '@/formItemType/Number';
import Radio from '@/formItemType/Radio';
import Password from '@/formItemType/Password';
import Tags from '@/formItemType/Tags';
import TextArea from '@/formItemType/Textarea';
import SearchInput from '@/formItemType/SearchInput';
import SearchSelect from '@/formItemType/SearchSelect';
import SearchTree from '@/formItemType/SearchTree';
import UploadImage from '@/formItemType/UploadImage';

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
  'number': InputNumber,
  'radio': Radio,
  'password': Password,
  'tags': Tags,
  'text-area': TextArea,
  'search-input': SearchInput,
  'search-select': SearchSelect,
  'search-tree': SearchTree,
  'upload-image': UploadImage,
});