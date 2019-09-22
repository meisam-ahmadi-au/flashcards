import Axios from 'axios';
import moment from 'moment';
import { firestore } from '../firebase/firebase';

const KEY = process.env.REACT_APP_GKEY;
const signinUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${KEY}`;
const dbUrl = 'https://awesomeflashcard.firebaseio.com/users/';

class FlashCardApis {
  public static retreiveCategoryByCategoryName = async (
    categoryName: string,
    uid: string
  ) => {
    const categoryRef = await firestore
      .collection(`otherInfo/${uid}/categories`)
      .where('category', '==', categoryName.toLowerCase())
      .get();

    const categorySnapshot = categoryRef.docs.map(doc => doc.data());
    return { ...categorySnapshot[0] };
  };

  public static retreiveTodaysCardsByCategoryId = async (
    categoryId: string,
    uid: string
  ) => {
    const startOfToday = moment()
      .startOf('day')
      .valueOf();

    const cardsRef = await firestore
      .collection(`cards/${uid}/${categoryId}`)
      .where('nextReadTime', '<', startOfToday)
      .orderBy('nextReadTime')
      .get();

    const cardsSnapshot = cardsRef.docs.map(doc => ({
      ...doc.data(),
      cardId: doc.id
    }));

    return [...cardsSnapshot];
  };

  public static signin = (email: string, password: string) =>
    Axios.post(signinUrl, { email, password, returnSecureToken: true }).then(
      res => {
        FlashCardApis.idToken = res.data.idToken;
        FlashCardApis.localId = res.data.localId;
        return res.data;
      }
    );

  public static getCategories = (refresh: boolean) => {
    const categoriesUrl = `${dbUrl}${FlashCardApis.localId}/categories.json?auth=${FlashCardApis.idToken}`;
    if (!FlashCardApis.categories || refresh) {
      return Axios.get(categoriesUrl).then(res => {
        FlashCardApis.categories = res.data;
        return res.data;
      });
    } else {
      return Promise.resolve(FlashCardApis.categories);
    }
  };

  public static addCard = (
    category: string,
    front: string,
    back: string,
    time: number
  ) => {
    const categoryUrl = `${dbUrl}${FlashCardApis.localId}/${category}.json?auth=${FlashCardApis.idToken}`;
    return Axios.post(categoryUrl, { front, back, time }).then(res => {
      console.log(res);
    });
  };

  private static idToken = '';
  private static localId = '';
  private static categories: null | {};
}

export default FlashCardApis;
