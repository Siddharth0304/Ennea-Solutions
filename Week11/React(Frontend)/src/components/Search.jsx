import React, { useEffect, useState,Suspense, lazy } from 'react';
import { ArrowUpOutlined,ArrowDownOutlined , DownOutlined,FileImageOutlined} from '@ant-design/icons';
import { AutoComplete , Image, Dropdown, Space, Spin, Flex} from 'antd';
import styled from 'styled-components';
import NewProductModal from './NewProductModal';
import AddReviewModal from './AddReviewModal';

const ProductImage = lazy(() => import('./ProductImage'));



const Form = styled.form`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    flex-wrap:wrap;
    margin-top:15px;
`;
const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    flex-wrap:wrap;
    margin-top:6%;
`;
const Button = styled.button`
    height:32px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    padding:0 10px 0 10px;
`;

const Search = () => {
  const [options, setOptions] = useState([]);
  const [inp, setInp] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:8080/products/all');
      const data = await res.json();
      const opt = data.map(product => ({
        label: product.name,
        value: product.name,
        key: product.id
      }));
      setOptions(opt);
    };
    fetchProducts();
  }, []);

  const handleInput = (value) => {
    setInp(value);
  };

  const handleSelect = (value) => {
    setInp(value); 
  };

  const handleSubmit = async () => {
    setSearchData([]);
    const data = await fetch(`http://localhost:8080/products/search/${inp}`);
    const res = await data.json();
    res.forEach((pro) => {
      setSearchData(prevData => [...prevData, pro]); // Set the fetched product data
    });
    console.log(res);
    setInp("");
  };

  const handleReviewAdded = (productId, newReview) => {
    console.log("The datais ",newReview);
    setSearchData(prevData =>
      prevData.map(product => 
        product.id === productId
          ? { ...product, reviews: [...product.reviews, newReview] }
          : product
      )
    );
  };

  const sortAsc=()=>{
    const sortedData = [...searchData].sort((a, b) => a.price - b.price);
    setSearchData(sortedData);
  }
  
  const sortDsc=()=>{
    const sortedData = [...searchData].sort((a, b) => b.price - a.price);
    setSearchData(sortedData);
  }

  const items = [
    {
      key: '1',
      label: (
        <a onClick={sortAsc}>
          Low To High
        </a>
      ),
      icon: <ArrowUpOutlined />,
    },
    {
      key: '2',
      label: (
        <a onClick={sortDsc}>
          High To Low
        </a>
      ),
      icon: <ArrowDownOutlined/>,
    },
  ];

  return (
    <>
        <br />
      <div style={{display:'flex',alignItems:'center',flexDirection:'column-reverse'}}>
      <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}> {/* Prevent default form submission */}
        <AutoComplete
          style={{ width: 400 }}
          options={inp ? options : []} // Use options based on input value
          onSearch={handleInput} // Update input value on search
          onSelect={handleSelect} // Update input value on selection
          filterOption={true} 
          placeholder="Search Any Product"
          value={inp}
        />
        &nbsp;&nbsp;
        <Button type="submit" className='addRev'>Search</Button>
      </Form>
      <NewProductModal/>
      </div>
      
      {searchData.length>1?
        <div style={{position:'absolute',right:'2%',marginTop:'3%'}}>
        <Dropdown menu={{items,}}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Price
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>:<></>
      }

      {/* Display product data if available */}
      {searchData.length>0 ? searchData.map((item)=>(
        <React.Fragment key={item.id}>
        <Div >
            <table width="80%">
                <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '40%'}}>
                  {item.images && item.images.length > 0 ? (
                    <Suspense fallback={<Spin />}>
                      <ProductImage images={item.images} />
                    </Suspense>) : (
                    <div style={{fontSize:'1.5rem'}}><FileImageOutlined /> No images available</div>
                  )}
                </td>
                <td style={{ width: '40%' }}>
                    <div>
                        <h2 style={{ display: 'inline', margin: 0 }}>{item.name}</h2>
                        <div style={{display:"flex",alignItems:'center'}}>
                            <span style={{fontSize:'0.8rem'}}>{item.rating}</span> &nbsp;
                            <div className="Stars" style={{ "--rating": item.rating, display:"inline" }}></div>
                        </div>
                        <p>
                            Brand: {item.brand ? item.brand : <i className="fa-solid fa-ban" style={{color: "#ff1e00"}}></i>}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <h2 style={{display:'inline'}}>&#8377;{new Intl.NumberFormat('en-IN').format(item.price)}</h2> <br />
                        Discount: {item.discount}%
                    </div><hr />
                    <div>About This Item: <br /> {item.description}</div><hr />
                    <div style={{textTransform:'capitalize'}}>
                        Category: {item.category} <br />
                        Availability Status:<span style={{color: item.availabilityStatus === 'Dead Stock' ? 'red' : item.availabilityStatus === 'In Stock' ? 'green' : 'goldenrod',fontWeight:'400'}}> {item.availabilityStatus}</span><br />
                        Warranty Information: {item.warranty} <br />
                        Dimensions: {item.dimensions.height} X {item.dimensions.width} X {item.dimensions.depth} (Height X Width X Depth)
                    </div>
                    
                </td>
              </tr>
            </tbody>
          </table>
        </Div>
        <br /><br />
        <div style={{ textAlign: 'center',marginBottom:'5%' }}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
              <h2>Reviews</h2>
              <div>
                <AddReviewModal id={item.id} onReviewAdded={handleReviewAdded}></AddReviewModal>
              </div>
            </div>
            
            <div style={{display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap: '16px',width: '60%',margin: '0 auto'}}>
                {item.reviews.length>0?item.reviews.map((rev, index) => (
                    <div key={index} style={{borderRadius: '8px',textAlign: 'center',padding:'8px',backgroundColor:'#f9f6ee' }}>
                        <strong>{rev.reviewerName}</strong> <br />
                        <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                            <span style={{fontSize:'0.8rem'}}>{rev.rating}</span> &nbsp;
                            <div className="Stars" style={{ "--rating": rev.rating, display:"inline" }}></div>
                        </div>
                        <span>{rev.comment}</span> <br />
                    </div>
                )) : <p style={{fontStyle:'italic'}}>No Reviews Added</p> }
            </div>
        </div>
        

        </React.Fragment>
      )) : <></> 
      }
      
    </>
  );
};

export default Search;
