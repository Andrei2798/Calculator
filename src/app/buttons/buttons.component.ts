import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Output() buttonClicked = new EventEmitter<string>();  // Через Output отправляем значение родителю

  buttonClick(value: string) {
    this.buttonClicked.emit(value);  // Передаем нажатое значение в родительский компонент
    
  }
}
