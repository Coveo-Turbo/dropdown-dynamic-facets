# DropdownDynamicFacets, DropdownFacets

Will create dropdown facets for DynamicFacets or Facets.
Usage: add `data-dropdown="true"` to the Facet definition like: `<div class="CoveoDynamicFacet" data-dropdown="true" data-title="Category" data-field="@category" data-tab="All"></div>` or: `<div class="CoveoFacet" data-dropdown="true" data-title="Category" data-field="@category" data-tab="All"></div>`.

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/dropdown-dynamic-facets
```

2. Use the Component or extend it

Typescript:

```javascript
import { DropdownDynamicFacets, IDropdownDynamicFacetsOptions } from '@coveops/dropdown-dynamic-facets';
```

Javascript

```javascript
const DropdownDynamicFacets = require('@coveops/dropdown-dynamic-facets').DropdownDynamicFacets;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/dropdown-dynamic-facets'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/dropdown-dynamic-facets@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component in your markup (when using Dynamic Facets):

```html
<div class="CoveoDropdownDynamicFacets"></div>
  <div class="CoveoDynamicFacet" data-dropdown="true" data-title="Category" data-field="@category" data-tab="All"></div>
  <div class="CoveoDynamicFacet" data-dropdown="true" data-title="Brand" data-field="@brand" data-tab="All"></div>
  <div class="CoveoResultList AfterDropDownFacet" data-layout="list" data-wait-animation="fade" data-auto-select-fields-to-include="true">

```
Place the component in your markup (when using normal Facets):

```html
<div class="CoveoDropdownDynamicFacets"></div>
  <div class="CoveoFacet" data-dropdown="true" data-enable-settings="false" data-enable-more-less="false"
            data-enable-facet-search="false" data-title="Category" data-field="@category" data-tab="All"></div>
  <div class="CoveoFacet" data-dropdown="true" data-enable-settings="false" data-enable-more-less="false"
            data-enable-facet-search="false" data-title="Brand" data-field="@brand" data-tab="All"></div>
  <div class="CoveoResultList AfterDropDownFacet" data-layout="list" data-wait-animation="fade" data-auto-select-fields-to-include="true">

```
Make sure to add `data-enable-settings="false" data-enable-more-less="false"
            data-enable-facet-search="false"` to each `CoveoFacet`.
Put `AfterDropDownFacet` class at the component right after the last Facet.

## Extending

Extending the component can be done as follows:

```javascript
import { DropdownDynamicFacets, IDropdownDynamicFacetsOptions } from "@coveops/dropdown-dynamic-facets";

export interface IExtendedDropdownDynamicFacetsOptions extends IDropdownDynamicFacetsOptions {}

export class ExtendedDropdownDynamicFacets extends DropdownDynamicFacets {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`