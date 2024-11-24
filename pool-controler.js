const moment = require("moment");
const poolModel = require("./pool-model");

class PoolControler {

    async addPool(poolDetails) {
        try {
            let sessionResults = new poolModel({
                name: poolDetails.name,
                description: poolDetails.description,
                password: poolDetails.password,
                price: poolDetails.price,
                date: poolDetails.date,
                time: poolDetails.time,
                address: poolDetails.city
            });

            await sessionResults.save();
            return {
                status: 201,
                message: "Séance enregistrée",
            };
        } catch (error) {
            throw {
                status: 500,
                message: "Une erreur est survenue",
            };
        }
    }

    async getPools() {
        try {
            let pools = await poolModel
                .find()
            // .populate("user", { fullName: 1 });
            return {
                status: 200,
                message: "Séances récupérées",
                pools
            };
        } catch (error) {
            throw {
                status: 500,
                message: "Une erreur est survenue",
            };
        }
    }

    async updateSession(sessionId, sessionDetails) {
        try {
            await poolModel.updateOne({ _id: sessionId },
                {
                    $set: {
                        coach: sessionDetails.coach,
                        price: sessionDetails.price,
                        label: sessionDetails.label,
                        description: sessionDetails.description,
                        updatedAt: moment().format('YYYY-MM-DD')
                    }
                },
            );

            return {
                status: 200,
                message: "Séance modifiée",
            };
        } catch (error) {
            throw {
                status: 500,
                message: "Une erreur est survenue",
            };
        }
    }

    async getPool(poolId) {
        try {
            let pool = await poolModel.findOne({ _id: poolId });

            return {
                status: 200,
                message: "Séance modifiée",
                pool
            };
        } catch (error) {
            throw {
                status: 500,
                message: "Une erreur est survenue",
            };
        }
    }

    async deleteSession(sessionId) {
        try {
            let sessionResults = await programmedSession.findOne({
                session: sessionId,
            });

            if (sessionResults) {
                const expired = sessionResults.every(session => moment(session.endDate) < moment().format('YYYY-MM-DD'));

                if (expired) {
                    await poolModel.updateOne({ _id: sessionId }, { $set: { status: 'deleted' } })
                    return {
                        status: 200,
                        message: 'Session supprimée'
                    }
                } else {
                    throw {
                        status: 403,
                        message: 'Ce forfait est actif chez un ou certains client(s) ! Vous ne pouvez pas le supprimer !'
                    }
                }
            } else {
                await poolModel.updateOne({ _id: sessionId }, { $set: { status: 'deleted' } })
                return {
                    status: 200,
                    message: 'Session supprimée'
                }
            }
        } catch (error) {
            throw {
                status: 500,
                message: "Une erreur est survenue",
            };
        }
    }

}

module.exports = PoolControler;
