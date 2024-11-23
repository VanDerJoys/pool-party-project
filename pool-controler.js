const moment = require("moment");
const sessionModel = require("./pool-model");

class Session {
    /**
     * FONCTION D'AJOUT D'UNE SESSION
     *
     * Elle prend en paramètre l'identifiant de celui qui va coacher la séance et l'objet contenant les informations de la séance
     */
    async addSession(session) {
        try {
            let sessionResults = new sessionModel({
                createdAt: moment().format("YYYY-MM-DD"),
                label: session.label,
                description: session.description,
                user: session.coachId,
                price: session.price,
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

    async getSessions() {
        try {
            let pools = await sessionModel
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

    async getCustomerSessions(page, limit, idCustomer) {
        try {
            const skip = (page - 1) * (limit || 0);
            const totalCount = await programmedSession.countDocuments();
            const totalPages = Math.ceil(totalCount / limit);
            let nextPage = null;
            if (page < totalPages) {
                nextPage = page + 1;
            }

            let sessions = await programmedSession
                .find({ customer: idCustomer })
                .skip(skip)
                .limit(limit)
                .populate("user", { fullName: 1 })
                .populate({
                    path: 'session',
                    match: { status: { $ne: 'active' } }
                });

            return {
                status: 200,
                message: "Séances récupérées",
                data: {
                    sessions: sessions,
                    totalPages: totalPages,
                    currentPage: page,
                    nextPage: nextPage
                },
            };
        } catch (error) {
            throw {
                status: 500,
                message: 'Erreur survenue'
            }
        }
    }

    async updateSession(sessionId, sessionDetails) {
        try {
            await sessionModel.updateOne({ _id: sessionId },
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
            let pool = await sessionModel.findOne({ _id: poolId });

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
                    await sessionModel.updateOne({ _id: sessionId }, { $set: { status: 'deleted' } })
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
                await sessionModel.updateOne({ _id: sessionId }, { $set: { status: 'deleted' } })
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

module.exports = Session;
