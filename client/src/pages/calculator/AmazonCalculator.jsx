import React, { useState, useEffect } from 'react';

const AmazonCalculator = () => {
  // State for input values
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [referralFeePercent, setReferralFeePercent] = useState('15'); // Default 15%
  const [closingFee, setClosingFee] = useState('');
  const [shippingFee, setShippingFee] = useState('');
  const [gstPercent, setGstPercent] = useState('18'); // Default 18%

  // State for calculated values
  const [calculations, setCalculations] = useState({
    referralFee: 0,
    closingFee: 0,
    shippingFee: 0,
    totalFees: 0,
    gst: 0,
    totalCost: 0,
    profit: 0
  });

  // Format currency function
  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Calculate profit whenever input values change
  useEffect(() => {
    calculateProfit();
  }, [sellingPrice, costPrice, referralFeePercent, closingFee, shippingFee, gstPercent]);

  // Calculate profit function
  const calculateProfit = () => {
    // Convert input values to numbers, defaulting to 0 if empty
    const sp = parseFloat(sellingPrice) || 0;
    const cp = parseFloat(costPrice) || 0;
    const rfPercent = parseFloat(referralFeePercent) || 0;
    const cf = parseFloat(closingFee) || 0;
    const sf = parseFloat(shippingFee) || 0;
    const gstPerc = parseFloat(gstPercent) || 0;

    // Calculate fees
    const referralFee = (sp * rfPercent) / 100;
    const totalFeesBeforeGST = referralFee + cf + sf;
    const gst = (totalFeesBeforeGST * gstPerc) / 100;
    const totalCost = cp + totalFeesBeforeGST + gst;
    const profit = sp - totalCost;

    // Update calculations state
    setCalculations({
      referralFee,
      closingFee: cf,
      shippingFee: sf,
      totalFees: totalFeesBeforeGST,
      gst,
      totalCost,
      profit
    });
  };

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">Amazon Profit Calculator</h2>
      
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Referral Fee %</label>
              <div className="relative">
                <input
                  type="number"
                  value={referralFeePercent}
                  onChange={(e) => handleInputChange(e, setReferralFeePercent)}
                  placeholder="15"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Closing Fee</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  value={closingFee}
                  onChange={(e) => handleInputChange(e, setClosingFee)}
                  placeholder="0.00"
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Fee</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  value={shippingFee}
                  onChange={(e) => handleInputChange(e, setShippingFee)}
                  placeholder="0.00"
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST %</label>
              <div className="relative">
                <input
                  type="number"
                  value={gstPercent}
                  onChange={(e) => handleInputChange(e, setGstPercent)}
                  placeholder="18"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Results</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Referral Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.referralFee)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Closing Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.closingFee)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Shipping Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.shippingFee)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Fees:</span>
              <span className="font-medium">{formatCurrency(calculations.totalFees)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">GST:</span>
              <span className="font-medium">{formatCurrency(calculations.gst)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Cost:</span>
              <span className="font-medium">{formatCurrency(calculations.totalCost)}</span>
            </div>
            
            <div className="flex justify-between py-2 mt-2 bg-green-50 p-2 rounded-md">
              <span className="text-gray-800 font-semibold">Your Profit:</span>
              <span className={`font-bold ${calculations.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(calculations.profit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonCalculator;