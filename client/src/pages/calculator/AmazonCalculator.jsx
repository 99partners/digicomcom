import React, { useState, useEffect } from 'react';

// Category and subcategory data
const categories = {
  'Automotive, Car & Accessories': [
    'Automotive - Helmets & Riding Gloves',
    'Automotive Vehicles - 2-Wheelers',
    'Automotive Vehicles - 4-Wheelers',
    'Automotive Vehicles - Electric Vehicles',
    'Automotive - Car and Bike parts',
    'Automotive - Brakes',
    'Automotive - Styling and body fittings',
    'Automotive - Transmission',
    'Automotive - Engine parts',
    'Automotive - Exhaust systems',
    'Automotive - Interior fitting',
    'Automotive - Suspension',
    'Automotive - Wipers',
    'Automotive - Cleaning kits - Sponges',
    'Automotive - Cleaning kits - Brush',
    'Automotive - Cleaning kits - Duster',
    'Automotive - Cleaning kits - Cloths and liquids',
    'Car interior & exterior care - Waxes',
    'Car interior & exterior care - Polish',
    'Car interior & exterior care - Shampoo',
    'Car interior & exterior care - Other',
    'Car and Bike Lighting and Paints',
    'Automotive Accessories - Floor Mats',
    'Automotive Accessories - Seat/Car/Bike Covers',
    'Riding Gear - Face Covers and Gloves',
    'Vehicle Tools and Appliances',
    'Oils',
    'Lubricants',
    'Automotive - Batteries',
    'Automotive - Air fresheners',
    'Car Electronics Devices',
    'Car Electronics Accessories',
    'Automotive - Tyres',
    'Automotive - Rims'
  ],
  'Baby Products, Toys & Education': [
    'Baby Hardlines - Swings, Bouncers and Rockers, Carriers, Walkers',
    'Baby Safety - Guards & Locks',
    'Baby Room Decor Baby Furniture',
    'Baby Car Seats & Accessories',
    'Baby Strollers',
    'Baby diapers',
    'Toys - Drones',
    'Toys - Balloons and Soft Toys'
  ],
  'Books, Music, Movies, Video Games, Entertainment': [
    'Books',
    'Movies',
    'Music',
    'Musical Instruments - Guitars',
    'Musical Instruments - Keyboards',
    'Musical Instruments - Microphones',
    'Musical Instruments - Others',
    'Musical Instruments - DJ & VJ Equipment, Recording and Computer, Cables & Leads, PA & Stage',
    'Video Games - Online game services',
    'Video Games - Accessories',
    'Video Games - Consoles',
    'Video Games'
  ],
  'Clothing, Fashion, Jewellery, Luggage, Shoes': [
    'Apparel - Sweat Shirts and Jackets',
    'Apparel - Shorts',
    'Apparel - Baby',
    'Apparel - Ethnic wear',
    'Apparel - Other innerwear',
    'Apparel - Sleepwear',
    'Apparel - Sarees and Dress Materials',
    'Apparel - Men\'s T-shirts',
    'Apparel - Women\'s Innerwear / Lingerie',
    'Backpacks',
    'Eyewear - Sunglasses, Frames and zero power eye glasses',
    'Fashion Jewellery',
    'Fine Jewellery - Gold Coins',
    'Fine Jewellery - Studded',
    'Fine Jewellery - Unstudded and Solitaire',
    'Silver Jewellery',
    'Flip Flops, Fashion Sandals and Slippers',
    'Handbags',
    'Luggage - Suitcase & Trolleys',
    'Luggage - Travel Accessories',
    'Kids Shoes',
    'Shoes',
    'Shoes - Sandals & Floaters',
    'Wallets',
    'Watches'
  ],
  'Electronics (Camera, Mobile, PC, Wireless) & Accessories': [
    'Cables and Adapters',
    'Camera Accessories',
    'Camera Lenses',
    'Camera and Camcorder',
    'Cases, Covers, Skins, Screen Guards',
    'Desktops',
    'Electronic Accessories (Electronics, PC & Wireless)',
    'Electronic Devices',
    'Entertainment Collectibles',
    'Fashion Smartwatches',
    'GPS Devices',
    'Hard Disks',
    'Headsets, Headphones and Earphones',
    'Keyboards and Mouse',
    'Kindle Accessories',
    'Laptop Bags & Sleeves',
    'Laptop and Camera Battery',
    'Laptops',
    'Memory Cards',
    'Mobile phones',
    'Tablets',
    'Modems & Networking Devices',
    'Monitors',
    'PC Components',
    'Power Banks & Chargers',
    'Printers & Scanners',
    'Software Products',
    'Speakers',
    'Television',
    'Landline Phones',
    'Smart Watches & Accessories',
    'USB Flash Drives',
    'Projectors, Home Theatre Systems, Binoculars and Telescopes'
  ],
  'Grocery, Food & Pet Supplies': [
    'Grocery - herbs and spices',
    'Grocery & Gourmet - Oils',
    'Grocery - Dried fruits and nuts',
    'Grocery - Hampers and gifting',
    'Pet food'
  ],
  'Health, Beauty, Personal Care & Personal Care Appliances': [
    'Beauty - Fragrance',
    'Beauty - Haircare, Bath and Shower',
    'Beauty - Makeup',
    'Face Wash',
    'Moisturizer Cream',
    'Sunscreen',
    'Deodorants',
    'Facial Steamers',
    'Prescription Medicine',
    'Medical Equipment & Contact Lens',
    'Ayurvedic Products, Oral Care, Hand Sanitizers, Pooja Supplies',
    'Sports Nutrition and Meal Replacement Shakes',
    'Contact Lens and Reading Glasses',
    'Household Cleaning, Laundry, Air Fresheners, Personal Hygiene',
    'Vitamins & Mineral Health Supplements',
    'Luxury Beauty',
    'Car Cradles, Lens Kits, and Tablet Cases',
    'Electric Massagers',
    'Glucometer and Glucometer Strips',
    'Thermometers',
    'Weighing Scales and Fat Analyzers'
  ],
  'Home, Decor, Home Improvement, Furniture, Outdoor, Lawn & Garden': [
    'Bean Bags & Inflatables',
    'Mattresses',
    'Rugs and Doormats',
    'Clocks',
    'Wall Art',
    'Bedsheets, Blankets and covers',
    'Home furnishing (Excluding curtain and curtain accessories)',
    'Containers, Boxes, Bottles, and Kitchen Storage',
    'Home improvement - Accessories',
    'Home improvement (excl. accessories), including Home Security Systems',
    'Tiles & Flooring Accessories',
    'Wires (Electrical Wires/cables for house wiring, adhoc usage)',
    'Ladders, Kitchen and Bath fixtures',
    'Home Storage (Excluding Kitchen Containers, Boxes, Bottles, and Kitchen Storage)',
    'Wallpapers & Wallpaper Accessories',
    'Home Decor Products',
    'Lawn & Garden - Outdoor equipments (Saws, Lawn Mowers, etc.)'
  ],
  'Industrial, Medical, Scientific Supplies & Office Products': [
    'Business and Industrial Supplies - Scientific Supplies',
    'OTC Medicine',
    'Masks',
    'Weighing Scales & Fat Analyzers',
    '3D Printers',
    'Business and Industrial Supplies - Material Handling Equipment Janitorial & Sanitation Medical & Dental Supplies Com...',
    'Business and Industrial Supplies - Electrical Testing Dimensional Measurement Thermal Printers Barcode Scanners',
    'Business and Industrial Supplies - Power tools & accessories Welding machines Microscopes Industrial Electrical produ...',
    'Occupational Safety Supplies (Mask gloves Safety shoes Face shields & other PPE products)',
    'Stethoscopes',
    'Packing materials',
    'Power & hand Tools and Water Dispenser',
    'Office products - Office supplies',
    'Office products - Electronic Devices',
    'Office products - Arts and Crafts',
    'Office products - Writing Instruments'
  ],
  'Kitchen, Large & Small Appliances': [
    'Large Appliances - Refrigerators',
    'Large Appliances - Ovens',
    'Large Appliances - Dishwashers',
    'Large Appliances - Washing Machines',
    'Small Appliances - Blenders',
    'Small Appliances - Toasters',
    'Small Appliances - Coffee Makers',
    'Small Appliances - Air Fryers',
    'Small Appliances - Microwaves',
    'Small Appliances - Electric Kettles',
    ''
  ],
  'Sports, Gym & Sporting Equipment': [
    'Fitness Equipment',
    'Team Sports Gear',
    'Outdoor Sports'
  ],
  'Others': [
    'Miscellaneous Items',
    'Gifts',
    'Stationery'
  ]
};

