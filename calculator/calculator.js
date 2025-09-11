/**
 * E-Commerce Profit Calculator
 * JavaScript for calculating profit margins and fees for various e-commerce platforms
 */

// Format currency function
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toFixed(2);
}


// Format percentage function
function formatPercentage(percentage) {
    return parseFloat(percentage).toFixed(2) + '%';
}

// Calculate Amazon Profit
function calculateAmazonProfit() {
    // Get input values
    const productPrice = parseFloat(document.getElementById('amazon-product-price').value);
    const productCost = parseFloat(document.getElementById('amazon-product-cost').value);
    const category = document.getElementById('amazon-category').value;
    const weight = parseFloat(document.getElementById('amazon-weight').value);
    const fulfillmentType = document.getElementById('amazon-fba').value;
    const referralFeePercentage = parseFloat(document.getElementById('amazon-referral-fee').value);
    
    // Validate inputs
    if (isNaN(productPrice) || isNaN(productCost) || isNaN(weight) || category === '' || isNaN(referralFeePercentage)) {
        alert('Please fill all fields with valid values');
        return;
    }
    
    // Calculate fees
    const referralFee = (productPrice * referralFeePercentage) / 100;
    
    // Calculate closing fee based on category
    let closingFee = 0;
    switch(category) {
        case 'electronics':
            closingFee = 15;
            break;
        case 'fashion':
            closingFee = 10;
            break;
        case 'home':
            closingFee = 12;
            break;
        case 'beauty':
            closingFee = 8;
            break;
        case 'books':
            closingFee = 5;
            break;
        default:
            closingFee = 10;
    }
    
    // Calculate shipping fee based on weight and fulfillment type
    let shippingFee = 0;
    if (fulfillmentType === 'fba') {
        // FBA shipping fees
        if (weight <= 0.5) {
            shippingFee = 40;
        } else if (weight <= 1) {
            shippingFee = 65;
        } else if (weight <= 5) {
            shippingFee = 85 + ((weight - 1) * 20);
        } else {
            shippingFee = 165 + ((weight - 5) * 25);
        }
    } else {
        // FBM shipping fees (typically lower as seller handles shipping)
        if (weight <= 0.5) {
            shippingFee = 30;
        } else if (weight <= 1) {
            shippingFee = 50;
        } else if (weight <= 5) {
            shippingFee = 70 + ((weight - 1) * 15);
        } else {
            shippingFee = 130 + ((weight - 5) * 20);
        }
    }
    
    // Calculate profit
    const totalFees = referralFee + closingFee + shippingFee;
    const profit = productPrice - productCost - totalFees;
    const profitMargin = (profit / productPrice) * 100;
    const roi = (profit / productCost) * 100;
    
    // Display results
    document.getElementById('amazon-selling-price').textContent = formatCurrency(productPrice);
    document.getElementById('amazon-cost').textContent = formatCurrency(productCost);
    document.getElementById('amazon-referral').textContent = formatCurrency(referralFee);
    document.getElementById('amazon-closing-fee').textContent = formatCurrency(closingFee);
    document.getElementById('amazon-shipping-fee').textContent = formatCurrency(shippingFee);
    document.getElementById('amazon-profit').textContent = formatCurrency(profit);
    document.getElementById('amazon-margin').textContent = formatPercentage(profitMargin);
    document.getElementById('amazon-roi').textContent = formatPercentage(roi);
    
    // Show results
    document.getElementById('amazon-results').classList.remove('d-none');
}

