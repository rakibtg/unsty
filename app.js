var totalCards = 0
var heights = {
  col1: 0,
  col2: 0,
  col3: 0,
}

const random = () => new Promise( async (resolve, reject) => {
  const uniqid = 10 + totalCards
  const response = await fetch(`https://source.unsplash.com/${uniqid}x${uniqid}/`)
  const id = response
    .url
    .split('https://images.unsplash.com/')[1]
    .split('?crop')[0]
  resolve({
    id,
    thumb: `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=resize&fit=max&w=200`,
    small: `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=resize&fit=max&w=800`,
    large: `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&q=100&fm=jpg&crop=resize&fit=max`
  })
})

const imageCard = (data) => {
  return `
    <div class="card-wrapper card${totalCards}">
      <div>
        <a href="${data.small}" target="_blank">
          <img src="${data.thumb}"/>
        </a>
      </div>
      <div class="btn-wrapper">
        <button onclick="console.log('${data.id}')">Download</button>
      </div>
    </div>
  `
}

const populate = async () => {
  document.querySelector('.col1').innerHTML = ''
  document.querySelector('.col2').innerHTML = ''
  document.querySelector('.col3').innerHTML = ''
  document.querySelector('.col4').innerHTML = ''
  let col = 1
  for ( const image of new Array(20) ) {
    const data = await random()
    // console.log(data)
    const colClass = 'col' + col
    document.querySelector(`.${colClass}`).append(
      $(imageCard(data))[0]
    )
    if(col == 4) col = 1
    else col = col + 1
    // console.log(heights)
    totalCards = totalCards + 1
  }
}

populate()

// window.onscroll = function(ev) {
//   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//     document.querySelector('.col1').innerHTML = ''
//     document.querySelector('.col2').innerHTML = ''
//     document.querySelector('.col3').innerHTML = ''
//     document.querySelector('.col4').innerHTML = ''
//     populate()
//   }
// };