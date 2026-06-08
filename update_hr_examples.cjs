const fs = require('fs');
const gp = JSON.parse(fs.readFileSync('src/data/guidedPractice.json', 'utf8'));

if (gp.human_resources) {
  for (let pass of gp.human_resources.passes) {
    for (let step of pass.steps) {
      let l = step.lesson_content;
      
      // Basic table replacements
      l = l.replace(/users/g, 'employees');
      l = l.replace(/products/g, 'payrolls');
      l = l.replace(/orders/g, 'performance_reviews');
      l = l.replace(/customers/g, 'stores');
      l = l.replace(/departments/g, 'departments'); // Just in case
      l = l.replace(/accounts/g, 'payrolls');
      l = l.replace(/stock/g, 'departments');
      l = l.replace(/competitors/g, 'competitor_salaries');
      
      // Column/Data replacements
      l = l.replace(/price/g, 'salary');
      l = l.replace(/amount/g, 'rating');
      l = l.replace(/balance/g, 'bonus');
      l = l.replace(/email/g, 'middle_name');
      l = l.replace(/status = 'active'/g, "employment_type = 'Full-Time'");
      l = l.replace(/Alice/g, "New York"); // if we changed customers to stores
      l = l.replace(/user_id/g, 'employee_id');
      l = l.replace(/name/g, 'first_name'); // For stores and employees
      l = l.replace(/temp_reports/g, 'temp_rosters');
      l = l.replace(/idx_employee_middle_name/g, 'idx_emp_status');
      l = l.replace(/Activeemployees/g, 'ActiveEmployees');
      
      step.lesson_content = l;
    }
  }
}

fs.writeFileSync('src/data/guidedPractice.json', JSON.stringify(gp, null, 2));
console.log('HR generic examples replaced.');
