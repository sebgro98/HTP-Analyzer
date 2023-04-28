import '../views/Styled.css';
import { Toggle } from 'rsuite';
import { useState} from 'react';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseModel';
import 'bootstrap/dist/css/bootstrap.css';
import Model from "../Model";

const MaxMinPresenter = ({maxName, minName, initMax, initMin}) => {
   
    const updateData = async () => {
        const model = new Model();
        const user =  await model.getUser();
        const docRef = doc(db, "Data", user.email);
            updateDoc(docRef, {
            [minName]: [min],
            [maxName]: [max]
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
        <div>Set maximum and minimum value?</div>
         <Toggle style={{margin: '10px'}}
            size="lg" 
            checkedChildren="Yes" 
            unCheckedChildren="No" 
            onClick={() => {
                setToggle(!toggle);
            }}
        />
        {toggle && (

            <form>
                <div class="input-group input-group-sm mb-3" >
                <span class="input-group-text" id="inputGroup-sizing-sm" >Min</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={min} onChange={event => setMin(event.target.value)}/>
                </div>

                <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Max</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={max} onChange={event => setMax(event.target.value)}/>
                </div>
                <button type="button" onClick={updateData} class="btn btn-outline-success">Sumbit</button>
            </form>
        )

        }
       </div>
    )
}


export default MaxMinPresenter;