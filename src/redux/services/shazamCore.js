const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '518593497bmsha3967141eaf4714p18752cjsnd66f79a83220',
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
    }
  };
  
  
  fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));