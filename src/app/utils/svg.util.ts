import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from "@angular/material/icon";

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer)=>{
    ir.addSvgIcon('gift', ds.bypassSecurityTrustResourceUrl('assets/gift.svg'))
}