// Calculate Flipkart Profit
function calculateFlipkartProfit() {
    // Get input values
    const productPrice = parseFloat(document.getElementById('flipkart-product-price').value);
    const productCost = parseFloat(document.getElementById('flipkart-product-cost').value);
    const category = document.getElementById('flipkart-category').value;
    const weight = parseFloat(document.getElementById('flipkart-weight').value);
    const fulfillmentType = document.getElementById('flipkart-fulfillment').value;
    const commissionRate = parseFloat(document.getElementById('flipkart-commission').value);
    
    // Validate inputs
    if (isNaN(productPrice) || isNaN(productCost) || isNaN(weight) || category === '' || isNaN(commissionRate)) {
        alert('Please fill all fields with valid values');
        return;
    }
    
    // Calculate commission
    const commission = (productPrice * commissionRate) / 100;
    
    // Calculate fixed fee based on category
    let fixedFee = 0;
    switch(category) {
        case 'electronics':
            fixedFee = 20;
            break;
        case 'fashion':
            fixedFee = 15;
            break;
        case 'home':
            fixedFee = 18;
            break;
        case 'beauty':
            fixedFee = 12;
            break;
        case 'books':
            fixedFee = 8;
            break;
        default:
            fixedFee = 15;
    }
    
    // Calculate shipping fee based on weight and fulfillment type
    let shippingFee = 0;
    if (fulfillmentType === 'flipkart-assured') {
        // Flipkart Assured shipping fees
        if (weight <= 0.5) {
            shippingFee = 35;
        } else if (weight <= 1) {
            shippingFee = 60;
        } else if (weight <= 5) {
            shippingFee = 80 + ((weight - 1) * 18);
        } else {
            shippingFee = 152 + ((weight - 5) * 22);
        }
    } else {
        // Seller Fulfilled shipping fees
        if (weight <= 0.5) {
            shippingFee = 28;
        } else if (weight <= 1) {
            shippingFee = 45;
        } else if (weight <= 5) {
            shippingFee = 65 + ((weight - 1) * 14);
        } else {
            shippingFee = 121 + ((weight - 5) * 18);
        }
    }
    
    // Calculate profit
    const totalFees = commission + fixedFee + shippingFee;
    const profit = productPrice - productCost - totalFees;
    const profitMargin = (profit / productPrice) * 100;
    const roi = (profit / productCost) * 100;
    
    // Display results
    document.getElementById('flipkart-selling-price').textContent = formatCurrency(productPrice);
    document.getElementById('flipkart-cost').textContent = formatCurrency(productCost);
    document.getElementById('flipkart-commission-amount').textContent = formatCurrency(commission);
    document.getElementById('flipkart-fixed-fee').textContent = formatCurrency(fixedFee);
    document.getElementById('flipkart-shipping-fee').textContent = formatCurrency(shippingFee);
    document.getElementById('flipkart-profit').textContent = formatCurrency(profit);
    document.getElementById('flipkart-margin').textContent = formatPercentage(profitMargin);
    document.getElementById('flipkart-roi').textContent = formatPercentage(roi);
    
    // Show results
    document.getElementById('flipkart-results').classList.remove('d-none');
}

// Calculate Meesho Profit
function calculateMeeshoProfit() {
    // Get input values
    const productPrice = parseFloat(document.getElementById('meesho-product-price').value);
    const productCost = parseFloat(document.getElementById('meesho-product-cost').value);
    const category = document.getElementById('meesho-category').value;
    const weight = parseFloat(document.getElementById('meesho-weight').value);
    const commissionRate = parseFloat(document.getElementById('meesho-commission').value);
    const returnRate = parseFloat(document.getElementById('meesho-return-rate').value);
    
    // Validate inputs
    if (isNaN(productPrice) || isNaN(productCost) || isNaN(weight) || category === '' || isNaN(commissionRate) || isNaN(returnRate)) {
        alert('Please fill all fields with valid values');
        return;
    }
    
    // Calculate commission
    const commission = (productPrice * commissionRate) / 100;
    
    // Calculate collection fee (fixed for Meesho)
    const collectionFee = 5;
    
    // Calculate shipping fee based on weight
    let shippingFee = 0;
    if (weight <= 0.5) {
        shippingFee = 30;
    } else if (weight <= 1) {
        shippingFee = 50;
    } else if (weight <= 5) {
        shippingFee = 70 + ((weight - 1) * 15);
    } else {
        shippingFee = 130 + ((weight - 5) * 20);
    }
    
    // Calculate return cost based on return rate
    const returnCost = (returnRate / 100) * (productCost + shippingFee);
    
    // Calculate profit
    const totalFees = commission + collectionFee + shippingFee + returnCost;
    const profit = productPrice - productCost - totalFees;
    const profitMargin = (profit / productPrice) * 100;
    const roi = (profit / productCost) * 100;
    
    // Display results
    document.getElementById('meesho-selling-price').textContent = formatCurrency(productPrice);
    document.getElementById('meesho-cost').textContent = formatCurrency(productCost);
    document.getElementById('meesho-commission-amount').textContent = formatCurrency(commission);
    document.getElementById('meesho-collection-fee').textContent = formatCurrency(collectionFee);
    document.getElementById('meesho-shipping-fee').textContent = formatCurrency(shippingFee);
    document.getElementById('meesho-return-cost').textContent = formatCurrency(returnCost);
    document.getElementById('meesho-profit').textContent = formatCurrency(profit);
    document.getElementById('meesho-margin').textContent = formatPercentage(profitMargin);
    document.getElementById('meesho-roi').textContent = formatPercentage(roi);
    
    // Show results
    document.getElementById('meesho-results').classList.remove('d-none');
}

