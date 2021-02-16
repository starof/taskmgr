import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: ServicesModule,
      providers: []
    }
  }
}
