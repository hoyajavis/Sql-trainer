const fs = require('fs');
const gp = JSON.parse(fs.readFileSync('src/data/guidedPractice.json', 'utf8'));

if (gp.human_resources) {
  let examples = [];
  for (let pass of gp.human_resources.passes) {
    for (let step of pass.steps) {
      if (step.lesson_content.includes('users') || step.lesson_content.includes('products') || step.lesson_content.includes('orders') || step.lesson_content.includes('customers')) {
        examples.push(step.lesson_content);
      }
    }
  }
  console.log('Found ' + examples.length + ' generic business examples in HR track.');
}
