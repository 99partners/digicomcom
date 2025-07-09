import userModel from '../models/UserModel.js';
import PartnerRequest from '../models/PartnerRequest.js'; // Added import for PartnerRequest

export const getUserData = async(req, res)=>{
    try {
        // Get user ID from the authenticated request
        const userId = req.user.id;
        
        const user = await userModel.findById(userId).select('-password -verifyOtp -resetOtp -verifyOtpExpireAt -resetOtpExpireAt');

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            userData: {
                id: user._id,
                name: user.name, 
                email: user.email,
                phone: user.phone,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({
            success: false,
            message: 'Error fetching user data'
        });
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

export const checkPartnerRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Check if the user has any existing partner requests
    const existingRequest = await PartnerRequest.findOne({ userId });
    
    return res.status(200).json({
      success: true,
      hasRequest: !!existingRequest
    });
  } catch (error) {
    console.error('Error checking partner request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check partner request status'
    });
  }
};