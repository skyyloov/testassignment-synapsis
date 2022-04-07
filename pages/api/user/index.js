
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    await clientPromise
    const { method } = req;
    const client = await clientPromise
    const db = client.db("user")
    switch (method) {
        case 'GET':
            try {

                const user = await db.collection("user").find({})
                    .sort({ _id: 1 })
                    .toArray();

                const countUser = await db.collection("user").countDocuments();

                res.status(200).json({ success: true, data: user, countUser })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {

                const body = req.body

                // Guard clause checks for first, last name email, phone, address
                // and returns early if they are not found
                if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.address) {
                    // Sends a HTTP bad request error code
                    return res.status(400).json({ data: 'Please provide all data' })
                }

                const user = await db.collection("user").insertOne(body);

                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }

}
