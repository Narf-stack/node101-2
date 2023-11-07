

const login = async (req,res)=> {
  res.status(200).send('fake loggin signup route')
}

const dashboard = async (req,res) => {
  const luckyNumber = Math.random()*100

  res.status(200).json({ msg:`hello Doe`, secret:`num: ${luckyNumber}`})
}

module.exports = {login, dashboard}