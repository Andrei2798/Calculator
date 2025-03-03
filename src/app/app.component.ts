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


  
  onButtonClicked(value: string) {
    if (!isNaN(Number(value))) {
      
      if (this.isOperatorSet && this.isEnteringSecondNumber) {
          this.currentInput = '';  
          this.isEnteringSecondNumber = false;  
      }

      
      this.currentInput += value;

      
      this.displayValue = this.currentInput;
  } 
  else if (value === ".") {
    
    if (!this.currentInput.includes(".")) {
      
      this.currentInput += ".";
      this.displayValue = this.currentInput;
    }
  }
  else if (value === "+" || value === "-" || value === "*" || value === "/") {
   
    if (this.firstNumber === null) {
      this.firstNumber = parseFloat(this.currentInput);  
    } else if (!this.isEnteringSecondNumber) {
      
      this.secondNumber = parseFloat(this.currentInput);
      this.firstNumber = this.calculateOperation(this.firstNumber, this.secondNumber, this.currentOperator!);
      this.displayValue = this.firstNumber.toString();
    }

    
    this.currentOperator = value;
    this.isOperatorSet = true;
    this.isEnteringSecondNumber = true; 
  }
  else if (value === "=") {
    if (this.firstNumber !== null && this.currentOperator !== null) {
      this.secondNumber = parseFloat(this.currentInput);  
      this.firstNumber = this.calculateOperation(this.firstNumber, this.secondNumber, this.currentOperator);
      this.displayValue = this.firstNumber.toString();

      
      this.currentOperator = null;
      this.isOperatorSet = false;
      this.isEnteringSecondNumber = false;
      this.currentInput = ''; 
    }
  }

  else if (value === "C") {
    this.clear(); 
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