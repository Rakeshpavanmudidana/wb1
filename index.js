
function getAge(dateString) {
  const today = new Date();
  const dob = new Date(dateString);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}
 
function validateDob(dob) {
  const age = getAge(dob);
  return age >= 18 && age <= 55;
}





let entries = JSON.parse(localStorage.getItem('entries')) || [];

addrows();

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dobInput = document.getElementById('dob');
    const dob = dobInput.value;
    const acceptedTerms = document.getElementById('toggle').checked ? 'true' : 'false';
    if ( !validateDob( dob ) )
    {
      alert("Age must be between 18 and 55.");
      return;
      
    }
      entries.push({
        name,
        email,
        password,
        dob,
        acceptedTerms
      });
  
      localStorage.setItem('entries', JSON.stringify(entries));
      
      addrow({
        name,
        email,
        password,
        dob,
        acceptedTerms
      });
      this.reset();
  });

  function addrow( entry){
    const table = document.querySelector('table');
    const newRow = table.insertRow(-1);
    newRow.innerHTML = `
      <td class="px-3 py-2 whitespace-nowrap">${entry.name}</td>
      <td class="px-3 py-2 whitespace-nowrap">${entry.email}</td>
      <td class="px-3 py-2 whitespace-nowrap">${entry.password}</td>
      <td class="px-3 py-2 whitespace-nowrap">${entry.dob}</td>
      <td class="px-3 py-2 whitespace-nowrap">${entry.acceptedTerms}</td>
    `;
  }

  
  function addrows() {
    entries.forEach(entry => {
      addrow(entry);
    });
  }
