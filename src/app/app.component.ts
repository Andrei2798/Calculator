import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { ButtonsComponent } from './buttons/buttons.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DisplayComponent, ButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  displayValue: string = '';  // Отображаемое значение
  currentInput: string = '';  // Текущий ввод пользователя (строка для построения числа)
  firstNumber: number | null = null;  // Первое введенное число
  secondNumber: number | null = null;  // Второе введенное число
  currentOperator: string | null = null;  // Текущий оператор (например, "+")
  isEnteringSecondNumber: boolean = false;  // Флаг для ввода второго числа
  isOperatorSet: boolean = false;  // Флаг, указывающий, был ли оператор уже выбран


  // Обрабатываем нажатие кнопок
  onButtonClicked(value: string) {
    if (!isNaN(Number(value))) {
      // Если выбран оператор и мы начали ввод второго числа
      if (this.isOperatorSet && this.isEnteringSecondNumber) {
          this.currentInput = '';  // Очищаем ввод для второго числа
          this.isEnteringSecondNumber = false;  // Отмечаем, что начали ввод второго числа
      }

      // Добавляем цифру к текущему введенному числу
      this.currentInput += value;

      // Обновляем отображаемое значение (на дисплее)
      this.displayValue = this.currentInput;
  } 
  else if (value === "+" || value === "-" || value === "*" || value === "/") {
    // Если первое число еще не введено
    if (this.firstNumber === null) {
      this.firstNumber = parseFloat(this.currentInput);  // Сохраняем первое число
    } else if (!this.isEnteringSecondNumber) {
      // Если первое число уже введено, выполнить предыдущее действие
      this.secondNumber = parseFloat(this.currentInput);
      this.firstNumber = this.calculateOperation(this.firstNumber, this.secondNumber, this.currentOperator!);
      this.displayValue = this.firstNumber.toString();
    }

    // Устанавливаем оператор и готовимся к вводу второго числа
    this.currentOperator = value;
    this.isOperatorSet = true;
    this.isEnteringSecondNumber = true; // Готовы к вводу второго числа
  }
  else if (value === "=") {
    if (this.firstNumber !== null && this.currentOperator !== null) {
      this.secondNumber = parseFloat(this.currentInput);  // Получаем второе число
      this.firstNumber = this.calculateOperation(this.firstNumber, this.secondNumber, this.currentOperator);
      this.displayValue = this.firstNumber.toString();

      // Сбрасываем оператор и текущий ввод после выполнения вычисления
      this.currentOperator = null;
      this.isOperatorSet = false;
      this.isEnteringSecondNumber = false;
      this.currentInput = ''; // Готово для нового ввода
    }
  }

  else if (value === "C") {
    this.clear(); // Вызов метода сброса состояния
  }
 
}


calculateOperation(firstNumber: number, secondNumber: number, operator: string): number {
  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      return firstNumber / secondNumber;
    default:
      return firstNumber;
  }
}

clear() {
  this.displayValue = '0';  // Обновляем отображаемое значение
  this.currentInput = '';   // Сбрасываем ввод
  this.firstNumber = null;  // Сбрасываем первое число
  this.secondNumber = null; // Сбрасываем второе число
  this.currentOperator = null; // Сбрасываем оператор
  this.isEnteringSecondNumber = false; // Готовы к новому вводу
  this.isOperatorSet = false; // Оператор не выбран
}
  
  
}