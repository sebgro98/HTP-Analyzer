import '../views/Styled.css';
import { Toggle } from 'rsuite';
import { useState} from 'react';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseModel';
import 'bootstrap/dist/css/bootstrap.css';

const MaxMinPresenter = ({maxName, minName, initMax, initMin, model}) => {
    const updateData = async () => {
        model.currentTemplate.templateName = null;
        const user =  await model.getUser();
        const docRef = doc(db, "Data", user.email);
            updateDoc(docRef, {
            [minName]: [min],
            [maxName]: [max],
            CurrentTemplate: null,
        })
            .then(() => {
                initMin = min;
                initMax = max;
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    const [min, setMin] = useState(initMin);
    const [max, setMax] = useState(initMax);

    const [toggle, setToggle] = useState(false);

    return (
       <div>
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

            <form>
                <div className="input-group input-group-sm mb-3" >
                <span className="input-group-text" id="inputGroup-sizing-sm" >Min</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={min} onChange={event => setMin(Number(event.target.value))}/>
                </div>

                <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Max</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={max} onChange={event => setMax(Number(event.target.value))}/>
                </div>
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={updateData}>Sumbit</button>
            </form>
        )

        }
       </div>
    )
}


export default MaxMinPresenter;