// Calculate Swiggy Profit
function calculateSwiggyProfit() {
    // Get input values
    const itemPrice = parseFloat(document.getElementById('swiggy-item-price').value);
    const foodCost = parseFloat(document.getElementById('swiggy-food-cost').value);
    const packagingCost = parseFloat(document.getElementById('swiggy-packaging').value);
    const commissionRate = parseFloat(document.getElementById('swiggy-commission').value);
    const gstRate = parseFloat(document.getElementById('swiggy-gst').value);
    const deliveryType = document.getElementById('swiggy-delivery-type').value;
    
    // Validate inputs
    if (isNaN(itemPrice) || isNaN(foodCost) || isNaN(packagingCost) || isNaN(commissionRate) || isNaN(gstRate)) {
        alert('Please fill all fields with valid values');
        return;
    }
    
    // Calculate commission
    const commission = (itemPrice * commissionRate) / 100;
    
    // Calculate GST
    const gst = (itemPrice * gstRate) / 100;
    
    // Calculate delivery fee based on delivery type
    let deliveryFee = 0;
    if (deliveryType === 'swiggy-delivery') {
        // Swiggy handles delivery
        deliveryFee = 20; // Fixed fee for Swiggy delivery
    } else {
        // Restaurant handles delivery
        deliveryFee = 0;
    }
    
    // Calculate profit
    const totalFees = commission + gst + deliveryFee + packagingCost;
    const profit = itemPrice - foodCost - totalFees;
    const profitMargin = (profit / itemPrice) * 100;
    const roi = (profit / foodCost) * 100;
    
    // Display results
    document.getElementById('swiggy-selling-price').textContent = formatCurrency(itemPrice);
    document.getElementById('swiggy-cost').textContent = formatCurrency(foodCost);
    document.getElementById('swiggy-packaging-cost').textContent = formatCurrency(packagingCost);
    document.getElementById('swiggy-commission-amount').textContent = formatCurrency(commission);
    document.getElementById('swiggy-gst-amount').textContent = formatCurrency(gst);
    document.getElementById('swiggy-delivery-fee').textContent = formatCurrency(deliveryFee);
    document.getElementById('swiggy-profit').textContent = formatCurrency(profit);
    document.getElementById('swiggy-margin').textContent = formatPercentage(profitMargin);
    document.getElementById('swiggy-roi').textContent = formatPercentage(roi);
    
    // Show results
    document.getElementById('swiggy-results').classList.remove('d-none');
}

// Add event listeners for form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Prevent form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
    
    // Set default values for some fields
    document.getElementById('amazon-referral-fee').value = '15';
    document.getElementById('flipkart-commission').value = '12';
    document.getElementById('meesho-commission').value = '17';
    document.getElementById('meesho-return-rate').value = '10';
    document.getElementById('swiggy-commission').value = '25';
    document.getElementById('swiggy-gst').value = '5';
});