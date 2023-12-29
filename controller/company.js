import User from "../schema/user.js";

const saveCompanyDetails = async (req, res) => {
    try {
        const { _id } = req.user;
        const { companyDetails } = req.body;
        await User.findByIdAndUpdate(
            _id,
            { $set: { companyDetails } },
            { new: true },
        );

        res.status(200).send({
            code: 200,
            message: "Company details saved successfully!",
            status: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            code: 400,
            message: error.message,
            status: false,
        });
    }
};

export default saveCompanyDetails;
