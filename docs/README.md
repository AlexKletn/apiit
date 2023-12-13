Apiit / [Exports](modules.md)

Apiit 
---

*Library for creating an organized API layer*

Features
---
* Defining an endpoint as a reusable function
* Defining multiple hosts
* Ability to track request progress using events
* Possibility to cancel a request

Usage
---
* Create Host Instance - Defines a server object, allowing you to:
  * set headers
  * set base url
  * receive request events
  * receive error events

    ```typescript
    import { createHost } from 'repository';
    
    const host = createHost("http://host.com");
    // or
    const hostSubpath = createHost("http://host.com/api");
    // or
    const siteSubpathAsHost = createHost("/api");
    ```
* Create endpoint
  * create
    ```typescript    
    host.createEndpoint('get', '/foo')
    ```
  *
    ```typescript    
    type RequestPayload = {
      filter: { name: string }
    }
  
    type ResponseData = {
      id: string
      name: string
    }
    host.createEndpoint<RequestPayload, ResponseData>('get', '/foo', {
      paramsConfig: {
        filter: {
          in: "query"
        }
      }
    })
    ```
  *
    ```typescript   
    type RequestPayload = {
      id: string
    }
  
    type ResponseData = {
      id: string
      name: string
    }
  
    host.createEndpoint<RequestPayload, ResponseData>('get', '/foo/:id', {
      paramsConfig: {
        id: {
          in: "path"
        }
      }
    })
    ```
  *
    ```typescript       
    host.createEndpoint('get', '/foo/:id', {
      paramsConfig: {
        id: {
          in: "path"
        }
      }
    })
    ```
  *
    ```typescript 
    type RequestPayload = {
      name: string
    }
  
    host.createEndpoint<RequestPayload, void>('post', '/foo', {
      paramsConfig: {
        name: {
          in: "body"
        }
      }
    })
    ``` 
* Endpoint Request
  * ```typescript
    const endpoint = host.createEndpoint<RequestPayload, ResponseData>('get', '/foo', {
      paramsConfig: {
        filter: {
          in: "query"
        }
      }
    })
  
    const request = endpoint.request({
      filter: {
        type: 'bar'
      }
    });
  
    request.on(event, (payload) => {
      // code
    })
    ```
  *
    ```typescript
    const response = await endpoint.request({
      filter: {
        type: 'bar'
      }
    }).getResult();
    ```

Proposed structure of the API layer
---
* `<project src>`
  * api
    * hosts
      * `apiHost.ts`
        ```typescript        
        import { createHost } from 'repository';
      
        const headers = {
          'Header': 'string',
          'Header 2': () => 'string'
        }
        
        const host = createHost("http://host.com", headers);
        
        export default host;
        ```
    * `<subject entity>`
      * `types.ts` - entity types
      * or `methods.ts`
        ```typescript
        import apiHost from '@/api/hosts/apiHost'
        import type { EntityType } from './types.ts'
      
        const entityEndpoint = apiHost.createEndpoint<FiltersType, EntityType[]>(/* endpoint config */);
      
        export { entityEndpoint };
        ```
      * or `<entity action><Entity name>.ts`
        ```typescript
        import apiHost from '@/api/hosts/apiHost'
      
        const entityEndpoint = apiHost.createEndpoint(/* endpoint config */);
      
        export default entityEndpoint;
        ```
      * `index.ts`
        ```typescript
        export * from './methods.ts'
                         // or
        export { default as entityAction } from './entityAction.ts'
        ```
