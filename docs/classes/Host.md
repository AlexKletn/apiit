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
- [getHeaders](Host.md#getheaders)

## Constructors

### constructor

• **new Host**(`baseURL`, `headers?`): [`Host`](Host.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseURL` | `string` |
| `headers` | `Record`\<`string`, `string` \| () => `string`\> |

#### Returns

[`Host`](Host.md)

#### Defined in

[src/Host/Host.ts:29](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L29)

## Properties

### #axios

• `Private` `Readonly` **#axios**: `AxiosInstance`

#### Defined in

[src/Host/Host.ts:27](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L27)

___

### #events

• `Private` `Readonly` **#events**: `EventsEmitter`\<[`HostEvents`](../modules.md#hostevents), `unknown`\>

#### Defined in

[src/Host/Host.ts:10](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L10)

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

[src/Host/Host.ts:60](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L60)

___

### #setEvents

▸ **#setEvents**(): `void`

#### Returns

`void`

#### Defined in

[src/Host/Host.ts:75](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L75)

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

[src/Host/Host.ts:41](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L41)

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

[src/Host/Host.ts:56](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L56)

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

[src/Host/Host.ts:52](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L52)

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

[src/Host/Host.ts:12](https://github.com/AlexKletn/apiit/blob/859f377/src/Host/Host.ts#L12)
