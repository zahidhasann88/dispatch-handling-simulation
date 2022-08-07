// const DespatchEnvelop = require('../models/tables/despatch_envelop');
const DespatchEnvelopDistribution = require('../models/tables/despatch_envelop_distribution');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const utilityRepository = require('../repositories/utility-repository');
// const { QueryTypes } = require('sequelize');

const despatchEnvelopDistributionRepository = (module.exports = {});

async function createDespatchEnvelopDistribution(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const maxId = (await DespatchEnvelopDistribution.max('id') ?? 0) + 1;
            req.body.id = maxId;
            req.body.created_at = utilityRepository.getCurrentDateTime;
            const despatchEnvelopDistribution = await DespatchEnvelopDistribution.create(req.body, { transaction: t });
            output.message = 'Despatch Envelop Distributed Successfully';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: despatchEnvelopDistribution,
            };
        });
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

despatchEnvelopDistributionRepository.create = async function (req, res) {
    const output = await createDespatchEnvelopDistribution(req);
    res.status(output.statusCode);
    res.send(output);
};