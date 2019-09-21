var totalCards = 0
var heights = {
  col1: 0,
  col2: 0,
  col3: 0,
}
var fetching = false
var items = []
const random = () => new Promise( async (resolve, reject) => {
  const uniqid = 1 + totalCards
  const response = await fetch(`https://source.unsplash.com/${uniqid}x${uniqid}/`)
  const id = response
    .url
    .split('https://images.unsplash.com/')[1]
    .split('?crop')[0]
  if(!items.includes(id)) {
    items.push(id)
    resolve({
      id,
      thumb: `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=resize&fit=max&w=220`,
      small: `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=resize&fit=max&w=800`,
      large: `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&q=100&fm=jpg&crop=resize&fit=max`
    })
  } else {
    console.log('Duplicate found.')
    resolve(false)
  }
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

const getColumn = () => {
  let cols = { 'col1': 0, 'col2': 0, 'col3': 0, 'col4': 0 }
  Object.keys(cols).map(classNameOfCol => {
    const colHeight = document.querySelector(`div.${classNameOfCol} .holder`).scrollHeight
    cols[classNameOfCol] = colHeight
  })
  const candidate = Math.min(...Object.values(cols))
  let elected = null
  Object.keys(cols).map(classNameOfCol => {
    const heightValue = cols[classNameOfCol]
    if(heightValue === candidate) {
      elected = classNameOfCol
    }
  })
  return elected
}

const populate = async () => {
  if(!fetching) {
    fetching = true
    for ( const index of new Array(20).keys() ) {
      const data = await random()
      if(data) {
        const colName = getColumn()
        document.querySelector(`.${colName} span.holder`).append(
          $(imageCard(data))[0]
        )
      }
      totalCards = totalCards + 1
      if(index == 19) {
        fetching = false
      }
    }

  }
}

populate()

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // document.querySelector('.col1').innerHTML = ''
    // document.querySelector('.col2').innerHTML = ''
    // document.querySelector('.col3').innerHTML = ''
    // document.querySelector('.col4').innerHTML = ''
    populate()
  }
};