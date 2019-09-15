/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// axios.get('https://api.github.com/users/osogrizz')
//   .then (response => {
//       githubCardCreator(response.data)
//       console.log(response.data);
//      })
//      .catch( err => {
//        console.log(err);
//      })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/


/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];
const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function githubCardCreator(data) {
  // create elements
  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const profileLink  = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // add classes and attributes
  card.classList.add('card');
  image.setAttribute('src', data.avatar_url);
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  // add content: 
  name.textContent = data.name ? `${data.name}` : '';
  username.textContent = `${data.login}`
  location.textContent = data.location ? `${data.location}` : '';
  profile.textContent = `Profile: `;
  profileLink.setAttribute('href', `${data.html_url}`);
  profileLink.setAttribute('target', `_blank`);
  profileLink.textContent = `${data.html_url}`;
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = data.bio ? `${data.bio}` : '';
  
  // append elements
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileLink);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  
  return card

}

const cards = document.querySelector('.cards');

axios.get(`https://api.github.com/users/osogrizz`)
  .then( response => {
    cards.appendChild(githubCardCreator(response.data));  
    // console.log(response.data);
  })
  // programatically creates follower cards currently exeeds API rate limit.
  axios.get(`https://api.github.com/users/osogrizz/followers`)
    .then(response => {
      response.data.forEach( user => {
        followersArray.push(user.login);
      })
      followersArray.forEach( (user, index) => {
        console.log(index)
        if (index < 5) {
          axios.get(`https://api.github.com/users/${user}`)
          .then(response => {
            cards.appendChild(githubCardCreator(response.data));
            console.log(response.data)
          })
        }
      })
      console.log(followersArray);
    })

  // Uses provided github user names to manually create array.
  // axios.get(`https://api.github.com/users/osogrizz/followers`)
  //   .then(response => {
  //     console.log(response)
  //     followersArray.forEach( user => {
  //       console.log(user)
  //       axios.get(`https://api.github.com/users/${user}`)
  //         .then( response => {
  //           console.log(response.data);
  //           cards.appendChild(githubCardCreator(response.data));
  //         })
  //     })
  //   })
  
  .catch( err => {
    console.log(err);
  })




/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
