import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Nav, Tab, Alert } from 'react-bootstrap';
import './CalculatorStyles.css';
import calculatorService from '../../services/calculatorService';

const CalculatorPage = () => {
  // State for each calculator's results
  const [amazonResults, setAmazonResults] = useState(null);
  const [flipkartResults, setFlipkartResults] = useState(null);
  const [meeshoResults, setMeeshoResults] = useState(null);
  const [swiggyResults, setSwiggyResults] = useState(null);
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Amazon form state
  const [amazonData, setAmazonData] = useState({
    productPrice: '',
    productCost: '',
    shippingCost: '',
    productWeight: '',
    productCategory: 'electronics',
    isFBA: false
  });
  
  // Flipkart form state
  const [flipkartData, setFlipkartData] = useState({
    productPrice: '',
    productCost: '',
    shippingCost: '',
    productWeight: '',
    productCategory: 'electronics',
    isFlipkartAssured: false
  });
  
  // Meesho form state
  const [meeshoData, setMeeshoData] = useState({
    productPrice: '',
    productCost: '',
    shippingCost: '',
    productWeight: '',
    productCategory: 'fashion'
  });
  
  // Swiggy form state
  const [swiggyData, setSwiggyData] = useState({
    dishPrice: '',
    dishCost: '',
    packagingCost: '',
    dishCategory: 'food',
    isSwiggySuper: false
  });

  // Format currency function
  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Format percentage function
  const formatPercentage = (percentage) => {
    return parseFloat(percentage).toFixed(2) + '%';
  };

  // Calculate Amazon Profit using API
  const calculateAmazonProfit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await calculatorService.calculateAmazon(amazonData);
      setAmazonResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error calculating Amazon profit');
      console.error('Error calculating Amazon profit:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Amazon form input changes
  const handleAmazonInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAmazonData({
      ...amazonData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  // Calculate Flipkart Profit using API
  const calculateFlipkartProfit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await calculatorService.calculateFlipkart(flipkartData);
      setFlipkartResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error calculating Flipkart profit');
      console.error('Error calculating Flipkart profit:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Flipkart form input changes
  const handleFlipkartInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlipkartData({
      ...flipkartData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Calculate Meesho Profit using API
  const calculateMeeshoProfit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await calculatorService.calculateMeesho(meeshoData);
      setMeeshoResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error calculating Meesho profit');
      console.error('Error calculating Meesho profit:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Meesho form input changes
  const handleMeeshoInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeeshoData({
      ...meeshoData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Calculate Swiggy Profit using API
  const calculateSwiggyProfit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await calculatorService.calculateSwiggy(swiggyData);
      setSwiggyResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error calculating Swiggy profit');
      console.error('Error calculating Swiggy profit:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle Swiggy form input changes
  const handleSwiggyInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSwiggyData({
      ...swiggyData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  // Render function
  return (
    <Container className="calculator-container">
      <h1 className="text-center mb-4">E-Commerce Profit Calculator</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Tab.Container id="calculator-tabs" defaultActiveKey="amazon">
        <Nav variant="pills" className="calculator-nav mb-4">
          <Nav.Item>
            <Nav.Link eventKey="amazon" className="amazon-tab">Amazon</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="flipkart" className="flipkart-tab">Flipkart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="meesho" className="meesho-tab">Meesho</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="swiggy" className="swiggy-tab">Swiggy</Nav.Link>
          </Nav.Item>
        </Nav>
        
        <Tab.Content>
          {/* Amazon Calculator */}
          <Tab.Pane eventKey="amazon">
            <Card className="calculator-card amazon-card">
              <Card.Body>
                <Card.Title>Amazon Profit Calculator</Card.Title>
                <Form onSubmit={calculateAmazonProfit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Price (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productPrice" 
                          value={amazonData.productPrice} 
                          onChange={handleAmazonInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productCost" 
                          value={amazonData.productCost} 
                          onChange={handleAmazonInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Shipping Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="shippingCost" 
                          value={amazonData.shippingCost} 
                          onChange={handleAmazonInputChange} 
                          required 
                          min="0" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Weight (kg)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productWeight" 
                          value={amazonData.productWeight} 
                          onChange={handleAmazonInputChange} 
                          required 
                          min="0.1" 
                          step="0.1" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Select 
                          name="productCategory" 
                          value={amazonData.productCategory} 
                          onChange={handleAmazonInputChange} 
                          required
                        >
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion</option>
                          <option value="home">Home & Kitchen</option>
                          <option value="beauty">Beauty & Personal Care</option>
                          <option value="books">Books</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3 mt-4">
                        <Form.Check 
                          type="checkbox" 
                          label="Fulfilled by Amazon (FBA)" 
                          name="isFBA" 
                          checked={amazonData.isFBA} 
                          onChange={handleAmazonInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className="amazon-button" disabled={loading}>
                      {loading ? 'Calculating...' : 'Calculate Profit'}
                    </Button>
                  </div>
                </Form>
                
                {amazonResults && (
                  <div className="results-section mt-4">
                    <h4>Results</h4>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Selling Price</td>
                          <td>{formatCurrency(amazonResults.sellingPrice)}</td>
                        </tr>
                        <tr>
                          <td>Product Cost</td>
                          <td>{formatCurrency(amazonResults.cost)}</td>
                        </tr>
                        <tr>
                          <td>Referral Fee</td>
                          <td>{formatCurrency(amazonResults.referralFee)}</td>
                        </tr>
                        <tr>
                          <td>Closing Fee</td>
                          <td>{formatCurrency(amazonResults.closingFee)}</td>
                        </tr>
                        <tr>
                          <td>Shipping Fee</td>
                          <td>{formatCurrency(amazonResults.shippingFee)}</td>
                        </tr>
                        <tr className="table-success">
                          <td><strong>Profit</strong></td>
                          <td><strong>{formatCurrency(amazonResults.profit)}</strong></td>
                        </tr>
                        <tr>
                          <td>Profit Margin</td>
                          <td>{formatPercentage(amazonResults.margin)}</td>
                        </tr>
                        <tr>
                          <td>ROI</td>
                          <td>{formatPercentage(amazonResults.roi)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>
          
          {/* Flipkart Calculator */}
          <Tab.Pane eventKey="flipkart">
            <Card className="calculator-card flipkart-card">
              <Card.Body>
                <Card.Title>Flipkart Profit Calculator</Card.Title>
                <Form onSubmit={calculateFlipkartProfit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Price (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productPrice" 
                          value={flipkartData.productPrice} 
                          onChange={handleFlipkartInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productCost" 
                          value={flipkartData.productCost} 
                          onChange={handleFlipkartInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Shipping Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="shippingCost" 
                          value={flipkartData.shippingCost} 
                          onChange={handleFlipkartInputChange} 
                          required 
                          min="0" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Weight (kg)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productWeight" 
                          value={flipkartData.productWeight} 
                          onChange={handleFlipkartInputChange} 
                          required 
                          min="0.1" 
                          step="0.1" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Select 
                          name="productCategory" 
                          value={flipkartData.productCategory} 
                          onChange={handleFlipkartInputChange} 
                          required
                        >
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion</option>
                          <option value="home">Home & Kitchen</option>
                          <option value="beauty">Beauty & Personal Care</option>
                          <option value="books">Books</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3 mt-4">
                        <Form.Check 
                          type="checkbox" 
                          label="Flipkart Assured" 
                          name="isFlipkartAssured" 
                          checked={flipkartData.isFlipkartAssured} 
                          onChange={handleFlipkartInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className="flipkart-button" disabled={loading}>
                      {loading ? 'Calculating...' : 'Calculate Profit'}
                    </Button>
                  </div>
                </Form>
                
                {flipkartResults && (
                  <div className="results-section mt-4">
                    <h4>Results</h4>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Selling Price</td>
                          <td>{formatCurrency(flipkartResults.sellingPrice)}</td>
                        </tr>
                        <tr>
                          <td>Product Cost</td>
                          <td>{formatCurrency(flipkartResults.cost)}</td>
                        </tr>
                        <tr>
                          <td>Commission</td>
                          <td>{formatCurrency(flipkartResults.commission)}</td>
                        </tr>
                        <tr>
                          <td>Fixed Fee</td>
                          <td>{formatCurrency(flipkartResults.fixedFee)}</td>
                        </tr>
                        <tr>
                          <td>Shipping Fee</td>
                          <td>{formatCurrency(flipkartResults.shippingFee)}</td>
                        </tr>
                        <tr className="table-success">
                          <td><strong>Profit</strong></td>
                          <td><strong>{formatCurrency(flipkartResults.profit)}</strong></td>
                        </tr>
                        <tr>
                          <td>Profit Margin</td>
                          <td>{formatPercentage(flipkartResults.margin)}</td>
                        </tr>
                        <tr>
                          <td>ROI</td>
                          <td>{formatPercentage(flipkartResults.roi)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>
          
          {/* Meesho Calculator */}
          <Tab.Pane eventKey="meesho">
            <Card className="calculator-card meesho-card">
              <Card.Body>
                <Card.Title>Meesho Profit Calculator</Card.Title>
                <Form onSubmit={calculateMeeshoProfit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Price (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productPrice" 
                          value={meeshoData.productPrice} 
                          onChange={handleMeeshoInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productCost" 
                          value={meeshoData.productCost} 
                          onChange={handleMeeshoInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Shipping Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="shippingCost" 
                          value={meeshoData.shippingCost} 
                          onChange={handleMeeshoInputChange} 
                          required 
                          min="0" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Weight (kg)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="productWeight" 
                          value={meeshoData.productWeight} 
                          onChange={handleMeeshoInputChange} 
                          required 
                          min="0.1" 
                          step="0.1" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Category</Form.Label>
                        <Form.Select 
                          name="productCategory" 
                          value={meeshoData.productCategory} 
                          onChange={handleMeeshoInputChange} 
                          required
                        >
                          <option value="fashion">Fashion</option>
                          <option value="home">Home & Kitchen</option>
                          <option value="beauty">Beauty & Personal Care</option>
                          <option value="electronics">Electronics</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className="meesho-button" disabled={loading}>
                      {loading ? 'Calculating...' : 'Calculate Profit'}
                    </Button>
                  </div>
                </Form>
                
                {meeshoResults && (
                  <div className="results-section mt-4">
                    <h4>Results</h4>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Selling Price</td>
                          <td>{formatCurrency(meeshoResults.sellingPrice)}</td>
                        </tr>
                        <tr>
                          <td>Product Cost</td>
                          <td>{formatCurrency(meeshoResults.cost)}</td>
                        </tr>
                        <tr>
                          <td>Commission</td>
                          <td>{formatCurrency(meeshoResults.commission)}</td>
                        </tr>
                        <tr>
                          <td>Collection Fee</td>
                          <td>{formatCurrency(meeshoResults.collectionFee)}</td>
                        </tr>
                        <tr>
                          <td>Shipping Fee</td>
                          <td>{formatCurrency(meeshoResults.shippingFee)}</td>
                        </tr>
                        <tr className="table-success">
                          <td><strong>Profit</strong></td>
                          <td><strong>{formatCurrency(meeshoResults.profit)}</strong></td>
                        </tr>
                        <tr>
                          <td>Profit Margin</td>
                          <td>{formatPercentage(meeshoResults.margin)}</td>
                        </tr>
                        <tr>
                          <td>ROI</td>
                          <td>{formatPercentage(meeshoResults.roi)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>
          
          {/* Swiggy Calculator */}
          <Tab.Pane eventKey="swiggy">
            <Card className="calculator-card swiggy-card">
              <Card.Body>
                <Card.Title>Swiggy Profit Calculator</Card.Title>
                <Form onSubmit={calculateSwiggyProfit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Dish Price (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="dishPrice" 
                          value={swiggyData.dishPrice} 
                          onChange={handleSwiggyInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Dish Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="dishCost" 
                          value={swiggyData.dishCost} 
                          onChange={handleSwiggyInputChange} 
                          required 
                          min="1" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Packaging Cost (₹)</Form.Label>
                        <Form.Control 
                          type="number" 
                          name="packagingCost" 
                          value={swiggyData.packagingCost} 
                          onChange={handleSwiggyInputChange} 
                          required 
                          min="0" 
                          step="0.01" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Dish Category</Form.Label>
                        <Form.Select 
                          name="dishCategory" 
                          value={swiggyData.dishCategory} 
                          onChange={handleSwiggyInputChange} 
                          required
                        >
                          <option value="food">Food</option>
                          <option value="beverages">Beverages</option>
                          <option value="desserts">Desserts</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3 mt-4">
                        <Form.Check 
                          type="checkbox" 
                          label="Swiggy Super Restaurant" 
                          name="isSwiggySuper" 
                          checked={swiggyData.isSwiggySuper} 
                          onChange={handleSwiggyInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className="swiggy-button" disabled={loading}>
                      {loading ? 'Calculating...' : 'Calculate Profit'}
                    </Button>
                  </div>
                </Form>
                
                {swiggyResults && (
                  <div className="results-section mt-4">
                    <h4>Results</h4>
                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td>Dish Price</td>
                          <td>{formatCurrency(swiggyResults.dishPrice)}</td>
                        </tr>
                        <tr>
                          <td>Dish Cost</td>
                          <td>{formatCurrency(swiggyResults.cost)}</td>
                        </tr>
                        <tr>
                          <td>Commission</td>
                          <td>{formatCurrency(swiggyResults.commission)}</td>
                        </tr>
                        <tr>
                          <td>Packaging Cost</td>
                          <td>{formatCurrency(swiggyResults.packagingCost)}</td>
                        </tr>
                        <tr>
                          <td>Delivery Fee</td>
                          <td>{formatCurrency(swiggyResults.deliveryFee)}</td>
                        </tr>
                        <tr className="table-success">
                          <td><strong>Profit</strong></td>
                          <td><strong>{formatCurrency(swiggyResults.profit)}</strong></td>
                        </tr>
                        <tr>
                          <td>Profit Margin</td>
                          <td>{formatPercentage(swiggyResults.margin)}</td>
                        </tr>
                        <tr>
                          <td>ROI</td>
                          <td>{formatPercentage(swiggyResults.roi)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default CalculatorPage;