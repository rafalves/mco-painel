export default eventHandler(() => {
  const inicio = new Date()
  console.log('início request: ' + inicio)

  return { nitro: 'Is Awesome!' }
})
