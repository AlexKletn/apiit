declare namespace api.json {
  export interface RootObject {
    classes: ClassesItem[];
    enums: unknown[];
    functions: FunctionsItem[];
    interfaces: InterfacesItem[];
    namespaces: unknown[];
    typeAliases: TypeAliasesItem[];
    variables: unknown[];
  }
  export interface ClassesItem {
    id: number;
    name: string;
    source: Source;
    namespaceParentId: null;
    comment: Comment;
    external: boolean;
    'abstract': boolean;
    extendsType: null;
    implementsType: unknown[];
    typeParameters: TypeParametersItem[];
    construct: Construct;
    properties: PropertiesItem[];
    methods: MethodsItem[];
  }
  export interface Source {
    line: number;
    file: string;
    path: string;
    url: string;
  }
  export interface Comment {
    description: null;
    blockTags: unknown[];
    modifierTags: unknown[];
  }
  export interface TypeParametersItem {
    id: number;
    name: string;
    constraint: Constraint | null;
    'default': null;
  }
  export interface Constraint {
    kind: string;
    id: number;
    name: string;
    packageName: string;
    typeArguments: unknown[];
  }
  export interface Construct {
    id: number;
    name: string;
    source: Source | null;
    comment: Comment;
    parentId: number;
    accessibility: string;
    parameters: ParametersItem[];
  }
  export interface ParametersItem {
    id: number;
    name: string;
    comment: Comment;
    rest: boolean;
    optional: boolean;
    type: Type;
  }
  export interface Type {
    kind: string;
    type?: string | Type;
    id?: number | null;
    name?: string;
    packageName?: string | null;
    typeArguments?: TypeArgumentsItem[];
    properties?: null | PropertiesItem[];
    signatures?: null | SignaturesItem[];
    methods?: null;
    types?: TypesItem[];
  }
  export interface PropertiesItem {
    id: number;
    name: string;
    source?: Source;
    comment: Comment;
    parentId?: number;
    accessibility?: string;
    'abstract'?: boolean;
    'static'?: boolean;
    readonly: boolean;
    optional: boolean;
    type: Type;
  }
  export interface MethodsItem {
    id: number;
    name: string;
    source: Source;
    parentId: number;
    accessibility: string;
    'abstract': boolean;
    'static': boolean;
    signatures: SignaturesItem[];
  }
  export interface SignaturesItem {
    id: number;
    name: string;
    comment: Comment;
    typeParameters: TypeParametersItem[];
    parameters: ParametersItem[];
    returnType: ReturnType;
  }
  export interface ReturnType {
    kind: string;
    id?: number | null;
    name?: string;
    packageName?: string;
    typeArguments?: TypeArgumentsItem[];
    properties?: null | PropertiesItem[];
    signatures?: null;
    methods?: null;
    type?: string;
  }
  export interface TypeArgumentsItem {
    kind: string;
    id?: number;
    name?: string;
    packageName?: null | string;
    typeArguments?: TypeArgumentsItem[];
    type?: string;
    types?: TypesItem[];
    properties?: null;
    signatures?: SignaturesItem[];
    methods?: null;
  }
  export interface TypesItem {
    kind: string;
    type?: string;
    properties?: null;
    signatures?: SignaturesItem[];
    methods?: null;
    id?: null | number;
    name?: string;
    packageName?: string;
    typeArguments?: TypeArgumentsItem[];
    types?: TypesItem[];
    value?: string;
  }
  export interface FunctionsItem {
    id: number;
    name: string;
    source: Source;
    namespaceParentId: null;
    comment: Comment;
    external: boolean;
    signatures: SignaturesItem[];
  }
  export interface InterfacesItem {
    id: number;
    name: string;
    source: Source;
    namespaceParentId: null;
    comment: Comment;
    external: boolean;
    typeParameters: TypeParametersItem[];
    properties: PropertiesItem[];
    methods: unknown[];
  }
  export interface TypeAliasesItem {
    id: number;
    name: string;
    source: Source;
    namespaceParentId: null;
    comment: Comment;
    external: boolean;
    typeParameters: TypeParametersItem[];
    type: Type;
  }
}
