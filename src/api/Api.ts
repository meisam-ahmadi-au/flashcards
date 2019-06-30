import Axios from 'axios';

const KEY = process.env.REACT_APP_GKEY;
const signinUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${KEY}`;
const dbUrl = 'https://awesomeflashcard.firebaseio.com/users/';

class flashcardApis {
  public static signin = (email: string, password: string) =>
    Axios.post(signinUrl, { email, password, returnSecureToken: true }).then(
      res => {
        flashcardApis.idToken = res.data.idToken;
        flashcardApis.localId = res.data.localId;
        return res.data;
      }
    );

  public static getCategories = (refresh: boolean) => {
    const categoriesUrl = `${dbUrl}${
      flashcardApis.localId
    }/categories.json?auth=${flashcardApis.idToken}`;
    if (!flashcardApis.categories || refresh) {
      return Axios.get(categoriesUrl).then(res => {
        flashcardApis.categories = res.data;
        return res.data;
      });
    } else {
      return Promise.resolve(flashcardApis.categories);
    }
  };

  public static addCard = (
    category: string,
    front: string,
    back: string,
    time: number
  ) => {
    const categoryUrl = `${dbUrl}${
      flashcardApis.localId
    }/${category}.json?auth=${flashcardApis.idToken}`;
    return Axios.post(categoryUrl, { front, back, time }).then(res => {
      console.log(res);
    });
  };

  private static idToken = '';
  private static localId = '';
  private static categories: null | {};
}

export default flashcardApis;
