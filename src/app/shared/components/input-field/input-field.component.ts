import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true,
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACESSOR],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type = 'text';
  @Input() isReadOnly = false;
  @Input() placeholder?: string;
  @Input() mask?: string;
  @Input() prefix?: any;
  @Input() formControlName = '';
  @Input() form!: FormGroup;
  @Input() required = false;
  @Input() optionId: any = null;
  @Input() option: any = null;
  @Input() selectOptions: any[] = [];

  public activeAutoComplete = false;
  public valorAutoComplete: any = null;

  private innerValue: any;

  constructor() {}

  bindAutoComplete(event: any) {
    this.form.get(this.formControlName)?.setValue(event.text);
    this.form.get(`${this.formControlName}Id`)?.setValue(event.id);
  }

  closeAutoComplete() {
    setTimeout(() => {
      this.activeAutoComplete = false;
    }, 100);
  }

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }
}
