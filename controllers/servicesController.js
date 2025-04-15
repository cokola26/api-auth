import Service from "../models/Service.js";



export const getAllServices = async (req, res) => {
    try{
        const services = await Service.find()
        if(services.length < 1){
            return res.status(404).json(`Services not found`)
        }
        return res.status(200).json(services)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}

export const getServiceById = async (req, res) => {
    try{
        const {id} = req.params
        const services = await Service.findById(id).populate('userID', '-password')
        if(!services){
            return res.status(404).json(`Services not found`)
        }
        return res.status(200).json(services)
    }
    catch(err){
}
}

export const createService = async (req, res) => {
    console.log(req.user)
    try{
        const newService = await Service.create(req.body)
        if(newService){
            return res.status(201).json(`Your event has been created`)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Impossible to create this service`, err)
    }
}

export const showService = async (req, res) => {
    try{
        const {id} = req.params
        const service = await Service.findById(id)
        if(service){
            return res.status(200).json(service)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Service not found`, err)
        }
    }

export const updateService = async (req, res) => {
    try{
        const {id} = req.params
        const updatedService = await Service.findByIdAndUpdate(id, req.body, {new: true})
        if(updatedService){
            return res.status(200).json(updatedService)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Impossible to update this service`, err)
        }
    }


export const deleteService = async (req, res) => {
    try{
        const {id} = req.params
        const deletedService = await Service.findByIdAndDelete(id)
        if(deletedService){
            return res.status(200).json(deletedService)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error : impossible to delete the service`, err)
        }
    }