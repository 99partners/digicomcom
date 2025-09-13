import React, { useState, useEffect } from 'react';

const MeeshoCalculator = () => {
  // State for input values
  const [costPrice, setCostPrice] = useState('');
  const [shippingCharges, setShippingCharges] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [customGstRate, setCustomGstRate] = useState('');
  const [showCustomGst, setShowCustomGst] = useState(false);

  // State for calculated values
  const [calculations, setCalculations] = useState({
    costPrice: 0,
    shippingCharges: 0,
    gstOnCostPrice: 0,
    sellingPriceWithoutGst: 0,
    sellingPriceWithGst: 0
  });

  // Format currency function
  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Handle GST rate change
  const handleGstRateChange = (e) => {
    const value = e.target.value;
    setGstRate(value);
    setShowCustomGst(value === 'custom');
    if (value !== 'custom') {
      setCustomGstRate('');
    }
  };

  // Calculate prices whenever input values change
  useEffect(() => {
    calculatePrices();
  }, [costPrice, shippingCharges, gstRate, customGstRate]);

  // Calculate prices function
  const calculatePrices = () => {
    // Convert input values to numbers, defaulting to 0 if empty
    const cp = parseFloat(costPrice) || 0;
    const sc = parseFloat(shippingCharges) || 0;
    
    // Determine GST rate to use
    let gstPercentage = 0;
    if (gstRate === 'custom') {
      gstPercentage = parseFloat(customGstRate) || 0;
    } else {
      gstPercentage = parseFloat(gstRate) || 0;
    }
    
    // Calculate GST on Cost Price
    const gstOnCostPrice = (cp * gstPercentage) / 100;
    
    // Calculate Selling Price Without GST
    const sellingPriceWithoutGst = cp + sc + gstOnCostPrice;
    
    // Calculate Selling Price With GST
    const sellingPriceWithGst = sellingPriceWithoutGst * (1 + gstPercentage / 100);
    
    // Update calculations state
    setCalculations({
      costPrice: cp,
      shippingCharges: sc,
      gstOnCostPrice,
      sellingPriceWithoutGst,
      sellingPriceWithGst
    });
  };

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">Meesho Price Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Input Details</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => handleInputChange(e, setCostPrice)}
                  placeholder="0.00"
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Charges</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  value={shippingCharges}
                  onChange={(e) => handleInputChange(e, setShippingCharges)}
                  placeholder="0.00"
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate</label>
              <select
                value={gstRate}
                onChange={handleGstRateChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            {showCustomGst && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom GST Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    value={customGstRate}
                    onChange={(e) => handleInputChange(e, setCustomGstRate)}
                    placeholder="0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Results</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Cost Price:</span>
              <span className="font-medium">{formatCurrency(calculations.costPrice)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Shipping Charges:</span>
              <span className="font-medium">{formatCurrency(calculations.shippingCharges)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">
                GST on Cost Price ({gstRate === 'custom' ? customGstRate : gstRate}%):
              </span>
              <span className="font-medium">{formatCurrency(calculations.gstOnCostPrice)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Selling Price (Without GST):</span>
              <span className="font-medium">{formatCurrency(calculations.sellingPriceWithoutGst)}</span>
            </div>
            
            <div className="flex justify-between py-2 mt-2 bg-green-50 p-2 rounded-md">
              <span className="text-gray-800 font-semibold">Selling Price (Including GST):</span>
              <span className="font-bold text-green-600">
                {formatCurrency(calculations.sellingPriceWithGst)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeeshoCalculator;