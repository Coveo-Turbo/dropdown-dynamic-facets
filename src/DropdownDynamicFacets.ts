import { Component, IComponentBindings, ComponentOptions, QueryEvents, InitializationEvents, IQuerySuccessEventArgs, IInitializationEventArgs, IQuery, $$, Facet } from 'coveo-search-ui';
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
        this.bind.onRootElement(InitializationEvents.afterComponentsInitialization, (arg: IInitializationEventArgs) => this.handleBeforeInit(arg));
    
    }

    //Needed for the normal Facets, which do not have expand by default enabled
    private handleBeforeInit(arg: IInitializationEventArgs) {
      this.initializeCollapsibleFacets();
    }
    public toggleFacet(this: Facet) {
      if ($$(this.element).hasClass('coveo-facet-collapsed')) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  
    private hookOnFacetCreation(handler: any) {
      const originalCreateDom = Coveo.Facet.prototype.createDom;
      Coveo.Facet.prototype.createDom = function(this: Facet) {
        originalCreateDom.call(this);
        handler.call(this);
      };
    }
  
    public initializeCollapsibleFacets() {
      var _this = this;
      this.hookOnFacetCreation(function(this: Facet) {
        if (this.element.dataset.dropdown === 'true') {
          const facetElement = $$(this.element);
          facetElement.addClass('DropDownFacet');
          const title = facetElement.findClass('coveo-facet-header')[0];
          $$(title).on('click', () => _this.toggleFacet.call(this));
  
        }
      });
    }

    private handleQuery( args:IQuerySuccessEventArgs) {
      //We simply want to collapse the facets.
      //The handleQuery will be called upon selecting a facet value
      this.collapse();
    }

    private handleInit( args: IInitializationEventArgs){
      //this.handleBeforeInit();
      this.collapse();
    }

    private collapse(){
      let allFacets = document.querySelectorAll(".CoveoDynamicFacet,.CoveoFacet");
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