import { ModuleWithProviders, NgModule } from '@angular/core';


export class ServicesModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: ServicesModule,
      providers: []
    }
  }
}
