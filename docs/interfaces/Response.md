[repository](../README.md) / [Exports](../modules.md) / Response

# Interface: Response\<ResponseType\>

## Type parameters

| Name |
| :------ |
| `ResponseType` |

## Hierarchy

- [`ResponseOptions`](ResponseOptions.md)\<`ResponseType`\>

  ↳ **`Response`**

## Table of contents

### Properties

- [contentType](Response.md#contenttype)
- [data](Response.md#data)
- [fileName](Response.md#filename)
- [headers](Response.md#headers)

## Properties

### contentType

• **contentType**: `string`

#### Defined in

[src/ResponseParser/types.ts:9](https://github.com/AlexKletn/repository/blob/a5dab62/src/ResponseParser/types.ts#L9)

___

### data

• **data**: `ResponseType`

#### Inherited from

[ResponseOptions](ResponseOptions.md).[data](ResponseOptions.md#data)

#### Defined in

[src/ResponseParser/types.ts:2](https://github.com/AlexKletn/repository/blob/a5dab62/src/ResponseParser/types.ts#L2)

___

### fileName

• **fileName**: `string`

#### Defined in

[src/ResponseParser/types.ts:10](https://github.com/AlexKletn/repository/blob/a5dab62/src/ResponseParser/types.ts#L10)

___

### headers

• **headers**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[ResponseOptions](ResponseOptions.md).[headers](ResponseOptions.md#headers)

#### Defined in

[src/ResponseParser/types.ts:3](https://github.com/AlexKletn/repository/blob/a5dab62/src/ResponseParser/types.ts#L3)
