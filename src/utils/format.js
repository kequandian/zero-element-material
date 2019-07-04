import React from 'react';

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @returns material Table columns
 */
export function formatTableFields(fields = []) {
  const rst = fields.map((fieldCfg) => {
    const {
      field,
      label,
      ...rest
    } = fieldCfg;

    return {
      field: field,
      title: label,
      ...rest,
    };
  });

  return rst;
}