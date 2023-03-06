const { Stock } = require('../models')

const GetAllStock = async (req, res) => {
    try {
        const stockList = await Stock.findAll({
            where: { watchlistId: req.params.watchlistId },
        })
        res.send(stockList)
    } catch (error) {
        throw error
    }
}

const AddStock = async (req, res) => {
    const stockName = await Stock.findAll({
        where: { name: req.params.name },
    })
    const found = stockName.find(
        (stock) => stock?.dataValues?.watchlistId === +req.params.watchlistId
    )
    if (!found) {
        try {
            let watchlistId = parseInt(req.params.watchlistId)
            let stockBody = {
                watchlistId,
                ...req.body,
            }
            let stock = await Stock.create(stockBody)
            res.send(stock)
        } catch (error) {
            throw error
        }
    } else {
        res.send({ msg: `Unable to add stock, it already exists.` })
    }
}

const DeleteStock = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        await Stock.destroy({ where: { id: id } })
        res.send({ message: `Deleted stock with an id of ${id}` })
    } catch (error) {
        throw error
    }
}

module.exports = {
    GetAllStock,
    AddStock,
    DeleteStock,
}
