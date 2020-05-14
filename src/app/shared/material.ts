import { NgModule } from '@angular/core';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
    imports: [MatInputModule, MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule],
    exports: [MatInputModule, MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule]
})

export class MaterialModules { }
