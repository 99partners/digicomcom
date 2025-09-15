import React, { useState, useEffect } from 'react';

// Category and subcategory data (based on the screenshot)
const categories = {
  'Crafts of India': [
    'Handicrafts',
    'Art & Craft Supplies',
    'Traditional Textiles',
    'Handmade Decor',
  ],
  'Electronics': [
    'Mobile Phones',
    'Laptops & Computers',
    'TV & Home Entertainment',
    'Home Appliances',
    'Audio & Video',
    'Camera & Accessories',
  ],
  'Fashion': [
    'Men\'s Clothing',
    'Women\'s Clothing',
    'Kids Fashion',
    'Footwear',
    'Accessories',
    'Jewellery',
  ],
  'Grocery & Lifestyle': [
    'Grocery',
    'Personal Care',
    'Beauty & Wellness',
    'Home Essentials',
    'Kitchen & Dining',
  ],
  'Industrial & Professional Supplies': [
    'Office Supplies',
    'Industrial Tools',
    'Safety Equipment',
    'Packaging Materials',
  ],
  'Local Shops': [
    'Local Handicrafts',
    'Regional Products',
    'Artisan Goods',
    'Handmade Items',
  ],
  'Precious Jewellery': [
    'Gold Jewellery',
    'Diamond Jewellery',
    'Silver Jewellery',
    'Gemstones',
    'Jewellery Accessories',
  ],
};

// Default commission fees by category (approximate for JioMart 2025)
const commissionFees = {
  'Crafts of India': 8,
  'Electronics': 6,
  'Fashion': 12,
  'Grocery & Lifestyle': 5,
  'Industrial & Professional Supplies': 10,
  'Local Shops': 7,
  'Precious Jewellery': 4,
};

const JioMartCalculator = () => {
  // State for input values
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [referralFeePercent, setReferralFeePercent] = useState('5');
  const [closingFee, setClosingFee] = useState('0');
  const [shippingFee, setShippingFee] = useState('0');
  const [gstPercent, setGstPercent] = useState('18');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [weight, setWeight] = useState(''); // Weight in grams
  const [area, setArea] = useState('');

  // State for calculated values
  const [calculations, setCalculations] = useState({
    referralFee: 0,
    closingFee: 0,
    shippingFee: 0,
    totalFees: 0,
    gst: 0,
    totalCost: 0,
    profit: 0,
  });

  // Format currency function
  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Calculate closing fee (simplified for JioMart)
  const calculateClosingFee = (price) => {
    const p = parseFloat(price) || 0;
    let cf = 0;
    if (p <= 250) {
      cf = 5;
    } else if (p <= 500) {
      cf = 8;
    } else if (p <= 1000) {
      cf = 15;
    } else {
      cf = 25;
    }
    return cf;
  };

  // Calculate shipping fee based on weight and area
  const calculateShippingFee = () => {
    const wt = parseFloat(weight) || 0;
    if (wt === 0) return 0;

    let baseRate = 25; // Base delivery fee for first 500g
    let additionalPer500g = 12;

    const num500g = Math.ceil(wt / 500);
    let fee = baseRate + Math.max(0, (num500g - 1)) * additionalPer500g;

    // Adjust for area
    if (area === 'Local') {
      fee *= 0.8; // 20% discount for local
    } else if (area === 'Regional') {
      fee *= 1.15; // 15% increase for regional
    } else if (area === 'National') {
      fee *= 1.4; // 40% increase for national
    }

    return Math.round(fee * 100) / 100; // Round to 2 decimals
  };

  // Calculate profit function
  const calculateProfit = () => {
    const sp = parseFloat(sellingPrice) || 0;
    const cp = parseFloat(costPrice) || 0;

    // If selling price is empty or zero, show all results as zero
    if (!sp) {
      setCalculations({
        referralFee: 0,
        closingFee: 0,
        shippingFee: 0,
        totalFees: 0,
        gst: 0,
        totalCost: 0,
        profit: 0,
      });
      setClosingFee('0');
      setShippingFee('0');
      return;
    }

    let rfPercent = parseFloat(referralFeePercent) || 5;
    const cf = calculateClosingFee(sp);
    const sf = calculateShippingFee();
    const gstPerc = parseFloat(gstPercent) || 0;

    // Auto-set referral fee based on category if selected
    if (selectedCategory && commissionFees[selectedCategory]) {
      rfPercent = commissionFees[selectedCategory];
    }

    const referralFee = (sp * rfPercent) / 100;
    const totalFeesBeforeGST = referralFee + cf + sf;
    const gst = (totalFeesBeforeGST * gstPerc) / 100;
    const totalCost = cp + totalFeesBeforeGST + gst;
    const profit = sp - totalCost;

    setCalculations({
      referralFee,
      closingFee: cf,
      shippingFee: sf,
      totalFees: totalFeesBeforeGST,
      gst,
      totalCost,
      profit,
    });
    setClosingFee(cf.toString());
  };

  // Calculate profit whenever input values change
  useEffect(() => {
    calculateProfit();
  }, [sellingPrice, costPrice, referralFeePercent, closingFee, shippingFee, gstPercent, selectedCategory, weight, area]);

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="text-sm text-gray-600 mb-2">Date & Time: Saturday, September 13, 2025, 04:46 PM IST</div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">JioMart Profit Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Input Details</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory('');
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
                disabled={!selectedCategory}
              >
                <option value="">Select a Subcategory</option>
                {selectedCategory && categories[selectedCategory].map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => handleInputChange(e, setWeight)}
                placeholder="500"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <select
                value={area}
                onChange={(e) => handleInputChange(e, setArea)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="">Select Area</option>
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
                <option value="National">National</option>
              </select>
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

export default JioMartCalculator;