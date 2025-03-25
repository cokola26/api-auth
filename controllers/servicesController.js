import Service from "../models/Service.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if(services.length < 1) {
            return res.status(404).json("No services found");
        }
        return res.status(200).json(services);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error: ${err}`);
    }
}

export const createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        if(newService){
        return res.status(201).json(newService);
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(`Internal server error: ${err}`);
    }
}