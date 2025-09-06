    let calculation = localStorage.getItem('calculation') || '';
    
    function updateDisplay() {
      document.getElementById('display').textContent = calculation;
      document.getElementById('display').style.color = 'white';
    }
    
    function addToCalculation(value) {
      calculation += value;
      console.log(calculation);
      localStorage.setItem('calculation', calculation);
      updateDisplay();
    }
    
    function calculateResult() {
      // Note: eval() takes a string and runs it as code.
      // Avoid using eval() in real world projects since
      // it can potentially be given harmful code to run.
      // Only use eval() for learning purposes.
      calculation = eval(calculation);
      console.log(calculation);
      localStorage.setItem('calculation', calculation);
      updateDisplay();
    }
    
    function clearCalculation() {
      calculation = '';
      document.getElementById('display').textContent = '';
      localStorage.removeItem('calculation');
    }
    
    updateDisplay(); // Initialize display