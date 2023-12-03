import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCalendar, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  @Output() fechaSeleccionada = new EventEmitter<NgbDateStruct>();

  model: NgbDateStruct | undefined;
  date: {year: number, month: number} | undefined;

  constructor(private calendar: NgbCalendar) {}

  selectToday() {
    this.model = this.calendar.getToday();
    this.emitirFechaSeleccionada();
  }

  emitirFechaSeleccionada() {
    this.fechaSeleccionada.emit(this.model);
  }

  onModelChange() {
    // Llamado cuando el modelo (model) cambia
    this.emitirFechaSeleccionada();
  }
}
