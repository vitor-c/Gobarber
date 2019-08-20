const { User } = require('../models')

class Dash2Controller {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard2', { providers })
  }
}

module.exports = new Dash2Controller()
