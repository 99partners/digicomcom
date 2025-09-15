import React, { useState, useEffect } from 'react';

const SwiggyCalculator = () => {
  // State for input values
  const [orderValue, setOrderValue] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [commissionPercent, setCommissionPercent] = useState('18'); // Default 18%
  const [gatewayPercent, setGatewayPercent] = useState('2.5'); // Default 2.5%
  const [accountPercent, setAccountPercent] = useState('1'); // Default 1%
  const [gstPercent, setGstPercent] = useState('28'); // GST on fees

  // State for calculated values
  const [calculations, setCalculations] = useState({
    commission: 0,
    gateway: 0,
    account: 0,
    gst: 0,
    totalFees: 0,
    totalCost: 0,
    profit: 0,
  });

  // Format currency function
  const formatCurrency = (amount) => '₹' + parseFloat(amount).toFixed(2);

  // Calculate profit function
  const calculateProfit = () => {
    const ov = parseFloat(orderValue) || 0;
    const cp = parseFloat(costPrice) || 0;

    // If order value is empty or zero, show all results as zero
    if (!ov) {
      setCalculations({
        commission: 0,
        gateway: 0,
        account: 0,
        gst: 0,
        totalFees: 0,
        totalCost: 0,
        profit: 0,
      });
      return;
    }

    const commission = (ov * (parseFloat(commissionPercent) || 0)) / 100;
    const gateway = (ov * (parseFloat(gatewayPercent) || 0)) / 100;
    const account = (ov * (parseFloat(accountPercent) || 0)) / 100;

    const feesBeforeGST = commission + gateway + account;
    const gst = (feesBeforeGST * (parseFloat(gstPercent) || 0)) / 100;
    const totalFees = feesBeforeGST + gst;
    const totalCost = cp + totalFees;
    const profit = ov - totalCost;

    setCalculations({
      commission,
      gateway,
      account,
      gst,
      totalFees,
      totalCost,
      profit,
    });
  };

  // Calculate profit whenever input values change
  useEffect(() => {
    calculateProfit();
  }, [orderValue, costPrice, commissionPercent, gatewayPercent, accountPercent, gstPercent]);

  // Handle input changes
  const handleInputChange = (e, setter) => setter(e.target.value);

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">Swiggy Profit Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Input Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Value</label>
              <input
                type="number"
                value={orderValue}
                onChange={(e) => handleInputChange(e, setOrderValue)}
                placeholder="0.00"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => handleInputChange(e, setCostPrice)}
                placeholder="0.00"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commission %</label>
              <input
                type="number"
                value={commissionPercent}
                onChange={(e) => handleInputChange(e, setCommissionPercent)}
                placeholder="18"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Gateway %</label>
              <input
                type="number"
                value={gatewayPercent}
                onChange={(e) => handleInputChange(e, setGatewayPercent)}
                placeholder="2.5"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Charges %</label>
              <input
                type="number"
                value={accountPercent}
                onChange={(e) => handleInputChange(e, setAccountPercent)}
                placeholder="1"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST % (on fees)</label>
              <input
                type="number"
                value={gstPercent}
                onChange={(e) => handleInputChange(e, setGstPercent)}
                placeholder="28"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>
          </div>
        </div>
        {/* Results Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Commission Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.commission)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Payment Gateway Fee:</span>
              <span className="font-medium">{formatCurrency(calculations.gateway)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Account Charges:</span>
              <span className="font-medium">{formatCurrency(calculations.account)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">GST (on fees):</span>
              <span className="font-medium">{formatCurrency(calculations.gst)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Fees:</span>
              <span className="font-medium">{formatCurrency(calculations.totalFees)}</span>
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

export default SwiggyCalculator;
