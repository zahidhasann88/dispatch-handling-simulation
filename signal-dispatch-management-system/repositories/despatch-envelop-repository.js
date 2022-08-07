const DespatchEnvelop = require('../models/tables/despatch_envelop');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const utilityRepository = require('../repositories/utility-repository');
const { QueryTypes } = require('sequelize');

const despatchEnvelopRepository = (module.exports = {});

async function createDespatchEnvelop(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const letterNoCheck = await DespatchEnvelop.findOne({
                where: {
                    letter_no: req.body.letter_no,
                },
            });

            if (letterNoCheck) {
                output.message = 'The given letter no already exists.';
                output.statusCode = 409;
                return output;
            }
            const maxId = ((await DespatchEnvelop.max('id')) ?? 0) + 1;
            req.body.id = maxId;
            req.body.created_at = utilityRepository.getCurrentDateTime;
            req.body.updated_at = req.body.created_at
            req.body.updated_by = req.body.created_by;
            const despatchEnvelop = await DespatchEnvelop.create(req.body, { transaction: t });

            output.message = 'Despatch Envelop Creation Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: despatchEnvelop,
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

async function getDespatchEnvelopById(req) {
    const output = new ResponseDto();
    try {
        const despatchEnvelop = await DespatchEnvelop.findOne({
            where: {
                id: req.body.id,
            },
        });

        if (!despatchEnvelop) {
            output.message = 'No despatch envelop found with the given id.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'Despatch Envelop found with the given id.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: despatchEnvelop,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getDespatchEnvelopByLetterNo(req) {
    const output = new ResponseDto();
    try {
        const despatchEnvelop = await DespatchEnvelop.findOne({
            where: {
                letter_no: req.body.letter_no,
            },
        });

        if (!despatchEnvelop) {
            output.message = 'No Despatch Envelop found with the given letter no.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'Despatch Envelop found with the given letter no.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: despatchEnvelop,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function deleteDespatchEnvelopById(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const despatchEnvelop = await DespatchEnvelop.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!despatchEnvelop) {
                output.message = 'No despatchEnvelop found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await DespatchEnvelop.destroy({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'Despatch Envelop Deletion Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: despatchEnvelop,
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

async function updateDespatchEnvelopById(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const despatchEnvelop = await DespatchEnvelop.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!despatchEnvelop) {
                output.message = 'No despatch envelop found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await DespatchEnvelop.update(req.body, {
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'Despatch Envelop Update Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: despatchEnvelop,
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

async function getDespatchEnvelopByCreatedBy(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const despatchEnvelop = await DespatchEnvelop.findAll({
                where: {
                    created_by: req.body.created_by,
                },
                order: [['id', 'desc']],
            });

            if (!despatchEnvelop) {
                output.message = 'No Despatch Envelop exists by the given criteria.';
                output.statusCode = 409;
                return output;
            }

            output.message = 'List of Despatch Envelop by the given user';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: despatchEnvelop,
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

// async function getDespatchEnvelopByCreatedFor(req) {
//     const output = new ResponseDto();
//     try {
//         const result = await sequelize.transaction(async (t) => {
//             const despatchEnvelop = await DespatchEnvelop.findAll({
//                 where: {
//                     created_for: req.body.created_for,
//                 },
//                 order: [['id', 'desc']],
//             });

//             if (!despatchEnvelop) {
//                 output.message = 'No Despatch Envelop exists by the given criteria.';
//                 output.statusCode = 409;
//                 return output;
//             }

//             output.message = 'List of Despatch Envelop for the given user';
//             output.isSuccess = true;
//             output.statusCode = 200;
//             output.payload = {
//                 output: despatchEnvelop,
//             };
//         });

//         return output;
//     } catch (error) {
//         output.payload = {
//             errorDetails: error,
//         };

//         return output;
//     }
// }

async function getAllDespatchEnvelopSentToUser(req) {
    const output = new ResponseDto();
    try {
        const results = await sequelize.query(
            `
            select de.*, ui.user_full_name  from despatch_envelop de 
            join despatch_envelop_distribution ded 
            on de.id = ded.despatch_envelop_id 
            join user_info ui 
            on ded.sent_from = ui.id 
            where ded.sent_to = ` + req.body.sent_to + `
            order by ded.id desc
            `,
            {
                type: QueryTypes.SELECT
            });

        if (!results) {
            output.message = 'No despatch envelop found.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'List of despatch envelop.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: results,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

despatchEnvelopRepository.create = async function (req, res) {
    const output = await createDespatchEnvelop(req);
    res.status(output.statusCode);
    res.send(output);
};

despatchEnvelopRepository.getById = async function (req, res) {
    const output = await getDespatchEnvelopById(req);
    res.status(output.statusCode);
    res.send(output);
};

despatchEnvelopRepository.getAllForUser = async function (req, res) {
    const output = await getAllDespatchEnvelopSentToUser(req);
    res.status(output.statusCode);
    res.send(output);
};

despatchEnvelopRepository.getByLetterNo = async function (req, res) {
    const output = await getDespatchEnvelopByLetterNo(req);
    res.status(output.statusCode);
    res.send(output);
};

despatchEnvelopRepository.getByCreatedBy = async function (req, res) {
    const output = await getDespatchEnvelopByCreatedBy(req);
    res.status(output.statusCode);
    res.send(output);
};

// despatchEnvelopRepository.getByCreatedFor = async function (req, res) {
//     const output = await getDespatchEnvelopByCreatedFor(req);
//     res.status(output.statusCode);
//     res.send(output);
// };

despatchEnvelopRepository.delete = async function (req, res) {
    const output = await deleteDespatchEnvelopById(req);
    res.status(output.statusCode);
    res.send(output);
};

despatchEnvelopRepository.update = async function (req, res) {
    const output = await updateDespatchEnvelopById(req);
    res.status(output.statusCode);
    res.send(output);
};
