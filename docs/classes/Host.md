[apiit](../README.md) / [Exports](../modules.md) / Host

# Class: Host

## Table of contents

### Constructors

- [constructor](Host.md#constructor)

### Properties

- [#axios](Host.md##axios)
- [#events](Host.md##events)

### Methods

- [#applyHeadersGetter](Host.md##applyheadersgetter)
- [#setEvents](Host.md##setevents)
- [createEndpoint](Host.md#createendpoint)
- [off](Host.md#off)
- [on](Host.md#on)
- [create](Host.md#create)
- [getHeaders](Host.md#getheaders)

## Constructors

### constructor

• **new Host**(`axiosInstance`, `headers?`): [`Host`](Host.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `axiosInstance` | `AxiosInstance` |
| `headers` | `Record`\<`string`, `string` \| () => `string`\> |

#### Returns

[`Host`](Host.md)

#### Defined in

[src/Host/Host.ts:36](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L36)

## Properties

### #axios

• `Private` `Readonly` **#axios**: `AxiosInstance`

#### Defined in

[src/Host/Host.ts:34](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L34)

___

### #events

• `Private` `Readonly` **#events**: `EventsEmitter`\<[`HostEvents`](../modules.md#hostevents), `unknown`\>

#### Defined in

[src/Host/Host.ts:32](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L32)

## Methods

### #applyHeadersGetter

▸ **#applyHeadersGetter**(`headers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers` | `Record`\<`string`, `string` \| () => `string`\> |

#### Returns

`void`

#### Defined in

[src/Host/Host.ts:65](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L65)

___

### #setEvents

▸ **#setEvents**(): `void`

#### Returns

`void`

#### Defined in

[src/Host/Host.ts:80](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L80)

___

### createEndpoint

▸ **createEndpoint**\<`RequestType`, `ResponseType`\>(`method`, `path`, `options?`): [`Endpoint`](Endpoint.md)\<`RequestType`, `ResponseType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RequestType` | extends [`RequestParams`](../interfaces/RequestParams.md) |
| `ResponseType` | `ResponseType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | `string` |
| `path` | `string` |
| `options` | [`EndpointOptions`](../interfaces/EndpointOptions.md) |

#### Returns

[`Endpoint`](Endpoint.md)\<`RequestType`, `ResponseType`\>

#### Defined in

[src/Host/Host.ts:46](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L46)

___

### off

▸ **off**(`event`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`HostEvents`](../modules.md#hostevents) |
| `handler` | (`event`: `Error` \| `Record`\<`string`, `unknown`\>) => `void` |

#### Returns

`void`

#### Defined in

[src/Host/Host.ts:61](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L61)

___

### on

▸ **on**(`event`, `handler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`HostEvents`](../modules.md#hostevents) |
| `handler` | (`event`: `Error` \| `Record`\<`string`, `unknown`\>) => `void` |

#### Returns

`void`

#### Defined in

[src/Host/Host.ts:57](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L57)

___

### create

▸ **create**(`baseURL`, `headers?`): [`Host`](Host.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseURL` | `string` |
| `headers?` | `Record`\<`string`, `string` \| () => `string`\> |

#### Returns

[`Host`](Host.md)

#### Defined in

[src/Host/Host.ts:10](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L10)

▸ **create**(`axiosInstance`, `headers?`): [`Host`](Host.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `axiosInstance` | `AxiosInstance` |
| `headers?` | `Record`\<`string`, () => `string`\> |

#### Returns

[`Host`](Host.md)

#### Defined in

[src/Host/Host.ts:11](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L11)

___

### getHeaders

▸ **getHeaders**(`headers`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers` | `Record`\<`string`, `string` \| () => `string`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `headersGetters` | [`string`, `string` \| () => `string`][] |
| `headersStatic` | \{ `[k: string]`: `T`;  } |

#### Defined in

[src/Host/Host.ts:101](https://github.com/AlexKletn/apiit/blob/21e19d0/src/Host/Host.ts#L101)
