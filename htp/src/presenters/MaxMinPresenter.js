import '../views/Styled.css';
import { Toggle } from 'rsuite';
import { useState, useEffect} from 'react';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseModel';
import 'bootstrap/dist/css/bootstrap.css';
import { Slider, RangeSlider, Row, Col, InputGroup, InputNumber } from 'rsuite';
import TextField from '@mui/material/TextField';
import { useRecoilState } from 'recoil';
import { darkModeAtom } from '../views/MainPageView';



const MaxMinPresenter = ({maxName, minName, initMax, initMin, model}) => {
    const [darkMode] = useRecoilState(darkModeAtom);
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

    const [maxMin, setMaxMin] = useState(null);

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
        <div style={{fontSize:"1rem", color: darkMode ? "#ffffff" : "#1a1a1a", marginTop: "40px"}}>
        <div style={{marginTop: "5px"}}>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Min</span>
                    <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm" value={initMin} style={{width: "80px", textAlign: "center", borderRadius: "0 5px 5px 0"}} readOnly/>
                    <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm" value={initMax} style={{width: "80px", textAlign: "center", borderRadius: "5px 0px 0px 5px", marginLeft: "50px"}} readOnly/>
                <span class="input-group-text" id="inputGroup-sizing-sm">Max</span>
            </div>
        </div>
        <div style={{fontSize:"1rem", color: darkMode ? "#ffffff" : "#1a1a1a", marginTop: "15px", alignText: "center", alignItems: "center"}}>Edit range...</div>
         <Toggle style={{marginTop: '10px', marginBottom: '10px', alignItems: "center"}}
            size="md" 
            checkedChildren=" " 
            unCheckedChildren=" " 
            onClick={() => {
                setToggle(!toggle);
            }}
        />
        {toggle && (
            <>
                <Row style={{marginBottom: "16px", width: "322px"}}>
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
                </Row>
                <Row style={{marginBottom: "16px", width: "322px"}}>
                  <InputGroup size ="m">
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
                    <InputGroup.Addon>To</InputGroup.Addon>
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
                </Row>
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={updateData}>Submit</button>
            </>
        )

        }
       </div>
    )
}

export default MaxMinPresenter;
