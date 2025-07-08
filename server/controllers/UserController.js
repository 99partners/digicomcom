import userModel from '../models/UserModel.js';

export const getUserData = async(req, res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({
            success: true,
            userData:{
                name: user.name, 
                isAccountVerified: user.isAccountVerified,
            }
        });
    }catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export const getDashboardStats = async (req, res) => {
    try {
        // Get user ID from the authenticated request
        const userId = req.user.id;

        // For now, return sample data
        // In a real application, you would query your database for actual statistics
        const stats = {
            success: true,
            stats: {
                totalOrders: 0,
                revenue: 0,
                activeProducts: 0,
                recentActivity: []
            }
        };

        res.json(stats);
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
    }
};