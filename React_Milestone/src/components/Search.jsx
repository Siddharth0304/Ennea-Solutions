import React, { useEffect, useState,Suspense, lazy } from 'react';
import { ArrowUpOutlined,ArrowDownOutlined , DownOutlined} from '@ant-design/icons';
import { AutoComplete , Image, Dropdown, Space, Spin} from 'antd';
import styled from 'styled-components';
import NewProductModal from './NewProductModal';

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
      const res = await fetch('https://dummyjson.com/products?limit=0');
      const data = await res.json();
      const opt = data.products.map(product => ({
        label: product.title,
        value: product.title,
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
    const data = await fetch(`https://dummyjson.com/products/search?q=${inp}`);
    const res = await data.json();
    res.products.forEach((pro) => {
      setSearchData(prevData => [...prevData, pro]); // Set the fetched product data
    });
    console.log(res);
    setInp("");
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
          style={{ width: 300 }}
          options={inp ? options : []} // Use options based on input value
          onSearch={handleInput} // Update input value on search
          onSelect={handleSelect} // Update input value on selection
          filterOption={true} 
          placeholder="Search Any Product"
          value={inp}
        />
        &nbsp;&nbsp;
        <Button type="submit">Search</Button>
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
                  <Suspense fallback={<Spin/>}>
                    <ProductImage images={item.images} />
                  </Suspense>
                </td>
                <td style={{ width: '40%' }}>
                    <div>
                        <h2 style={{ display: 'inline', margin: 0 }}>{item.title}</h2>
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
                        <h2 style={{display:'inline'}}>&#36;{item.price}</h2> <br />
                        Discount: {item.discountPercentage}%
                    </div><hr />
                    <div>About This Item: <br /> {item.description}</div><hr />
                    <div style={{textTransform:'capitalize'}}>
                        Category: {item.category} <br />
                        Availability Status:<span style={{color: item.availabilityStatus === 'Dead Stock' ? 'red' : item.availabilityStatus === 'In Stock' ? 'green' : 'goldenrod',fontWeight:'400'}}> {item.availabilityStatus}</span><br />
                        Warranty Information: {item.warrantyInformation} <br />
                        Dimensions: {item.dimensions.height} X {item.dimensions.width} X {item.dimensions.depth} (Height X Width X Depth)
                    </div>
                    
                </td>
              </tr>
            </tbody>
          </table>
        </Div>
        <br /><br />
        <div style={{ textAlign: 'center',marginBottom:'5%' }}>
            <h2>Reviews</h2>
            <div style={{display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap: '16px',width: '80%',margin: '0 auto'}}>
                {item.reviews?.map((rev, index) => (
                    <div key={index} style={{borderRadius: '8px',textAlign: 'center',padding:'8px',backgroundColor:'#f9f6ee' }}>
                        <strong>{rev.reviewerName}</strong> <br />
                        <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                            <span style={{fontSize:'0.8rem'}}>{rev.rating}</span> &nbsp;
                            <div className="Stars" style={{ "--rating": rev.rating, display:"inline" }}></div>
                        </div>
                        <span>{rev.comment}</span> <br />
                        <span>{new Date(rev.date).toLocaleDateString('en-US')}</span> <br />
                    </div>
                ))}
            </div>
        </div>
        

        </React.Fragment>
      )) : <Div style={{fontWeight:"500",fontSize:"1.5rem"}}>Product not available</Div> 
      }
      
    </>
  );
};

export default Search;
