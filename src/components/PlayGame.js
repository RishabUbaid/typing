import { useEffect, useState } from "react";
const PlayGame = ({ onGame, onChangeScore }) => {
  const [defaultData] = useState('Birds were singing outside her kitchen window on that balmy day in spring. Afterward Ella replayed the.scene in her mind so many times that.rather than a fragment from the past, it felt like an ongoing moment.still happening somewhere out there in the universe.There they were, sitting around the table, having a late family lunch on a Saturday afternoon.Herhusband was filling his plate with fried chicken legs, his favorite food.Avi was playing his knife and forklike drumsticks while his twin, Orly, was trying to calculate how many bites of which food she could eatso as not to ruin her diet of 650 calories a day.Jeannette, who was a freshman at Mount Holyoke Collegenearby.seemed lost in her thoughts as she spread cream cheese on another slice of bread.Also at the table sat Aunt Esther, who had stopped by to drop off one of her famous marble cakes and then stayed on for lunch.Ella had a lot of work to do afterward, but she was not ready to leave the table just yet.Lately they didnot have too many shared family meals, and she saw this as a golden chance for everyone toreconnect.');
const [dataTyping, setDataTyping] = useState([]);
const [textTyping, setTextTyping] = useState({
  value: '',
  position: 0
});
useEffect(() => {
  const addWord = (quantityAdd = 20) => {
    const arrayDefaultData = defaultData.split(' ');
    const gamingText = [];
    for (let index = 0; index < quantityAdd; index++) {
      const positionRandom = Math.floor(Math.random() * arrayDefaultData.length);
      gamingText.push({
        value: arrayDefaultData[positionRandom],
        status: null
      });
    }
    setDataTyping(gamingText);
  }
  if (dataTyping.length === 0 || textTyping.position > (dataTyping.length - 1)) {
    addWord();
    setTextTyping({ ...textTyping, position: 0 });
  }

}, [textTyping.position])
const handleChangeTyping = e => {
  const valueInput = e.target.value;
  if (!valueInput.includes(' ')) {
    setTextTyping({ ...textTyping, value: valueInput });
  } else if (textTyping.value !== '') {
    checkResult();
  }
}
const checkResult = () => {
  const dataCheck = dataTyping;
  if (textTyping.value === dataCheck[textTyping.position].value) {
    dataCheck[textTyping.position].status = true;
    onChangeScore(1);
  } else {
    dataCheck[textTyping.position].status = false;
    onChangeScore(-1);
  }
  setDataTyping(dataCheck);
  setTextTyping({ value: '', position: textTyping.position + 1 });
}
return (
  <div className="playing">
    <ul className="list">
      {
        (dataTyping).map((word, index) =>
          <li key={index} className={
            word.status === true
              ? 'true'
              : word.status === false
                ? 'false'
                : ''
          }>
            {word.value}
          </li>
        )
      }
    </ul>
    <div className="inputForm">
      <input type="text" autoFocus value={textTyping.value} onChange={handleChangeTyping} />
    </div>
  </div>
)
}
export default PlayGame;