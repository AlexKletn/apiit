[apiit](README.md) / Exports

# apiit

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
- [ResponseFailed](interfaces/ResponseFailed.md)
- [ResponseOptions](interfaces/ResponseOptions.md)
- [ResponseSuccessful](interfaces/ResponseSuccessful.md)

### Type Aliases

- [DataFormat](modules.md#dataformat)
- [HostEvents](modules.md#hostevents)
- [Methods](modules.md#methods)
- [RequestEvents](modules.md#requestevents)
- [Response](modules.md#response)
- [ResponseFormat](modules.md#responseformat)

### Functions

- [createHost](modules.md#createhost)

## Type Aliases

### DataFormat

Ƭ **DataFormat**: ``"json"`` \| ``"form-data"`` \| ``"string"``

#### Defined in

[src/Host/types.ts:2](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/types.ts#L2)

___

### HostEvents

Ƭ **HostEvents**: ``"error"`` \| ``"request"`` \| ``"success"``

#### Defined in

[src/Host/types.ts:5](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/types.ts#L5)

___

### Methods

Ƭ **Methods**: ``"get"`` \| ``"post"`` \| ``"put"`` \| ``"patch"`` \| ``"delete"`` \| `string`

#### Defined in

[src/Host/types.ts:1](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/types.ts#L1)

___

### RequestEvents

Ƭ **RequestEvents**: ``"progress:download"`` \| ``"progress:upload"`` \| ``"progress"`` \| ``"error"`` \| ``"load"`` \| ``"cancel"``

#### Defined in

[src/Request/types.ts:28](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/types.ts#L28)

___

### Response

Ƭ **Response**\<`ResponseType`\>: [`ResponseFailed`](interfaces/ResponseFailed.md) \| [`ResponseSuccessful`](interfaces/ResponseSuccessful.md)\<`ResponseType`\>

#### Type parameters

| Name |
| :------ |
| `ResponseType` |

#### Defined in

[src/ResponseParser/types.ts:17](https://github.com/AlexKletn/apiit/blob/21e19d0/src/ResponseParser/types.ts#L17)

___

### ResponseFormat

Ƭ **ResponseFormat**: ``"json"`` \| ``"blob"`` \| ``"text"``

#### Defined in

[src/Host/types.ts:3](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/types.ts#L3)

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

[src/Host/Host.ts:10](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L10)

▸ **createHost**(`axiosInstance`, `headers?`): [`Host`](classes/Host.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `axiosInstance` | `AxiosInstance` |
| `headers?` | `Record`\<`string`, () => `string`\> |

#### Returns

[`Host`](classes/Host.md)

#### Defined in

[src/Host/Host.ts:11](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L11)
