let messageObject = (from, text)=>{
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

let messageLocationObject = (from, lat, long)=>{
  return {
    from,
    map: `https://www.google.co.in/maps/place/${lat},${long}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {messageObject, messageLocationObject}
