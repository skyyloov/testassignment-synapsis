import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    const { query: { id }, method } = req;

    const client = await clientPromise
    const db = client.db("user")

    switch (method) {
        case 'GET':
            try {
                const user = await db.collection("user").find({ _id: ObjectId(id) })
                    .toArray();

                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'PUT':
            try {
                const body = req.body;

                if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.address) {
                    // Sends a HTTP bad request error code
                    return res.status(400).json({ data: 'Please provide all data' })
                }

                const user = await db.collection("user").updateOne({ _id: ObjectId(id) }, { $set: { "firstName": body.firstName, "lastName": body.lastName, "email": body.email, "phone": body.phone, "address": body.address } });

                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'DELETE':
            try {
                const deletedUser = await db.collection("user").findOneAndDelete({ _id: ObjectId(id) });

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }

}