import User from '../models/User.js'

export const getUserProfile = async (req, res) => {
    const {id} = req.user
    try {
        const userByID = await User.findById(id).select('-password')
        
        return res.status(200).json(userByID)

    } catch (err) {
        return res.status(500).json(`Internal server error`, err)   
    }
}