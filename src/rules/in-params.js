//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {},

    schema: [
      {
        type: 'object',
        properties: {
          'max-params': {
            type: 'integer',
            minimum: 0,
          },
          'max-destructured': {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function inParams(context) {
    const option = context.options[0];
    let maxParams = 1;
    let maxDestructured = 3;

    if (typeof option === 'object') {
      if (Object.prototype.hasOwnProperty.call(option, 'max-params') && typeof option['max-params'] === 'number') {
        maxParams = option['max-params'];
      }

      if (Object.prototype.hasOwnProperty.call(option, 'max-destructured') && typeof option['max-destructured'] === 'number') {
        maxDestructured = option['max-destructured'];
      }
    }


    return {
      ObjectPattern(node) {
        if (node.parent.type === 'ArrowFunctionExpression' ||
        node.parent.type === 'FunctionDeclaration' ||
          node.parent.type === 'FunctionExpression') {
          if (node.parent.params.length > maxParams) {
            context.report(node, 'Do not use destructuring in params when there' +
              ` are more than ${maxParams} params.`);
          }

          if (node.properties.length > maxDestructured) {
            context.report(node, `Do not destructure more than ${maxDestructured} properties when inside params`);
          }
        }
      },
    };
  },
};
