const dbClient = require("../../utils/dbClient");

async function getAll(req, res) {
	const outfits = await dbClient.outfit.findMany();
	res.json(outfits);
}
async function getOneById(req, res) {
	const id = Number(req.params.id);
	const outfit = await dbClient.outfit.findUnique({ where: { id } });
	res.json(outfit);
}
async function createOne(req, res) {
	const { season, designerId, eventId, guestId } = req.body;
	try {
		const savedOutfit = await dbClient.outfit.create({
			data: {
				season,
				designer: { connect: { designerId } },
				event: { connect: { eventId } },
				guest: guestId ? { connect: { guestId } } : null,
			},
		});
		res.json({ savedOutfit });
	} catch (error) {
		res.json({ error: error.message });
	}
}
async function deleteById(req, res) {
	const id = Number(req.params.id);

	try {
		const deletedoutfit = await dbClient.outfit.delete({
			where: { id },
		});
		res.json({ deletedoutfit });
	} catch (error) {
		res.json({ error });
	}
}

module.exports = { getAll, getOneById, createOne, deleteById };
