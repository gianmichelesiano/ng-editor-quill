
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import Quill from 'quill';

// add image resize module
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

// add mention module
import 'quill-mention';

// override p with div tag
const Parchment = Quill.import('parchment');
let Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

import Counter from './counter';
Quill.register('modules/counter', Counter)

// Add fonts to whitelist
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);

@Component({
  selector: 'app-root',
  template: `

<h3>Reactive Forms and patch value</h3>

<form [formGroup]="form">
  
  <quill-editor #editor [style]="{height: '200px'}" (onEditorCreated)="setFocus($event)" [formControl]="form.controls['editor']"></quill-editor>
</form>
{{form.controls.editor.value}}
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = '<ul><li>I am example content</li><li><u>And this, too</u></li></ul>';
  form: FormGroup;

  constructor(fb: FormBuilder) {

    let testo = '<div><strong>Servizio Appalti, contratti e semplificazione amministrativa</strong></div><div><strong>U.O.C. Acquisti, Appalti e&nbsp;fdvdfvfdvdfvdfvsdfdsfsdfsdfsdfsdfdsfhklsdfsF</strong></div><div><strong>¨DFDSPNFÖDSF</strong></div><div><strong>SDFSDNFÄLMSDFSDFSD</strong></div><div><strong>FDS</strong></div><div class="ql-indent-2"><strong>FDSF</strong></div><div><strong>fdvdf</strong></div><div><strong>vdf</strong></div><div><strong>vdfv</strong></div><div><strong>dfvdf</strong></div><div><strong>vdf</strong></div><div><strong>v</strong></div><div><strong>dfv</strong></div><div><strong>df</strong></div><div><strong>v</strong></div>'
    this.form = fb.group({
      editor: [testo]
    });

  }
  @ViewChild('editor') editor: QuillEditorComponent

  ngOnInit() {

  }


}
