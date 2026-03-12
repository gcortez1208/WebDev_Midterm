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

// try loading a sample JSON if API call fails
async function loadSampleUser() {
  try {
    const resp = await fetch('./data/user.json');
    const data = await resp.json();
    const [user] = data.results;
    populateProfile(user);
  } catch (e) {
    console.error('sample load failed', e);
    // as a last resort use generated data
    populateProfile(generateRandomUser());
  }
}

function generateRandomUser() {
  const firstNames = ['Alice','Bob','Carol','Dave','Eve'];
  const lastNames = ['Smith','Johnson','Williams','Brown','Jones'];
  const cities = ['New York','London','Tokyo','Paris','Sydney'];
  const states = ['NY','CA','TX','FL','WA'];
  const domains = ['example.com','mail.com','test.org'];
  const rand = arr => arr[Math.floor(Math.random()*arr.length)];
  const age = Math.floor(Math.random()*50)+18;
  const fn = rand(firstNames);
  const ln = rand(lastNames);
  return {
    name:{first:fn,last:ln},
    email:`${fn.toLowerCase()}.${ln.toLowerCase()}@${rand(domains)}`,
    location:{city: rand(cities), state: rand(states)},
    dob:{age},
    picture:{large:'https://via.placeholder.com/140'}
  };
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
    console.warn('API fetch failed, falling back:', error);
    // attempt to load sample data or generate something random
    await loadSampleUser();
  }
});

