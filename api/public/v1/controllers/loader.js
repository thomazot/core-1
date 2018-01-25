const blockchain = requireFrom('core/blockchainManager').getInstance()
const config = requireFrom('core/config')
const utils = require('../utils')

class LoaderController {
  status (req, res, next) {
    utils.respondWith('ok', {
      loaded: blockchain.isSynced(blockchain.lastBlock),
      now: blockchain.lastBlock ? blockchain.lastBlock.data.height : 0,
      blocksCount: blockchain.networkInterface.getNetworkHeight() - blockchain.lastBlock.data.height
    })
  }

  syncing (req, res, next) {
    utils.respondWith('ok', {
      syncing: !blockchain.isSynced(blockchain.lastBlock),
      blocks: blockchain.networkInterface.getNetworkHeight() - blockchain.lastBlock.data.height,
      height: blockchain.lastBlock.data.height,
      id: blockchain.lastBlock.data.id
    })
  }

  autoconfigure (req, res, next) {
    utils.respondWith('ok', {
      network: {
        nethash: config.network.nethash,
        token: config.network.client.token,
        symbol: config.network.client.symbol,
        explorer: config.network.client.explorer,
        version: config.network.pubKeyHash
      }
    })
  }
}

module.exports = new LoaderController()
