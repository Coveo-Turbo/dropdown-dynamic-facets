import { Component, IComponentBindings, ComponentOptions, QueryEvents, InitializationEvents, IQuerySuccessEventArgs, IInitializationEventArgs, IQuery } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IDropdownDynamicFacetsOptions {}

@lazyComponent
export class DropdownDynamicFacets extends Component {
    static ID = 'DropdownDynamicFacets';
    static options: IDropdownDynamicFacetsOptions = {};

    constructor(public element: HTMLElement, public options: IDropdownDynamicFacetsOptions, public bindings: IComponentBindings) {
        super(element, DropdownDynamicFacets.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, DropdownDynamicFacets, options);
        this.bind.onRootElement(QueryEvents.deferredQuerySuccess, (args: IQuerySuccessEventArgs) => this.handleQuery(args));
        this.bind.onRootElement(InitializationEvents.afterInitialization, (arg: IInitializationEventArgs) => this.handleInit(arg));
    
    }

    private handleQuery( args:IQuerySuccessEventArgs) {
      //We simply want to collapse the facets.
      //The handleQuery will be called upon selecting a facet value
      this.collapse();
    }

    private handleInit( args: IInitializationEventArgs){
      this.collapse();
    }

    private collapse(){
      let allFacets = document.querySelectorAll(".CoveoDynamicFacet");
      allFacets.forEach((facet) => {
        //Check if attribute for dropdown is there
        let dropdown= facet.getAttribute('data-dropdown');
        if (dropdown!=null) {
          if (!facet.classList.contains('DropDownFacet')) {
             facet.classList.add('DropDownFacet');
          }
          //@ts-ignore
          let myinst=Coveo.get(facet);
          if (myinst!=undefined)
          //@ts-ignore
          myinst.collapse();
        }
      });
    }


}