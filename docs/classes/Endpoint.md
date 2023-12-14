[apiit](../README.md) / [Exports](../modules.md) / Endpoint

# Class: Endpoint\<RequestType, ResponseType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `RequestType` | extends [`RequestParams`](../interfaces/RequestParams.md) |
| `ResponseType` | `ResponseType` |

## Table of contents

### Constructors

- [constructor](Endpoint.md#constructor)

### Properties

- [#axios](Endpoint.md##axios)
- [#method](Endpoint.md##method)
- [#options](Endpoint.md##options)
- [#path](Endpoint.md##path)

### Methods

- [request](Endpoint.md#request)
- [generateBody](Endpoint.md#generatebody)
- [generateParams](Endpoint.md#generateparams)
- [generatePathParams](Endpoint.md#generatepathparams)
- [generateQuery](Endpoint.md#generatequery)

## Constructors

### constructor

• **new Endpoint**\<`RequestType`, `ResponseType`\>(`axios`, `method`, `path`, `options`): [`Endpoint`](Endpoint.md)\<`RequestType`, `ResponseType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RequestType` | extends [`RequestParams`](../interfaces/RequestParams.md) |
| `ResponseType` | `ResponseType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `axios` | `AxiosInstance` |
| `method` | `string` |
| `path` | `string` |
| `options` | [`EndpointOptions`](../interfaces/EndpointOptions.md) |

#### Returns

[`Endpoint`](Endpoint.md)\<`RequestType`, `ResponseType`\>

#### Defined in

[src/Endpoint/Endpoint.ts:90](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L90)

## Properties

### #axios

• `Private` `Readonly` **#axios**: `AxiosInstance`

#### Defined in

[src/Endpoint/Endpoint.ts:85](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L85)

___

### #method

• `Private` `Readonly` **#method**: `string`

#### Defined in

[src/Endpoint/Endpoint.ts:87](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L87)

___

### #options

• `Private` `Readonly` **#options**: [`EndpointOptions`](../interfaces/EndpointOptions.md)

#### Defined in

[src/Endpoint/Endpoint.ts:88](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L88)

___

### #path

• `Private` `Readonly` **#path**: `string`

#### Defined in

[src/Endpoint/Endpoint.ts:86](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L86)

## Methods

### request

▸ **request**(`payload?`): [`Request`](Request.md)\<`ResponseType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | `RequestType` |

#### Returns

[`Request`](Request.md)\<`ResponseType`\>

#### Defined in

[src/Endpoint/Endpoint.ts:97](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L97)

___

### generateBody

▸ **generateBody**(`payload`, `paramsConfig`, `dataFormat?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`RequestParams`](../interfaces/RequestParams.md) | `undefined` |
| `paramsConfig` | [`ParamsConfig`](../interfaces/ParamsConfig.md) | `undefined` |
| `dataFormat` | [`DataFormat`](../modules.md#dataformat) | `'json'` |

#### Returns

`Object`

#### Defined in

[src/Endpoint/Endpoint.ts:27](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L27)

___

### generateParams

▸ **generateParams**(`payload?`, `dataFormat?`, `paramsConfig?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`RequestParams`](../interfaces/RequestParams.md) | `{}` |
| `dataFormat` | [`DataFormat`](../modules.md#dataformat) | `'json'` |
| `paramsConfig` | [`ParamsConfig`](../interfaces/ParamsConfig.md) | `{}` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `body` | {} |
| `pathParams` | {} |
| `query` | {} |

#### Defined in

[src/Endpoint/Endpoint.ts:11](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L11)

___

### generatePathParams

▸ **generatePathParams**(`payload`, `paramsConfig`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`RequestParams`](../interfaces/RequestParams.md) |
| `paramsConfig` | [`ParamsConfig`](../interfaces/ParamsConfig.md) |

#### Returns

`Object`

#### Defined in

[src/Endpoint/Endpoint.ts:71](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L71)

___

### generateQuery

▸ **generateQuery**(`payload`, `paramsConfig`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`RequestParams`](../interfaces/RequestParams.md) |
| `paramsConfig` | [`ParamsConfig`](../interfaces/ParamsConfig.md) |

#### Returns

`Object`

#### Defined in

[src/Endpoint/Endpoint.ts:57](https://github.com/AlexKletn/apiit/blob/859f377/src/Endpoint/Endpoint.ts#L57)
