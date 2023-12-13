[repository](README.md) / Exports

# repository

## Table of contents

### Classes

- [Endpoint](classes/Endpoint.md)
- [Host](classes/Host.md)
- [Request](classes/Request.md)
- [ResponseParser](classes/ResponseParser.md)

### Interfaces

- [EndpointOptions](interfaces/EndpointOptions.md)
- [ParamsConfig](interfaces/ParamsConfig.md)
- [ProgressEvent](interfaces/ProgressEvent.md)
- [RequestOptions](interfaces/RequestOptions.md)
- [RequestParams](interfaces/RequestParams.md)
- [Response](interfaces/Response.md)
- [ResponseOptions](interfaces/ResponseOptions.md)

### Type Aliases

- [DataFormat](modules.md#dataformat)
- [HostEvents](modules.md#hostevents)
- [Methods](modules.md#methods)
- [RequestEvents](modules.md#requestevents)
- [ResponseFormat](modules.md#responseformat)

### Functions

- [createHost](modules.md#createhost)

## Type Aliases

### DataFormat

Ƭ **DataFormat**: ``"json"`` \| ``"form-data"`` \| ``"string"``

#### Defined in

[src/Host/types.ts:2](https://github.com/AlexKletn/repository/blob/a5dab62/src/Host/types.ts#L2)

___

### HostEvents

Ƭ **HostEvents**: ``"error"`` \| ``"request"`` \| ``"success"``

#### Defined in

[src/Host/types.ts:5](https://github.com/AlexKletn/repository/blob/a5dab62/src/Host/types.ts#L5)

___

### Methods

Ƭ **Methods**: ``"get"`` \| ``"post"`` \| ``"put"`` \| ``"patch"`` \| ``"delete"`` \| `string`

#### Defined in

[src/Host/types.ts:1](https://github.com/AlexKletn/repository/blob/a5dab62/src/Host/types.ts#L1)

___

### RequestEvents

Ƭ **RequestEvents**: ``"progress:download"`` \| ``"progress:upload"`` \| ``"progress"`` \| ``"error"`` \| ``"load"`` \| ``"cancel"``

#### Defined in

[src/Request/types.ts:28](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/types.ts#L28)

___

### ResponseFormat

Ƭ **ResponseFormat**: ``"json"`` \| ``"blob"`` \| ``"text"``

#### Defined in

[src/Host/types.ts:3](https://github.com/AlexKletn/repository/blob/a5dab62/src/Host/types.ts#L3)

## Functions

### createHost

▸ **createHost**(`baseURL`, `headers?`): [`Host`](classes/Host.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseURL` | `string` |
| `headers?` | `Record`\<`string`, `string` \| () => `string`\> |

#### Returns

[`Host`](classes/Host.md)

#### Defined in

[src/Repository.ts:3](https://github.com/AlexKletn/repository/blob/a5dab62/src/Repository.ts#L3)
