// const DespatchEnvelop = require('../models/tables/despatch_envelop');
const TransitSlipDistribution = require('../models/tables/transit_slip_distribution');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const utilityRepository = require('../repositories/utility-repository');

const transitSlipDistributionRepository = (module.exports = {});

async function createTransitSlipDistribution(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const maxId = (await TransitSlipDistribution.max('id') ?? 0) + 1;
            req.body.id = maxId;
            req.body.created_at = utilityRepository.getCurrentDateTime;
            const transitSlipDistribution = await TransitSlipDistribution.create(req.body, { transaction: t });
            output.message = 'Transit slip distributed Successfully';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: transitSlipDistribution,
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

transitSlipDistributionRepository.create = async function (req, res) {
    const output = await createTransitSlipDistribution(req);
    res.status(output.statusCode);
    res.send(output);
};