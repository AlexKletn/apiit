[apiit](../README.md) / [Exports](../modules.md) / RequestOptions

# Interface: RequestOptions

## Table of contents

### Properties

- [method](RequestOptions.md#method)
- [path](RequestOptions.md#path)
- [payload](RequestOptions.md#payload)
- [responseFormat](RequestOptions.md#responseformat)

## Properties

### method

• **method**: `string`

#### Defined in

[src/Request/types.ts:9](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/types.ts#L9)

___

### path

• **path**: `string`

#### Defined in

[src/Request/types.ts:10](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/types.ts#L10)

___

### payload

• **payload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `FormData` \| `Record`\<`string`, `unknown`\> |
| `params` | `Record`\<`string`, `unknown`\> |

#### Defined in

[src/Request/types.ts:11](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/types.ts#L11)

___

### responseFormat

• **responseFormat**: [`ResponseFormat`](../modules.md#responseformat)

#### Defined in

[src/Request/types.ts:8](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/types.ts#L8)
