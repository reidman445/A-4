import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './App.css';

//
function App() {

  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/run";

  const apiUrl2 = "http://localhost:3000/update";

  const [sLength, setsLength] = useState({ sLength: ' '});

  const [user, setUser] = useState({ _id: '', firstName: '', lastName: '', 
  email: '',studentNumber: '',password: '' });  

  //runs once after the first rendering of page
  useEffect(() => {

    const fetchData = async () => {

      axios.get(apiUrl)
        .then(result => {

          console.log('result.data:',result.data)
          setData(result.data)
          setShowLoading(false)

        }).catch((error) => {

          console.log('error in fetchData:', error)

        });

      };  

    fetchData();

  }, []);

  const updateUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const updateData = { fullname: user.email };
    axios.post(apiUrl2, updateData)
    .then(result => {

      console.log('result.data:',result.data)
      setData(result.data)
      setShowLoading(false)

      }).catch((error) => {

        console.log('error in fetchData:', error)

      });
  };
   //runs when user enters a field
   const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (

    <div>

      { showLoading === false

        ? <div>

            {showLoading && <Spinner animation="border" role="status">

              <span className="sr-only">Loading...</span>

            </Spinner> }

              
            <h1>Prediction Results</h1>
            <h2> the values for species will be:</h2>
            <li>setosa: 1,0,0</li> 
            <li>virginica: 0,1,0</li>
            <li>versicolor: 0,0,1 </li>

            <table className="type11" align="center">

              <thead>

                <tr>

                  <th>Test 1</th>
                  <th>Test 2</th>
                  <th>Test 3</th>

                </tr>

              </thead>

              

              <tbody>

                

                <tr>

                  <td className="App-td">

                    { data.row1.map((value, index) => (

                      <p key={index}>{value}</p>

                    ))}

                  </td>

                  <td className="App-td">

                  { data.row2.map((value, index) => (

                    <p key={index}>{value}</p>

                  ))}

                  </td>

                  <td className="App-td">

                  { data.row3.map((value, index) => (

                    <p key={index}>{value}</p>

                  ))}

                  </td>


                </tr>

              </tbody>

            </table>

            <Jumbotron>
        <Form onSubmit={updateUser}>
          <Form.Group>
            <Form.Label>Sepal length: </Form.Label>
            <Form.Control type="text" name="sLength" id="sLength"  value={user.sLength}  onChange={onChange} />
            </Form.Group>
          <Form.Group>
            <Form.Label>Sepal width: </Form.Label>
            <Form.Control type="text" name="sWidth" id="sWidth"  value={user.sWidth} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Petal Length: </Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3"  value={user.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Petal Width: </Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" value={user.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Epochs: </Form.Label>
            <Form.Control type="text" name="epochs" id="epochs"  value={user.epochs} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Learning rate: </Form.Label>
            <Form.Control type="text" name="learningRate" id="learningRate"  value={user.learningRate} onChange={onChange} />
          </Form.Group>
          
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
        
          </div>

        : 

        < div>

          {showLoading && <Spinner animation="border" role="status">

            <span className="sr-only">Waiting for results...</span>

          </Spinner> }

        </div>

        


      }

    </div>

   


  );

}

//

export default App;


