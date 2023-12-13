[repository](../README.md) / [Exports](../modules.md) / Request

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

[src/Request/Request.ts:16](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L16)

## Properties

### #controller

• `Private` `Readonly` **#controller**: `AbortController`

#### Defined in

[src/Request/Request.ts:10](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L10)

___

### #events

• `Private` `Readonly` **#events**: `EventsEmitter`\<[`RequestEvents`](../modules.md#requestevents), `unknown`\>

#### Defined in

[src/Request/Request.ts:14](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L14)

___

### #requestPromise

• `Private` `Readonly` **#requestPromise**: `Promise`\<[`Response`](../interfaces/Response.md)\<`ResponseType`\>\>

#### Defined in

[src/Request/Request.ts:11](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L11)

## Methods

### #responseReturn

▸ **#responseReturn**(`options`): [`Response`](../interfaces/Response.md)\<`ResponseType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ResponseOptions`](../interfaces/ResponseOptions.md)\<`ResponseType`\> |

#### Returns

[`Response`](../interfaces/Response.md)\<`ResponseType`\>

#### Defined in

[src/Request/Request.ts:67](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L67)

___

### cancel

▸ **cancel**(): `void`

#### Returns

`void`

#### Defined in

[src/Request/Request.ts:51](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L51)

___

### getResult

▸ **getResult**(): `Promise`\<[`Response`](../interfaces/Response.md)\<`ResponseType`\>\>

#### Returns

`Promise`\<[`Response`](../interfaces/Response.md)\<`ResponseType`\>\>

#### Defined in

[src/Request/Request.ts:47](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L47)

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

[src/Request/Request.ts:63](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L63)

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

[src/Request/Request.ts:56](https://github.com/AlexKletn/repository/blob/a5dab62/src/Request/Request.ts#L56)
