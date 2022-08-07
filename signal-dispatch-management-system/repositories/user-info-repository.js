const { Op } = require('sequelize');
const User = require('../models/tables/user_info');
const ResponseDto = require('../models/DTOs/ResponseDto');
const sequelize = require('../utils/db-connection');
const utilityRepository = require('../repositories/utility-repository');

const userRepository = (module.exports = {});

async function createUser(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const userCheckUserName = await User.findOne({
                where: {
                    user_name: req.body.user_name,
                },
            });

            if (userCheckUserName) {
                output.message = 'The given user name already exists.';
                output.statusCode = 409;
                return output;
            }

            const userCheckEmail = await User.findOne({
                where: {
                    user_email: req.body.user_email,
                },
            });
            if (userCheckEmail) {
                output.message = 'The given email already exists.';
                output.statusCode = 409;
                return output;
            }

            const maxId = ((await User.max('id')) ?? 0) + 1;
            req.body.id = maxId;
            req.body.created_at = utilityRepository.getCurrentDateTime;
            req.body.updated_at = utilityRepository.getCurrentDateTime;
            req.body.updated_by = req.body.created_by;
            const user = await User.create(req.body, { transaction: t });

            output.message = 'User Creation Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: user,
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

async function getUserById(req) {
    const output = new ResponseDto();
    try {
        const user = await User.findOne({
            where: {
                id: req.body.id,
            },
        });

        if (!user) {
            output.message = 'No user found with the given id.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'User found with the given id.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getUserByRole(req) {
    const output = new ResponseDto();
    try {
        const user = await User.findAll({
            where: {
                user_role: req.body.user_role,
            },
            order: [
                ['id', 'DESC']
            ],
        });

        if (!user) {
            output.message = 'No user found with the given role: ' + req.body.user_role;
            output.statusCode = 404;
            return output;
        }

        output.message = 'User found with the given role: ' + req.body.user_role;
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };
        return output;
    }
}

async function getUserByUserName(req) {
    const output = new ResponseDto();
    try {
        const user = await User.findOne({
            where: {
                user_name: req.body.user_name,
            },
        });

        if (!user) {
            output.message = 'No user found with the given user name.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'User found with the given user name.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function deleteUser(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!user) {
                output.message = 'No user found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await User.destroy({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'User Deletion Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: user,
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

async function updateUser(req) {
    const output = new ResponseDto();
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            if (!user) {
                output.message = 'No user found with the given id.';
                output.statusCode = 404;
                return output;
            }

            await User.update(req.body, {
                where: {
                    id: req.body.id,
                },
                transaction: t,
            });

            output.message = 'User Update Successful.';
            output.isSuccess = true;
            output.statusCode = 200;
            output.payload = {
                output: user,
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

async function getUserByUserAndPassword(req) {
    const output = new ResponseDto();
    try {
        const user = await User.findOne({
            where: {
                user_name: req.body.user_name,
            },
        });

        if (!user) {
            output.message = 'No user found with the given credential. Please Sign Up First.';
            output.statusCode = 404;
            return output;
        }

        if (user.user_password != req.body.user_password) {
            output.message = "Username and password didn't match";
            output.statusCode = 409;
            return output;
        }

        output.message = 'User found with the given credential.';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getAllUser() {
    const output = new ResponseDto();
    try {
        const user = await User.findAll({
            order: [
                ['user_full_name', 'ASC'],
                ['id', 'DESC'],
            ],
        });

        if (!user) {
            output.message = 'No user found.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'List of users';
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getUserSearchByFullName(req) {
    const output = new ResponseDto();
    try {
        const user = await User.findAll({
            where: {
                [Op.substring]: req.body.user_full_name,
            },
            order: [
                ['user_full_name', 'ASC'],
                ['id', 'DESC'],
            ],
        });

        if (!user) {
            output.message = 'No user found.';
            output.statusCode = 404;
            return output;
        }

        output.message = 'List of users';
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };

        return output;
    }
}

async function getUserSearchByUserRole(req) {
    const output = new ResponseDto();
    try {
        const user = await User.findAll({
            where: {
                user_role: { [Op.substring]: `%${req.body.user_role}%` },
            },
            order: [
                ['id', 'DESC']
            ],
        });

        if (!user) {
            output.message = 'No user found with the given role: ' + req.body.user_role;
            output.statusCode = 404;
            return output;
        }

        output.message = 'User found with the given role: ' + req.body.user_role;
        output.isSuccess = true;
        output.statusCode = 200;
        output.payload = {
            output: user,
        };
        return output;
    } catch (error) {
        output.payload = {
            errorDetails: error,
        };
        return output;
    }
}

userRepository.create = async function (req, res) {
    const output = await createUser(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getById = async function (req, res) {
    const output = await getUserById(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getAll = async function (req, res) {
    const output = await getAllUser();
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getByUn = async function (req, res) {
    const output = await getUserByUserName(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getByUnAndPass = async function (req, res) {
    const output = await getUserByUserAndPassword(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getByLikeFln = async function (req, res) {
    const output = await getUserSearchByFullName(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.deleteById = async function (req, res) {
    const output = await deleteUser(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.updateById = async function (req, res) {
    const output = await updateUser(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getByRole = async function (req, res) {
    const output = await getUserByRole(req);
    res.status(output.statusCode);
    res.send(output);
};

userRepository.getByLikeRole = async function (req, res) {
    const output = await getUserSearchByUserRole(req);
    res.status(output.statusCode);
    res.send(output);
};