// Default referral fees by category (approximate 2025 rates, adjusted for zero under ₹300)
const referralFees = {
  'Automotive, Car & Accessories': 12,
  'Baby Products, Toys & Education': 10,
  'Books, Music, Movies, Video Games, Entertainment': 8,
  'Clothing, Fashion, Jewellery, Luggage, Shoes': 13.5,
  'Electronics (Camera, Mobile, PC, Wireless) & Accessories': 6,
  'Grocery, Food & Pet Supplies': 15,
  'Health, Beauty, Personal Care & Personal Care Appliances': 12,
  'Home, Decor, Home Improvement, Furniture, Outdoor, Lawn & Garden': 12,
  'Industrial, Medical, Scientific Supplies & Office Products': 10,
  'Kitchen, Large & Small Appliances': 8,
  'Others': 15,
  'Sports, Gym & Sporting Equipment': 10
};

const AmazonCalculator = () => {
  // State for input values
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [referralFeePercent, setReferralFeePercent] = useState('15');
  const [closingFee, setClosingFee] = useState('');
  const [shippingFee, setShippingFee] = useState('');
  const [gstPercent, setGstPercent] = useState('18');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [weight, setWeight] = useState(''); // Weight in grams
  const [shippingMethod, setShippingMethod] = useState('');
  const [area, setArea] = useState('');

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

  // Calculate closing fee based on price range and fulfillment method
  const calculateClosingFee = (price, method) => {
    const p = parseFloat(price) || 0;
    let cf = 0;
    if (p <= 250) {
      cf = 7;
    } else if (p <= 500) {
      cf = 10;
    } else if (p <= 1000) {
      cf = 20;
    } else {
      cf = 70; // For higher prices or certain categories
    }
    // For Self Ship, higher closing fee for low price items (2025 change)
    if (method === 'Self Ship' && p < 300) {
      cf = 45;
    }
    return cf;
  };

  // Calculate shipping fee based on weight, method, and area
  const calculateShippingFee = () => {
    const wt = parseFloat(weight) || 0;
    if (wt === 0 || shippingMethod === 'Self Ship') {
      return parseFloat(shippingFee) || 0;
    }

    let baseRate = 0;
    let additionalPer500g = 0;

    if (shippingMethod === 'Amazon Easy Ship' || shippingMethod === 'Seller Flex') {
      baseRate = 29; // First 500g
      additionalPer500g = 17;
      // Flat rate adjustments for 2025
      if (area === 'National') baseRate = 65;
    } else if (shippingMethod === 'Amazon FBA') {
      baseRate = 40; // Approximate fulfillment fee
      additionalPer500g = 20;
    }

    const num500g = Math.ceil(wt / 500);
    let fee = baseRate + Math.max(0, (num500g - 1)) * additionalPer500g;

    // Adjust for area
    if (area === 'Local') {
      fee *= 0.8;
    } else if (area === 'Regional') {
      fee *= 1.1;
    } else if (area === 'National') {
      fee *= 1.3;
    }

    return Math.round(fee * 100) / 100; // Round to 2 decimals
  };

  // Calculate profit whenever input values change
  useEffect(() => {
    calculateProfit();
  }, [sellingPrice, costPrice, referralFeePercent, closingFee, shippingFee, gstPercent, selectedCategory, weight, shippingMethod, area]);

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
        profit: 0
      });
      setClosingFee('');
      return;
    }

    let rfPercent = parseFloat(referralFeePercent) || 15;
    const cf = calculateClosingFee(sp, shippingMethod);
    const sf = calculateShippingFee();
    const gstPerc = parseFloat(gstPercent) || 0;

    // Auto-set referral fee based on category if selected
    if (selectedCategory && referralFees[selectedCategory]) {
      rfPercent = sp < 300 ? 0 : referralFees[selectedCategory];
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
      profit
    });
    // Update closing fee state if auto-calculated
    setClosingFee(cf.toString());
  };

  // Handle input changes
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="text-sm text-gray-600 mb-2">Date & Time: Saturday, September 13, 2025, 02:59 PM IST</div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">Amazon Profit Calculator</h2>
      
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
                <option value="">Select a Category</option>
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
              {selectedCategory && (
                <p className="text-xs text-gray-500 mt-1">
                  Auto: {parseFloat(sellingPrice) < 300 ? 0 : referralFees[selectedCategory]}% (for {selectedCategory})
                </p>
              )}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Method</label>
              <select
                value={shippingMethod}
                onChange={(e) => handleInputChange(e, setShippingMethod)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              >
                <option value="">Select Shipping Method</option>
                <option value="Amazon FBA">Amazon FBA</option>
                <option value="Self Ship">Self Ship</option>
                <option value="Amazon Easy Ship">Amazon Easy Ship</option>
                <option value="Seller Flex">Seller Flex</option>
              </select>
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

            {shippingMethod === 'Self Ship' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manual Shipping Fee (₹)</label>
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
            )}
            
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