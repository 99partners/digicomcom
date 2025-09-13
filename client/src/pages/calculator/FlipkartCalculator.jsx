import React, { useState, useEffect } from 'react';

const FlipkartCalculator = () => {
  // State for input values
  const [sellingPrice, setSellingPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingGeography, setShippingGeography] = useState('Local');
  const [sellerTier, setSellerTier] = useState('Platinum');
  const [fulfillmentMethod, setFulfillmentMethod] = useState('FBF');

  // State for calculated values
  const [calculations, setCalculations] = useState({
    commissionFee: 0,
    fixedFee: 0,
    shippingFee: 0,
    totalFees: 0,
    grossMargin: 0
  });

  // Format currency function
  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Calculate fees whenever input values change
  useEffect(() => {
    calculateFees();
  }, [sellingPrice, weight, shippingGeography, sellerTier, fulfillmentMethod]);

  // Calculate fees function
  const calculateFees = () => {
    // Convert input values to numbers, defaulting to 0 if empty
    const sp = parseFloat(sellingPrice) || 0;
    const weightInGrams = parseFloat(weight) || 0;
    
    // Commission Fee calculation based on Seller Tier
    let commissionPercent = 15; // Default
    
    switch(sellerTier) {
      case 'Platinum':
        commissionPercent = 10;
        break;
      case 'Gold':
        commissionPercent = 12;
        break;
      case 'Silver':
        commissionPercent = 15;
        break;
      default:
        commissionPercent = 15;
    }
    
    const commissionFee = (sp * commissionPercent) / 100;
    
    // Fixed Fee calculation based on Selling Price
    let fixedFee = 0;
    
    if (sp < 250) {
      fixedFee = 5;
    } else if (sp >= 250 && sp <= 500) {
      fixedFee = 10;
    } else {
      fixedFee = 20;
    }
    
    // Shipping Fee calculation based on Weight and Geography
    let ratePerSlot = 0;
    
    switch(shippingGeography) {
      case 'Local':
        ratePerSlot = 30;
        break;
      case 'Zonal':
        ratePerSlot = 40;
        break;
      case 'National':
        ratePerSlot = 50;
        break;
      default:
        ratePerSlot = 30;
    }
    
    // Calculate weight slots (ceiling of weight/500)
    const weightSlots = Math.ceil(weightInGrams / 500);
    const shippingFee = weightSlots * ratePerSlot;
    
    // Calculate Total Fees and Gross Margin
    const totalFees = commissionFee + fixedFee + shippingFee;
    const grossMargin = sp - totalFees;
    
    // Update calculations state
    setCalculations({
      commissionFee,
      fixedFee,
      shippingFee,
      totalFees,
      grossMargin
    });
  };

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">Flipkart Profit Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Input Details</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => handleInputChange(e, setSellingPrice)}
                  placeholder="0.00"
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => handleInputChange(e, setWeight)}
                  placeholder="0"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">g</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Geography</label>
              <select
                value={shippingGeography}
                onChange={(e) => handleInputChange(e, setShippingGeography)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="Local">Local</option>
                <option value="Zonal">Zonal</option>
                <option value="National">National</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seller Tier</label>
              <select
                value={sellerTier}
                onChange={(e) => handleInputChange(e, setSellerTier)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fulfillment Method</label>
              <select
                value={fulfillmentMethod}
                onChange={(e) => handleInputChange(e, setFulfillmentMethod)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="FBF">Flipkart Fulfilled (FBF)</option>
                <option value="Non-FBF">Seller Fulfilled (Non-FBF)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Results</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Commission Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.commissionFee)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Fixed Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.fixedFee)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Shipping Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.shippingFee)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Fees:</span>
              <span className="font-medium">{formatCurrency(calculations.totalFees)}</span>
            </div>
            
            <div className="flex justify-between py-2 mt-2 bg-green-50 p-2 rounded-md">
              <span className="text-gray-800 font-semibold">Gross Margin:</span>
              <span className={`font-bold ${calculations.grossMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(calculations.grossMargin)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipkartCalculator;