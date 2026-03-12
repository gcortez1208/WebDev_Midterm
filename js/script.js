// NOTE: You may use the sample user in the data/user.json file to test your code before you hit the API. 
// Write your code below.
function populateProfile(user) {
  const name=document.getElementById('name');
  const email=document.getElementById('email');
  const address = document.getElementById('address');
  const age = document.getElementById('age');
  const img = document.querySelector('.image img');

  if (!user) return;

  name.textContent = `${user.name.first} ${user.name.last}`;
  email.textContent=user.email;
  address.textContent=`${user.location.city}, ${user.location.state}`;
  age.textContent=user.dob.age;
  img.src=user.picture.large;
  
}

const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    const [user] = json.results;
    populateProfile(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    alert('Could not load a new profile.');
  }
});

