[apiit](../README.md) / [Exports](../modules.md) / ResponseSuccessful

# Interface: ResponseSuccessful\<ResponseType\>

## Type parameters

| Name |
| :------ |
| `ResponseType` |

## Hierarchy

- [`ResponseOptions`](ResponseOptions.md)\<`ResponseType`\>

  ↳ **`ResponseSuccessful`**

## Table of contents

### Properties

- [contentType](ResponseSuccessful.md#contenttype)
- [data](ResponseSuccessful.md#data)
- [fileName](ResponseSuccessful.md#filename)
- [headers](ResponseSuccessful.md#headers)

## Properties

### contentType

• `Optional` **contentType**: `string`

#### Defined in

[src/ResponseParser/types.ts:13](https://github.com/AlexKletn/apiit/blob/21e19d0/src/ResponseParser/types.ts#L13)

___

### data

• **data**: `ResponseType`

#### Inherited from

[ResponseOptions](ResponseOptions.md).[data](ResponseOptions.md#data)

#### Defined in

[src/ResponseParser/types.ts:2](https://github.com/AlexKletn/apiit/blob/21e19d0/src/ResponseParser/types.ts#L2)

___

### fileName

• `Optional` **fileName**: `string`

#### Defined in

[src/ResponseParser/types.ts:14](https://github.com/AlexKletn/apiit/blob/21e19d0/src/ResponseParser/types.ts#L14)

___

### headers

• **headers**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `number`

#### Inherited from

[ResponseOptions](ResponseOptions.md).[headers](ResponseOptions.md#headers)

#### Defined in

[src/ResponseParser/types.ts:3](https://github.com/AlexKletn/apiit/blob/21e19d0/src/ResponseParser/types.ts#L3)
