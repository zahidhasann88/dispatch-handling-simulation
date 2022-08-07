const TransitSlip = require('../models/tables/transit_slip');
const TransitSlipEnvelop = require('../models/tables/transit_slip_envelop');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const utilityRepository = require('../repositories/utility-repository');
const { QueryTypes } = require('sequelize');

const transitSlipRepository = (module.exports = {});

async function createTransitSlip(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const transitSlipNoCheck = await TransitSlip.findOne({
                where: {
                    transit_slip_no: req.body.transitSlip.transit_slip_no,
                },
            });

            if (transitSlipNoCheck) {
                output.message = 'The given transit slip no already exists.';
                output.statusCode = 409;
                return output;
            }
            const maxId = ((await TransitSlip.max('id')) ?? 0) + 1;
            req.body.transitSlip.id = maxId;
            req.body.transitSlip.created_at = utilityRepository.getCurrentDateTime;
            req.body.transitSlip.updated_at = req.body.transitSlip.created_at;
            req.body.transitSlip.updated_by = req.body.transitSlip.created_by;
            const transitSlip = await TransitSlip.create(req.body.transitSlip, { transaction: t });
            if (!transitSlip) {
                output.message = 'The given transit slip creation failed.';
                output.statusCode = 400;
                return output;
            }
            const maxId2 = ((await TransitSlipEnvelop.max('id')) ?? 0) + 1;
            let len = req.body.transitSlipEnvelop.length;
            for (let i = 0; i < len; i++) {
                req.body.transitSlipEnvelop[i].transit_slip_id = transitSlip?.id;
                req.body.transitSlipEnvelop[i].id = maxId2 + i;
                req.body.transitSlipEnvelop[i].created_at = req.body.transitSlip.created_at;
                req.body.transitSlipEnvelop[i].created_by = req.body.transitSlip.created_by;
                req.body.transitSlipEnvelop[i].updated_at = req.body.transitSlip.updated_at;
                req.body.transitSlipEnvelop[i].updated_by = req.body.transitSlip.updated_by;
            }
            const transitSlipEnvelops = await TransitSlipEnvelop.bulkCreate(req.body.transitSlipEnvelop, { transaction: t });
            if (!transitSlipEnvelops) {
                output.message = 'The given transit slip envelop creation failed.';
                output.statusCode = 400;
                return output;
            }
            output.message = 'Transit Slip Creation Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: {
                    transitSlip: transitSlip,
                    transitSlipEnvelop: transitSlipEnvelops
                },
            };
        });

        return output;
    } catch (error) {
        output.message = 'Transit Slip Creation Failed. Something went wrong. Please try again later.';
        output.isSuccess = false;
        output.statusCode = 500;
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getTransitSlipById(req) {
    const output = new ResponseDto();
    try {
        const transitSlip = await TransitSlip.findOne({
            where: {
                id: req.body.id,
            },
        });

        if (!transitSlip) {
            output.message = 'No transit Slip found with the given id.';
            output.statusCode = 404;
            return output;
        }

        const transitSlipEnvelop = await TransitSlipEnvelop.findAll({
            where: {
                transit_slip_id: transitSlip?.id,
            },
            order: [['id', 'asc']],
        });

        op = {
            transitSlip: transitSlip,
            transitSlipEnvelop: transitSlipEnvelop
        }

        output.message = 'Transit Slip found with the given id.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: op,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getTransitSlipBySlipNo(req) {
    const output = new ResponseDto();
    try {
        const transitSlip = await TransitSlip.findOne({
            where: {
                transit_slip_no: req.body.transit_slip_no,
            },
        });

        if (!transitSlip) {
            output.message = 'No transit Slip found with the given transit slip no.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'Transit Slip found with the given transit slip no.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: transitSlip,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function deleteTransitSlipById(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const transitSlip = await TransitSlip.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!transitSlip) {
                output.message = 'No transitSlip found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await TransitSlip.destroy({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'Transit Slip Deletion Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: transitSlip,
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

async function updateTransitSlipById(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const transitSlip = await TransitSlip.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!transitSlip) {
                output.message = 'No transit slip found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await TransitSlip.update(req.body, {
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'Transit Slip Update Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: transitSlip,
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

async function getTransitSlipByTransitFrom(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const transitSlips = await TransitSlip.findAll({
                where: {
                    transit_from: req.body.transit_from,
                },
                order: [['id', 'desc']],
            });

            if (!transitSlips) {
                output.message = 'No Transit Slip exists by the given criteria.';
                output.statusCode = 409;
                return output;
            }

            output.message = 'List of transit slip by the given user';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: transitSlips,
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

async function getTransitSlipByTransitTo(req) {
    const output = new ResponseDto();
    try {
        const results = await sequelize.query(
            `
            select ts.*, ui.user_full_name  
            from transit_slip ts 
            join transit_slip_distribution tsd 
            on ts.id = tsd.transit_slip_id 
            join user_info ui 
            on tsd.sent_to = ui.id 
            where tsd.sent_to = ` + req.body.sent_to + `
            order by tsd.id desc
            `,
            {
                type: QueryTypes.SELECT
            });
        if (!results) {
            output.message = 'No transit slip found.';
            output.statusCode = 404;
            return output;
        }
        let outputs = [];
        let transitSlip = {};
        let transitSlipEnvelop = [];
        let len = results.length;
        for (let i = 0; i < len; i++) {
            transitSlip = results[i];
            transitSlipEnvelop = await TransitSlipEnvelop.findAll({
                where: {
                    id: transitSlip?.id,
                },
                order: [['id', 'asc']],
            });
            op = {
                transitSlip: transitSlip,
                transitSlipEnvelop: transitSlipEnvelop,
            };
            outputs.push(op);
        }
        output.message = 'List of transit slip.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: outputs,
        };
        return output;
    } catch (error) {
        output.message = 'Transit slip retrieval failed. Something went wrong. Please try again later.';
        output.isSuccess = false;
        output.statusCode = 500;
        output.payload = {
            errorDetails: error,
        };
        return output;
    }
}

transitSlipRepository.create = async function (req, res) {
    const output = await createTransitSlip(req);
    res.status(output.statusCode);
    res.send(output);
};

transitSlipRepository.getById = async function (req, res) {
    const output = await getTransitSlipById(req);
    res.status(output.statusCode);
    res.send(output);
};

transitSlipRepository.getBySlipNo = async function (req, res) {
    const output = await getTransitSlipBySlipNo(req);
    res.status(output.statusCode);
    res.send(output);
};

transitSlipRepository.delete = async function (req, res) {
    const output = await deleteTransitSlipById(req);
    res.status(output.statusCode);
    res.send(output);
};

transitSlipRepository.update = async function (req, res) {
    const output = await updateTransitSlipById(req);
    res.status(output.statusCode);
    res.send(output);
};

transitSlipRepository.getAllByUser = async function (req, res) {
    const output = await getTransitSlipByTransitFrom(req);
    res.status(output.statusCode);
    res.send(output);
};

transitSlipRepository.getAllForUser = async function (req, res) {
    const output = await getTransitSlipByTransitTo(req);
    res.status(output.statusCode);
    res.send(output);
};
