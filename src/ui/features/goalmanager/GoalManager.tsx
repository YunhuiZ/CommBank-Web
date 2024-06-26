import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faDollarSign, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import 'date-fns'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { updateGoal as updateGoalApi } from '../../../api/lib'
import { Goal } from '../../../api/types'
import { selectGoalsMap, updateGoal as updateGoalRedux } from '../../../store/goalsSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import DatePicker from '../../components/DatePicker'
import { Theme } from '../../components/Theme'
import EmojiPicker from '../../components/EmojiPicker'

type Goal = {
  id: string;
  name: string;
  targetDate: Date;
  targetAmount: number;
  icon: string;
};

type Props = { goal: Goal };

type EmojiPickerContainerProps = { isOpen: boolean; hasIcon: boolean };

const EmojiPickerContainer = styled.div<EmojiPickerContainerProps>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  top: ${(props) => (props.hasIcon ? '10rem' : '2rem')};
  left: 0;
`;

export function GoalManager({ goal }: Props) {
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
  const [icon, setIcon] = useState(goal.icon);
  const dispatch = useAppDispatch();

  const hasIcon = () => icon != null;

  const pickEmojiOnClick = (emoji: BaseEmoji, event: React.MouseEvent) => {
    event.stopPropagation();
    setIcon(emoji.native);
    setEmojiPickerIsOpen(false);

    const updatedGoal: Goal = {
      ...goal,
      icon: emoji.native ?? goal.icon,
    };

    dispatch(updateGoalRedux(updatedGoal));

    // TODO: Update database
  };

  return (
    <>
      {/* Other parts of the component */}
      <button onClick={() => setEmojiPickerIsOpen(!emojiPickerIsOpen)}>Pick Emoji</button>
      <EmojiPickerContainer
        isOpen={emojiPickerIsOpen}
        hasIcon={hasIcon()}
        onClick={(event) => event.stopPropagation()}
      >
        <EmojiPicker onClick={pickEmojiOnClick} />
      </EmojiPickerContainer>
      {/* Other parts of the component */}
    </>
  );
}