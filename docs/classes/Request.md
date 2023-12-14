[apiit](../README.md) / [Exports](../modules.md) / Request

# Class: Request\<ResponseType\>

## Type parameters

| Name |
| :------ |
| `ResponseType` |

## Table of contents

### Constructors

- [constructor](Request.md#constructor)

### Properties

- [#controller](Request.md##controller)
- [#events](Request.md##events)
- [#requestPromise](Request.md##requestpromise)

### Methods

- [#responseReturn](Request.md##responsereturn)
- [cancel](Request.md#cancel)
- [getResult](Request.md#getresult)
- [off](Request.md#off)
- [on](Request.md#on)
- [create](Request.md#create)

## Constructors

### constructor

• **new Request**\<`ResponseType`\>(`«destructured»`, `axios`): [`Request`](Request.md)\<`ResponseType`\>

#### Type parameters

| Name |
| :------ |
| `ResponseType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`RequestOptions`](../interfaces/RequestOptions.md) |
| `axios` | `AxiosInstance` |

#### Returns

[`Request`](Request.md)\<`ResponseType`\>

#### Defined in

[src/Request/Request.ts:24](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L24)

## Properties

### #controller

• `Private` `Readonly` **#controller**: `AbortController`

#### Defined in

[src/Request/Request.ts:18](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L18)

___

### #events

• `Private` `Readonly` **#events**: `EventsEmitter`\<[`RequestEvents`](../modules.md#requestevents), `unknown`\>

#### Defined in

[src/Request/Request.ts:22](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L22)

___

### #requestPromise

• `Private` `Readonly` **#requestPromise**: `Promise`\<[`Response`](../modules.md#response)\<`ResponseType`\>\>

#### Defined in

[src/Request/Request.ts:19](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L19)

## Methods

### #responseReturn

▸ **#responseReturn**(`options`): [`ResponseSuccessful`](../interfaces/ResponseSuccessful.md)\<`ResponseType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ResponseOptions`](../interfaces/ResponseOptions.md)\<`ResponseType`\> |

#### Returns

[`ResponseSuccessful`](../interfaces/ResponseSuccessful.md)\<`ResponseType`\>

#### Defined in

[src/Request/Request.ts:75](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L75)

___

### cancel

▸ **cancel**(): `void`

#### Returns

`void`

#### Defined in

[src/Request/Request.ts:59](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L59)

___

### getResult

▸ **getResult**(): `Promise`\<[`Response`](../modules.md#response)\<`ResponseType`\>\>

#### Returns

`Promise`\<[`Response`](../modules.md#response)\<`ResponseType`\>\>

#### Defined in

[src/Request/Request.ts:55](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L55)

___

### off

▸ **off**(`event`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`RequestEvents`](../modules.md#requestevents) |
| `handler` | (`event`: [`ProgressEvent`](../interfaces/ProgressEvent.md)) => `void` |

#### Returns

`void`

#### Defined in

[src/Request/Request.ts:71](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L71)

___

### on

▸ **on**\<`Payload`\>(`event`, `handler`): `void`

#### Type parameters

| Name |
| :------ |
| `Payload` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`RequestEvents`](../modules.md#requestevents) |
| `handler` | (`event`: `Payload`) => `void` |

#### Returns

`void`

#### Defined in

[src/Request/Request.ts:64](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L64)

___

### create

▸ **create**\<`ResponseType`\>(`«destructured»`, `axios`): [`Request`](Request.md)\<`ResponseType`\>

#### Type parameters

| Name |
| :------ |
| `ResponseType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`RequestOptions`](../interfaces/RequestOptions.md) |
| `axios` | `AxiosInstance` |

#### Returns

[`Request`](Request.md)\<`ResponseType`\>

#### Defined in

[src/Request/Request.ts:10](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Request/Request.ts#L10)
