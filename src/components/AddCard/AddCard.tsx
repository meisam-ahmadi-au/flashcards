import React, { Component, SyntheticEvent, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import reducers from '../../store/reducers/reducers';
import { IReduxStates } from '../../store/reducers/states';
import AddOrUpdate from './AddOrUpdate';

const AddCards: React.FC<RouteComponentProps> = props => {
  const user = useSelector((s: IReduxStates) => s.auth.user);

  const intialState = {
    front: '',
    back: '',
    category: '',
    totalNumberOfCards: 0,
    categoryId: ''
  };

  const reducers = (state: any, payload: any) => ({ ...state, ...payload });

  const [state, setState] = useReducer(reducers, intialState);

  useEffect(() => {
    const { category } = props.match.params as { category: string };
    (async () => {
      const {
        categoryId,
        totalNumberOfCards
      } = await Api.getCategoryDetailByCategoryName(user.uid, category);
      setState({ category, totalNumberOfCards, categoryId });
    })();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setState({ [name]: value });
  };

  const addCard = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { front, back, categoryId } = state;

    if (front && back && categoryId) {
      const createdAt = Date.now();
      const newCard = {
        front,
        back,
        createdAt,
        nextReadTime: createdAt,
        shouldReadFront: true,
        learningCurve: [createdAt]
      };

      await Api.addCard(user.uid, categoryId)(newCard).catch(console.log);
      setState({ front: '', back: '' });
    }
  };

  const goBack = () => {
    props.history.goBack();
  };

  const { category, totalNumberOfCards, front, back } = state;
  const addProps = { category, totalNumberOfCards, front, back };
  return (
    <AddOrUpdate
      {...addProps}
      onSubmit={addCard}
      onCancel={goBack}
      onInputChange={onInputChange}
    />
  );
};

export default AddCards;
