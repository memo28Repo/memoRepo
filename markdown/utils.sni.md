<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@memo28/utils](./utils.md) &gt; [SNI](./utils.sni.md)

## SNI() function

String Number includes的简称

**Signature:**

```typescript
export declare function SNI(n: number | string | (number | string)[], value: any): boolean;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  n | number \| string \| (number \| string)\[\] |  |
|  value | any |  |

**Returns:**

boolean

## Example

const a = 1;

SNI(2, a) =<!-- -->&gt; \[2,'2'\].includes(a) SNI(\[1,2,3\], a) =<!-- -->&gt; \[1,2,3,'1','2','3'\].includes(a)
