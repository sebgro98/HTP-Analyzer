import '../views/Styled.css';
import { Toggle } from 'rsuite';
import { useState, useEffect} from 'react';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseModel';
import 'bootstrap/dist/css/bootstrap.css';
import Model from "../Model";
import { Slider, RangeSlider, Row, Col, InputGroup, InputNumber } from 'rsuite';


const MaxMinPresenter = ({maxName, minName, initMax, initMin, model}) => {
    const [value, setValue] = useState([initMin, initMax]);

    const updateData = async () => {
        model.currentTemplate.templateName = null;
        const user =  await model.getUser();
        const docRef = doc(db, "Data", user.email);
            updateDoc(docRef, {
            [minName]:parseFloat(value[0]),
            [maxName]: parseFloat(value[1]),
            CurrentTemplate: null,
        })
            .then(() => {
                initMin = parseFloat(value[0]);
                initMax = parseFloat(value[1])
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    const [maxMin, setMaxMin] = useState([value[0], value[1]]);

    useEffect(() => {
        const setMaxMinCB = () => {
            if(minName=="CurrentIntervals.HumMin" && maxName=="CurrentIntervals.HumMax") {
                setMaxMin([-1, 101])
            } else  if(minName=="CurrentIntervals.TempMin" && maxName=="CurrentIntervals.TempMax") {
                setMaxMin([-52, 52])
            } else  if(minName=="CurrentIntervals.PresMin" && maxName=="CurrentIntervals.PresMax") {
                setMaxMin([860, 1100])
            }
        }
        setMaxMinCB();
    }, []);

    const [toggle, setToggle] = useState(false);

    return (
       <div class="minmax_drawer">
        <div style={{fontSize:"1rem", color: "#499BDA"}}>Set maximum and minimum value?</div>
         <Toggle style={{marginTop: '10px', marginBottom: '10px'}}
            size="md" 
            checkedChildren="Yes" 
            unCheckedChildren="No" 
            onClick={() => {
                setToggle(!toggle);
            }}
        />
        {toggle && (
            <Row style={{ marginBottom: "16px"}}>
                <Col md={10}>
                  <RangeSlider
                    max={maxMin[1]}
                    min={maxMin[0]}
                    size ="sm"
                    progress
                    style={{ marginTop: 16 }}
                    step={0.5}
                    value={value}
                    onChange={value => {
                      setValue(value);
                    }}
                  />
                </Col>
                <Col md={14}>
                  <InputGroup size ="sm">
                    <InputNumber
                      max={maxMin[1]}
                      min={maxMin[0]}
                      value={value[0]}
                      step={0.5}
                      onChange={nextValue => {
                        const [start, end] = value;
                        if (nextValue > end) {
                          return;
                        }
                        setValue([nextValue, end]);
                      }}
                    />
                    <InputGroup.Addon>to</InputGroup.Addon>
                    <InputNumber
                      max={maxMin[1]}
                      min={maxMin[0]}
                      value={value[1]}
                      step={0.5}
                      onChange={nextValue => {
                        const [start, end] = value;
                        if (start > nextValue) {
                          return;
                        }
                        setValue([start, nextValue]);
                      }}
                    />
                  </InputGroup>
                </Col>
                <button type="button" class="btn btn-outline-primary btn-sm" onClick={updateData}>Sumbit</button>
            </Row>
        )

        }
       </div>
    )
}

export default MaxMinPresenter;
